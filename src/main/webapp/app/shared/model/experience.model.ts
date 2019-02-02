import { ITask } from 'app/shared/model/task.model';
import { IPerson } from 'app/shared/model/person.model';

export interface IExperience {
  id?: number;
  title?: string;
  location?: string;
  fromDate?: string;
  toDate?: string;
  client?: string;
  envTechnique?: string;
  detail?: string;
  tasks?: ITask[];
  person?: IPerson;
}

export const defaultValue: Readonly<IExperience> = {};
