import { Injectable } from '@angular/core';
import { SongClass } from '../class/song.class';
import { MongoService} from './mongo.service';
import { Stitch, RemoteMongoClient, StitchAuthListener, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

interface SongJSON {
  title: string;
  band: string;
  type: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class SongServiceService {
  public songs: Array<SongClass> = new Array<SongClass>();
  arrayDocs: any;

  constructor(private mongo: MongoService) {
    console.log('Array length: ' + this.songs.length);
    console.log('localstorage length: ' + localStorage.length);
    if (localStorage.length === 0) {
      // const song1 = new SongClass('Brother in Arms', 'Dire Straits', 'Rock',
      // 'jhdFe3evXpk');
      // const song2 = new SongClass('Sara', 'Fleetwood Mac', 'Pop',
      // 'lfgyivefgHE');
      // const song3 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
      // '6PDmZnG8KsM');
      // this.addSong(song1);
      // this.addSong(song2);
      // this.addSong(song3);

      mongo.login();
      // mongo.insertDocument('A-ha', 'Take On Me', 'djV11Xbc914');
      // mongo.deleteDocument('Raquel').then(result => {
      //    console.log('Delete Nr :', result.deletedCount);
      //    });
      // mongo.insertDocument('Brother in Arms', 'Dire Straits',
      // 'Rock', 'jhdFe3evXpk');
      // mongo.insertDocument('Sara', 'Fleetwood Mac',
      // 'Pop', 'lfgyivefgHE');
      // mongo.insertDocument('Voyage Voyage', 'Desireless',
      // 'Pop', '6PDmZnG8KsM');
      // mongo.insertDocument('Take On Me', 'A-ha',
      // 'Pop', 'djV11Xbc914');

      mongo.getDocuments().asArray().then(doc => {
        this.arrayDocs = doc;
      });
      for (let i = 0; i < mongo.numberDoc; i++) {
        let song: SongClass;
        song = new SongClass(
          this.arrayDocs.title,
          this.arrayDocs.band,
          this.arrayDocs.type,
          this.arrayDocs.url);
        this.songs.push(song);
      }
      console.log('Doc Names:',  this.arrayDocs );

      } else {
      for (let i = 0; i < localStorage.length; i++) {
        let jSong: SongJSON;
        let song: SongClass;
        jSong = JSON.parse(window.localStorage.getItem(i.toString()));
        song = new SongClass(jSong.title, jSong.band, jSong.type, jSong.url);
        this.songs.push(song);
      }
    }
    console.log('Array length tras constr: ' + this.songs.length);
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
       localStorage.setItem(indexOriginal.toString(), JSON.stringify(reemplazo));
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
