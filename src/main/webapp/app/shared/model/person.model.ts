import { IExperience } from 'app/shared/model/experience.model';

export interface IPerson {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  experiences?: IExperience[];
}

export const defaultValue: Readonly<IPerson> = {};
