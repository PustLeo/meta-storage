import { Controller, Get, HttpCode } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { HealthPathEnum } from './health-path.enum';

/**
 * Контроллер проверки работоспособности
 */
@Controller()
export class HealthController {
  /**
   * Конструктор
   * @param {HealthCheckService} health
   * @param {MemoryHealthIndicator} memory
   */
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
  ) {}

  /**
   * Запрос на проверку работоспособности
   * @returns {Promise<HealthCheckResult>}
   */
  @Get(HealthPathEnum.HealthCheck)
  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.health.check([
      async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
    ]);
  }

  @Get(HealthPathEnum.LiveCheck)
  @HealthCheck()
  @HttpCode(204)
  liveCheck(): Promise<void> {
    return;
  }
}
