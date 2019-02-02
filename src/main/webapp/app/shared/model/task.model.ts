import { IExperience } from 'app/shared/model/experience.model';

export interface ITask {
  id?: number;
  label?: string;
  experience?: IExperience;
}

export const defaultValue: Readonly<ITask> = {};
