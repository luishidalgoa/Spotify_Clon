import { DatePipe } from "@angular/common";
import { Artist } from "../../artist";
import { User } from "../../user";

export interface ReduceData {
    item: {
      title: string;
      description: string;
      image: string | undefined;
      uri: string;
      type: string;
      id: string;
      owner?: User | Artist;
    }
    added_at?: Date;
  }
