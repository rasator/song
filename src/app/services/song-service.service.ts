import { Injectable } from '@angular/core';
import {SongClass} from '../class/song.class';

@Injectable({
  providedIn: 'root'
})
export class SongServiceService {
  public songs: Array<SongClass> = new Array<SongClass>();

  constructor() {
    const song1 = new SongClass('Brother in Arms', 'Dire Straits', 'Rock',
                'jhdFe3evXpk');
    const song2 = new SongClass('Sara', 'Fleetwood Mac', 'Pop',
                'lfgyivefgHE');
    const song3 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
                '6PDmZnG8KsM');
    const song4 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
                '6PDmZnG8KsM');
    const song5 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
                '6PDmZnG8KsM');
    const song6 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
                '6PDmZnG8KsM');
    const song7 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
                '6PDmZnG8KsM');
    const song8 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
                '6PDmZnG8KsM');
    const song9 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
                '6PDmZnG8KsM');
    const song10 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
                '6PDmZnG8KsM');
    const song11 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
                '6PDmZnG8KsM');
    const song12 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
                '6PDmZnG8KsM');
    const song13 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
                '6PDmZnG8KsM');
    const song14 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
                '6PDmZnG8KsM');
    const song15 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
                '6PDmZnG8KsM');

    this.addSong(song1);
    this.addSong(song2);
    this.addSong(song3);
    this.addSong(song4);
    this.addSong(song5);
    this.addSong(song6);
    this.addSong(song7);
    this.addSong(song8);
    this.addSong(song9);
    this.addSong(song10);
    this.addSong(song11);
    this.addSong(song12);
    this.addSong(song13);
    this.addSong(song14);
    this.addSong(song15);

  }
  getSongs(): Array<SongClass> {
      return this.songs;
  }
  getSongUrl(s: SongClass): string  {
      return s.getUrl();
  }
  setSong(original: SongClass, reemplazo: SongClass): boolean {
       const index = this.songs.indexOf(original);
       this.songs[index] = reemplazo;
       const index2 = this.songs.indexOf(reemplazo);
       if (index === index2) { return true; } else {return false; }
  }
  addSong(s: SongClass): boolean {
      this.songs.push(s);
      return true;
  }
  deleteSong(s: SongClass): boolean {
       const index = this.songs.indexOf(s);
       const borrado = this.songs.splice(index, 1);
       alert('Se ha borrado la Canción :' + borrado[0].getTitle());
       if (borrado.length === 1) { return true; } else {return false; }
  }
  countSongs(): number {
      return this.songs.length;
  }
}
