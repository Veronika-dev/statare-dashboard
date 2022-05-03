import { Commit, Dispatch } from 'vuex';
import { ITeamsObj } from '@/types/Teams';
import { ITask, ITaskFull } from '@/types/Tasks';
import { TDataPaginate, TPaginateFull } from '@/types/Paginate';
import { IChartStatsItem, IStatsItem } from '@/types/Dashboard';

export type TStore<TState> = {
  state: TState;
  commit: Commit;
  dispatch: Dispatch;
}

export interface IGeneralState {
  error: string | null;
}

export interface ITeamsState {
  teams: ITeamsObj;
}

export interface ITasksState {
  tasks: TDataPaginate<ITask[]>;
  openedTask: ITaskFull | null;
  pagination: TPaginateFull;
  isTaskOpened: boolean;
  total: number;
}

export interface IDashboardState {
  stats: IStatsItem;
  chartData: IChartStatsItem[];
}
