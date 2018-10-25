import { Injectable } from '@angular/core';
import { Stitch, RemoteMongoClient, StitchAuthListener, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

@Injectable({
  providedIn: 'root'
})

export class MongoService {
  public client: any;
  public coll: any;
  public db: any;
  public userId: any;
  public numberDoc: any;
         arrayDocs: any;

  constructor() {

   }

  login() {
      if (!Stitch.hasAppClient('song-dowey')) {
        console.log('Does Not have an AppClient, initialize one.');
        this.client = Stitch.initializeDefaultAppClient('song-dowey');
      } else {
        this.client = Stitch.defaultAppClient;
      }

      this.db = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('SongDB');

      return this.client.auth.loginWithCredential(new AnonymousCredential())
      .then(user => {
         this.userId = user;
         this.coll = this.db.collection('SongCL');
         console.log('Logged Status1 ', this.client.auth.isLoggedIn);
        });
      }

  getDocuments() {
        console.log('Logged Status2 ', this.client.auth.isLoggedIn);
        console.log('Client id', this.client.auth.user.id);
        console.log('Database id', this.db);
        console.log('Collection id', this.coll);
        console.log('User id', this.userId);

        return this.db.collection('SongCL').find({}, { limit: 100}).asArray()
        .then(docs => {
              console.log('Found docs', docs);
              console.log('[MongoDB Stitch] Connected to Stitch');
              return docs;
        });
  }

  countDocuments() {
    return this.coll.count()
    .then((num_returned) => {
        this.numberDoc = num_returned;
        console.log('Found ' + num_returned + ' documents');
        return num_returned;
    });
  }

  insertDocument(title, band, type, url: string) {
      console.log('Insertar Titulo:', title );
      this.coll.insertOne(
      {
       Title: title,
       Band: band,
       Type: type,
       Url: url}
      ).catch(err => console.error('INSERT ERROR:', err.message));
  }

  replaceDocument(titleOrg, bandOrg, title, band, type, url: string) {
    this.coll.updateOne(
       {Title : titleOrg},
       {'$set': {
        Title: title,
        Band: band,
        Type: type,
        Url: url}})
        .then(result => {
          console.log('result:', result);
        });


}

  deleteDocument(titulo) {
    this.coll.deleteOne({
      'Title': titulo
    }).then((result) => {
      console.log('Deleted ' + result.deletedCount + ' documents');
   });
  }

}
