export interface IChartItem {
  status_date: number;
  count: number;
}

export interface IStatsObj {
  total: number;
  closed: number;
}

export interface IStatsItem {
  [key: string]: IStatsObj;
}

export interface IChartStatsItem {
  [key: string]: number;
}
