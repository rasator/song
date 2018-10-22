import { Injectable } from '@angular/core';
import { SongClass } from '../class/song.class';
import { MongoService} from './mongo.service';
import { Stitch, RemoteMongoClient, StitchAuthListener, AnonymousCredential } from 'mongodb-stitch-browser-sdk';
import { ActivatedRoute, Router } from '@angular/router';

interface MongoJSON {
  _id: Object;
  Title: string;
  Band: string;
  Type: string;
  Url: string;
}

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
  arrayDocs: Array<MongoJSON>;
  numberDoc: number;
  router: Router;

  constructor(private mongo: MongoService,
    private _router: Router, private route: ActivatedRoute) {
    // localStorage.clear();
    this.router = _router;

    console.log('Array length: ' + this.songs.length);
    console.log('localstorage length: ' + localStorage.length);
    if (localStorage.length === 0) {
      // const song1 = new SongClass('Brother in Arms', 'Dire Straits', 'Rock',
      //  'jhdFe3evXpk');
      //  const song2 = new SongClass('Sara', 'Fleetwood Mac', 'Pop',
      //  'lfgyivefgHE');
      //  const song3 = new SongClass('Voyage Voyage', 'Desireless', 'Pop',
      //  '6PDmZnG8KsM');
      //  this.addSong(song1);
      //  this.addSong(song2);
      //  this.addSong(song3);

       mongo.login()
       .then (() => {
          // mongo.insertDocument('Take On Me', 'A-ha', 'Pop', 'djV11Xbc914');
          // mongo.insertDocument('Brother in Arms', 'Dire Straits', 'Rock', 'jhdFe3evXpk');
          // mongo.insertDocument('Sara', 'Fleetwood Mac', 'Pop', 'lfgyivefgHE');
          // mongo.insertDocument('Voyage Voyage', 'Desireless', 'Pop', '6PDmZnG8KsM');
           mongo.getDocuments().then(docs => {
            this.arrayDocs = docs;

             for (let i = 0; i < this.arrayDocs.length; i++) {
                let mSong: MongoJSON;
                let song: SongClass;
                mSong = this.arrayDocs[i];
                song = new SongClass(mSong.Title, mSong.Band, mSong.Type, mSong.Url);
                this.addSong(song);
             }

            console.log('Doc Names:',  this.arrayDocs );
            console.log('Doc Lenght:',  this.arrayDocs.length );
           });
       });

      //  mongo.deleteDocument('Raquel').then(result => {
      //     console.log('Delete Nr :', result.deletedCount);
      //     });
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
