import { User } from './user';

export interface Artist extends User {
  id?: number;
  cover: { _2000?: string; _640?: string };
}
