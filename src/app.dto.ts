import { ILabel, IField } from './app.interface';

export interface IMetricDto {
  readonly namespace: string;
  readonly labels: ILabel[];
  readonly fields: IField[];
  readonly timestamp: string;
};
