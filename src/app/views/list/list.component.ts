import { Component, OnInit, NgModule} from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { MatTableDataSource } from '@angular/material';
import { SongServiceService} from '../../services/song-service.service';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { FormsModule, FormControl } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SongClass} from '../../class/song.class';

@NgModule({
  imports: []
})

@Component({
  selector: 'so-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  public songs: Array<SongClass>;
  displayedColumns = ['title', 'band', 'type', 'action'];
  videoUrl: SafeHtml;

  constructor(private _router: Router, private route: ActivatedRoute,
    public SongService: SongServiceService,
    private sanitizer: DomSanitizer, private formBuilder: FormBuilder) {
    }

  ngOnInit() {

    this.songs = this.SongService.getSongs();
    // this.dataSource = new MatTableDataSource( this.songs );
    const unsafeUrl = 'https://www.youtube.com/embed/' +
    'jhdFe3evXpk?enablejsapi=1&rel=0&playsinline=1&autoplay=1';
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);

  }

  onPlayClicked(row: SongClass) {
    console.log('Url clicked: ', row.getUrl());
    const unsafeUrl = 'https://www.youtube.com/embed/' + row.getUrl()
    + '?enablejsapi=1&rel=0&playsinline=1&autoplay=1';
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }

  onDeleteClicked(row: SongClass) {
    if (window.confirm('Are sure you want to delete this song ?')) {
      console.log('Borrado Elemento', row);
      this.SongService.deleteSong(row);
      // this.SongService.dataSource = new MatTableDataSource( this.SongService.songs );
       }
  }

  onEditClicked(row: SongClass) {
    this._router.navigate(['/edit',
    this.songs.indexOf(row)
    ]);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.SongService.dataSource.filter = filterValue;
  }
}

