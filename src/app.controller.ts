import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { IMetric } from './app.interface';
import { IMetricDto } from './app.dto';

@Controller('/metrics')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return 'Hello World!';
  }

  // http://url:port/metrics/search?start=xxx&ending=xxx&label_key=xxx&label_value=xxx&namespace=xxx
  @Get('search')
  getMetrics(
    @Query('start') startTimestamp: string,
    @Query('ending') endingTimestamp: string,
    @Query('label_key') labelKey?: string,
    @Query('label_value') labelValue?: string,
    @Query() namespace?: string,
  ): IMetric[] {
    return this.appService.getMetrics(
      startTimestamp,
      endingTimestamp,
      labelKey,
      labelValue,
      namespace,
    );
  }

  // http://url:port/metrics/create
  @Post('create')
  createMetric(@Body() metric: IMetricDto): void {
    this.appService.createMetric(metric);
  }
}
