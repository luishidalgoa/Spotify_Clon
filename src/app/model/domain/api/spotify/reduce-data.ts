import { Artist } from "../../artist";
import { User } from "../../user";

export interface ReduceData {
    title: string;
    description: string;
    image: string | undefined;
    uri: string;
    type: string;
    id: string;
    owner?: User | Artist;
  }
