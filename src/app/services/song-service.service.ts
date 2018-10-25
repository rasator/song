import { Injectable } from '@angular/core';
import { SongClass } from '../class/song.class';
import { MongoService} from './mongo.service';
import { Stitch, RemoteMongoClient, StitchAuthListener, AnonymousCredential } from 'mongodb-stitch-browser-sdk';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

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
  public dataSource: MatTableDataSource<SongClass>;

  arrayDocs: Array<MongoJSON>;
  numberDoc: number;
  router: Router;


  constructor(private mongo: MongoService,
    private _router: Router, private route: ActivatedRoute) {
     localStorage.clear();
    this.router = _router;

    console.log('Array length: ' + this.songs.length);
    console.log('localstorage length: ' + localStorage.length);

       mongo.login()
       .then (() => {
           mongo.getDocuments().then(docs => {
            this.arrayDocs = docs;

             for (let i = 0; i < this.arrayDocs.length; i++) {
                let mSong: MongoJSON;
                let song: SongClass;
                mSong = this.arrayDocs[i];
                song = new SongClass(mSong.Title, mSong.Band, mSong.Type, mSong.Url);
                this.songs.push(song);
              }
              this.dataSource = new MatTableDataSource( this.songs );
              console.log('Doc Names:',  this.arrayDocs );
              console.log('Doc Lenght:',  this.arrayDocs.length );
           });
       });
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
       console.log('Titulo Original', this.songs[indexOriginal].getTitle());

        this.mongo.replaceDocument(
          this.getSong(indexOriginal).getTitle(),
          this.getSong(indexOriginal).getBand(),
          reemplazo.getTitle(), reemplazo.getBand(),
          reemplazo.getType(), reemplazo.getUrl()
        );
        this.songs[indexOriginal] = reemplazo;
        const index2 = this.songs.indexOf(reemplazo);
       if (indexOriginal === index2) { return true; } else {return false; }
  }
  addSong(s: SongClass): boolean {
      this.songs.push(s);
      const index = this.songs.indexOf(s);
      console.log('Index:', index.toString());
      this.mongo.insertDocument(s.getTitle(),
       s.getBand(), s.getType(), s.getUrl());
      return true;
  }
  deleteSong(s: SongClass): boolean {
       const index = this.songs.indexOf(s);
       const borrado = this.songs.splice(index, 1);
       console.log('Borrar Elemento:', s.getTitle());
       this.mongo.deleteDocument(s.getTitle());
       this.dataSource = new MatTableDataSource( this.songs );
       // alert('Se ha borrado la Canción nr :' + index);
       if (borrado.length === 1) { return true; } else {return false; }
  }
  countSongs(): number {
      return this.songs.length;
  }
}
