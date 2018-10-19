import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { llaves } from '../../../../PrivateKeys/llaves';

export interface YouTube {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
    };
  items: YouTubeItem [];
}

export interface YouTubeItem {
kind: string;
etag: string;
id: {
  kind: string;
  videoId: string;
  channelId: string;
  playlistId: string;
};
snippet: {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    key: {
      url: string;
      width: number;
      height: number;
    };
  };
  channelTitle: string;
};
}

@Injectable({
  providedIn: 'root'
})

export class SearchService {
   key: string;
   baseUrl: string;

  constructor(private http: HttpClient) {
     this.key = llaves.key;
     this.baseUrl = 'https://www.googleapis.com/youtube/v3/' +
     'search?part=snippet&q=';
  }

search(queryString: string) {
   // Example You Tube Query:
   // https://www.googleapis.com/youtube/v3/
   // search?part=snippet&q=php&key=put_your_api_key_here

    const fullUrl = this.baseUrl + queryString + '&key=' + this.key;
    return this.http.get<YouTube>(fullUrl);
}

}
