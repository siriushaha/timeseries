import { Injectable } from '@nestjs/common';
import { IMetric } from './app.interface';
import { IMetricDto } from './app.dto';

const metrics: IMetric[] = [];

@Injectable()
export class AppService {
  getMetrics(
    startTimestamp: string,
    endingTimestamp: string,
    labelKey?: string,
    labelValue?: string,
    namespace?: string,
  ): IMetric[] {
    let results: IMetric[] = metrics.filter((metric: IMetric) => {
      const start = new Date(startTimestamp);
      const ending = new Date(endingTimestamp);
      return (
        start.getTime() <= ending.getTime() &&
        metric.timestamp.getTime() >= start.getTime() &&
        metric.timestamp.getTime() <= ending.getTime()
      );
    });
    if (labelKey && labelValue) {
      results = results.filter((metric: IMetric) => {
        let found = false;
        for (let i = 0; i < metric.labels.length; i++) {
          const metricLabel = metric.labels[i];
          if (
            metricLabel.key === labelKey &&
            metricLabel.value === labelValue
          ) {
            found = true;
            break;
          }
        }
        return found;
      });
    }
    if (namespace) {
      results = results.filter(
        (metric: IMetric) => metric.namespace === namespace,
      );
    }
    return results;
  }

  createMetric(metric: IMetricDto): void {
    const { namespace, labels, fields, timestamp } = metric;
    const newMetric: IMetric = {
      namespace,
      labels,
      fields,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    };
    metrics.push(newMetric);
  }
}
