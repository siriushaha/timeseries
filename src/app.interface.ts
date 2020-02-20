export interface ILabel {
  key: string;
  value: string;
}

export interface IField {
  key: string;
  value: number;
}

export interface IMetric {
  namespace: string;
  labels: ILabel[];
  fields: IField[];
  timestamp: Date;
}
