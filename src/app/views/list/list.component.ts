import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { MatTableDataSource } from '@angular/material';
import {SongServiceService} from '../../services/song-service.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

import {SongClass} from '../../class/song.class';

@Component({
  selector: 'so-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  public songs: Array<SongClass>;
  dataSource: MatTableDataSource<SongClass>;
  displayedColumns = ['title', 'band', 'type'];
  videoUrl: SafeHtml;


  constructor(private route: ActivatedRoute,
    private SongService: SongServiceService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.songs = this.SongService.getSongs();
    this.dataSource = new MatTableDataSource( this.songs );
    this.videoUrl = '';
  }

  onRowClicked(row: SongClass) {
    console.log('Url clicked: ', row.getUrl());
    const unsafeUrl = 'https://www.youtube.com/embed/' + row.getUrl() 
    + '?enablejsapi=1&rel=0&playsinline=1&autoplay=1';
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

