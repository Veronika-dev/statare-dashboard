export enum Teams {
  frontend = 'Front-end',
  backend = 'Back-end',
  design = 'Design',
}

export type TTeams = keyof typeof Teams;

export interface ITeamMember {
  id: number;
  name: string;
  surname: string;
  team_id: string;
}

export interface ITeam {
  id: string;
  name: string;
  members?: ITeamMember[];
}

export interface ITeamsObj {
  [id: string]: {
    name: string;
    members?: ITeamMember[];
  }
}

// type TEnumTasksKeys = {[key in keyof typeof Teams]: Teams};
// const keys = Object.keys(TaskStatuses) as TTaskStatus[];
// export const TaskStatusesKeys = Object.entries(Teams).reduce((result, item: TTeams) => Object.assign(result, { [item]: item }), {}) as TEnumTasksKeys;
