import { Injectable } from '@angular/core';
declare var window: any;
@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor() {}

  async getTrackById(id: string): Promise<Object> {
    return await window['searchTrackById'](id);
  }
  async getStreamUrl(id: string): Promise<Object> {
    return await window['getStreamUrl'](id);
  }
  async getTrackByTitle(title: string): Promise<Object> {
    return await window['getTrackByTitle'](title);
  }
}
