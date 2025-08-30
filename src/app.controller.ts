import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * App controller.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Get a hello message.
   * @returns A hello message.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
