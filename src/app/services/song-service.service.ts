import { Injectable } from '@angular/core';
import {SongClass} from '../class/song.class';

@Injectable({
  providedIn: 'root'
})
export class SongServiceService {
  public songs: Array<SongClass> = new Array<SongClass>();

  constructor() {
    console.log('localstorage length: ' + localStorage.length);
    if (localStorage.length === 0) {
      const song1 = new SongClass('Brother in Arms', 'Dire Straits', 'Rock',
      'jhdFe3evXpk');
      const song2 = new SongClass('Sara', 'Fleetwood Mac', 'Pop',
      'lfgyivefgHE');
      const song3 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
      '6PDmZnG8KsM');
      this.addSong(song1);
      this.addSong(song2);
      this.addSong(song3);
      } else {
      for (let i = 0; i < localStorage.length; i++) {
        this.songs.push(JSON.parse(window.localStorage.getItem(i.toString())));
      }
    }
  }
  getSongs(): Array<SongClass> {
      return this.songs;
  }
  getSongUrl(s: SongClass): string  {
      return s.getUrl();
  }
  getSong(index: string): SongClass {
    return this.songs[index];
  }
  changeSong(indexOriginal: any, reemplazo: SongClass): boolean {
       this.songs[indexOriginal] = reemplazo;
       const index2 = this.songs.indexOf(reemplazo);
       localStorage.setItem(indexOriginal.toString(),JSON.stringify(reemplazo));
       if (indexOriginal === index2) { return true; } else {return false; }
  }
  addSong(s: SongClass): boolean {
      this.songs.push(s);
      const index = this.songs.indexOf(s);
      localStorage.setItem(index.toString(), JSON.stringify(s));
      return true;
  }
  deleteSong(s: SongClass): boolean {
       const index = this.songs.indexOf(s);
       const borrado = this.songs.splice(index, 1);
       localStorage.removeItem(index.toString());
       alert('Se ha borrado la Canción nr :' + index);
       if (borrado.length === 1) { return true; } else {return false; }
  }
  countSongs(): number {
      return this.songs.length;
  }
  
}
