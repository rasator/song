import { Injectable } from '@angular/core';
import { Stitch, RemoteMongoClient, StitchAuthListener, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

@Injectable({
  providedIn: 'root'
})

export class MongoService {
  client: any;
  coll: any;
  db: any;
  userId: any;
  numberDoc: any;
  constructor() { }

  login() {
    if (!Stitch.hasAppClient('song-dowey')) {
      console.log('Does Not have an AppClient, initialize one.');
      this.client = Stitch.initializeDefaultAppClient('song-dowey');
      } else {
      this.client = Stitch.defaultAppClient;
      }

    if (!this.client.auth.isLoggedIn) {
        this.client.auth.loginWithCredential(new AnonymousCredential());
        console.log('Logged Status ', this.client.auth.isLoggedIn);
      }
    this.db = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('SongDB');
    this.coll = this.db.collection('SongCL');
    this.userId = this.client.auth.user.id;

    console.log('Collection:', this.coll);
    console.log('Client id', this.client.auth.user.id);
    console.log('Database id', this.db);
    console.log('Collection id', this.coll);
    console.log('User id', this.userId);

    // this.coll.insertOne({owner_id: this.userId, name: 'Daniel'});
    // this.coll.insertOne({owner_id: this.userId, name: 'Hector'});
    // this.coll.insertOne({owner_id: this.userId, name: 'Sara'});

    this.coll.count()
    .then((num_returned) => {
        this.numberDoc = num_returned;
        console.log('Found ' + num_returned + ' documents');
    });
  }

  getDocuments() {
    return this.coll.find({owner_id: this.userId}, { limit: 10});
  }

  insertDocument(title, band, type, url) {
    this.coll.insertOne({
      owner_id: this.userId,
      title: title,
      band: band,
      type: type,
      url: url
    }).catch(err => console.error('INSERT ERROR:', err.message));
  }

  deleteDocument(nombre) {
    return this.coll.deleteOne({
      owner_id: this.userId,
      'Nombre': nombre
    }).then((result) => {
      console.log('Deleted ' + result.deletedCount + ' documents');
      return result;
   }).catch(err => console.error('DELETE ERROR:', err.message));
  }

}
