import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { IncomingMessage } from 'http';
import * as fs from 'fs';
import { jwtVerify } from 'jose/jwt/verify';
import { createPublicKey } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { EventCodesEnum } from './enums/event-codes.enum';
import { TablesService } from './services/main';
import { Observable } from 'rxjs';
import { TableColumnDto } from './dto/table-column.dto';
import { IEventResponse } from './interfaces/event-response.interface';
import { TableFilterDto } from './dto/table-filter.dto';
import { TableSortDto } from './dto/table-sort.dto';

/**
 * Сервис обработки websocket-сообщений
 */
@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection {
  /** Ссылка на websocket-сервер */
  @WebSocketServer()
  server: Server;

  /**
   * Конструктор
   * @param {ConfigService} configService
   * @param {TablesService} tablesService
   */
  constructor(
    private configService: ConfigService,
    private tablesService: TablesService,
  ) {}

  /**
   * Обработка входных событий
   * Событие: `Обработка колонок таблиц`
   *
   * @param {any} user
   * @param {TableColumnDto} data
   * @returns {Observable<any>}
   */
  @SubscribeMessage(EventCodesEnum.TableColumn)
  tableColumnsEvents(
    @ConnectedSocket() { user },
    @MessageBody() data: TableColumnDto,
  ): Observable<IEventResponse> {
    return this.tablesService.addToQueue(
      new TableColumnDto({ ...data, userId: user.id }),
    );
  }

  @SubscribeMessage(EventCodesEnum.TableFilter)
  tableFiltersEvents(
    @ConnectedSocket() { user },
    @MessageBody() data: TableFilterDto,
  ): Observable<IEventResponse> {
    return this.tablesService.addToQueue(
      new TableFilterDto({ ...data, userId: user.id }),
    );
  }

  @SubscribeMessage(EventCodesEnum.TableSort)
  tableSortEvents(
    @ConnectedSocket() { user },
    @MessageBody() data: TableSortDto,
  ): Observable<IEventResponse> {
    return this.tablesService.addToQueue(
      new TableSortDto({ ...data, userId: user.id }),
    );
  }

  /**
   * Обработка нового соединения
   * @param client
   * @param {IncomingMessage} data
   * @returns {Promise<void>}
   */
  async handleConnection(client: any, data: IncomingMessage): Promise<void> {
    let user: any;
    let publicKeyPath = this.configService.get<string>('PUBLIC_KEY_PATH');
    const mode = this.configService.get<string>('MODE');
    const baseUrl = this.configService.get<string>('BASE_URL');
    const url = new URL(data.url, baseUrl);
    const token = url.searchParams.get('token');

    if (mode === 'development') {
      publicKeyPath = __dirname + publicKeyPath;
    }
    try {
      const publicKeyText = fs.readFileSync(publicKeyPath, 'utf8');
      const publicKey = createPublicKey(publicKeyText);
      user = await jwtVerify(token, publicKey);
    } catch (e) {
      console.log(e);
      return client.close(1007, 'Token invalid');
    }
    if (!user) {
      return client.close(1007, 'Token invalid');
    }
    const { payload, protectedHeader } = user;
    client.user = { id: payload.mis_user_id, rolePerms: payload.role_perms };
  }
}
