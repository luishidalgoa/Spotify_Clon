import { Pipe, PipeTransform } from '@angular/core';
import { ReduceData } from '../model/domain/api/spotify/reduce-data';
import { User } from '../model/domain/user';
import { Artist } from '../model/domain/artist';

@Pipe({
  name: 'getDisplayName',
  standalone: true
})
export class GetDisplayNamePipe implements PipeTransform {

  transform(value: ReduceData, dictionary: any): string {
    if (value.type === 'artist') {
      return dictionary.words.type.artist;
    } else if (value.type === 'playlist') {
      const aux = value.owner as User;
      return dictionary.words.type.playlist + ' • ' +aux.display_name;
    } else {
      const aux = value.owner as Artist;
      return dictionary.words.type.album + ' • ' + aux.name;
    }
  }

}
