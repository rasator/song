import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongClass } from '../../class/song.class';
import { SongServiceService } from '../../services/song-service.service';
import { FormsModule, FormControl } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { YouTube, YouTubeItem, SearchService } from '../../services/search.service';

@NgModule({
  imports: []
})

@Component({
  selector: 'so-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
public songs: Array<SongClass>;
private title: string;
private band: string;
private type: string;
private url: string;
public userForm: FormGroup;
public searchForm: FormGroup;
private search: string;

error: any;
items: YouTubeItem[];
brother: YouTube;

router: Router;

  constructor(private _router: Router, private songService: SongServiceService,
    private formBuilder: FormBuilder, private youTubeService: SearchService) {
      this.title = '';
      this.band = '';
      this.type = '';
      this.url = '';
      this.router = _router;
      this.search = '';

      this.userForm = this.formBuilder.group({
              'title': ['', [Validators.required, Validators.minLength(4)]],
              'band': ['', [Validators.required, Validators.minLength(4)]],
              'type': ['', [Validators.required, Validators.minLength(4)]],
              'url': ['', [Validators.required, Validators.minLength(4)]]
             });

      this.searchForm = this.formBuilder.group({
              'search': ['', [Validators.required, Validators.minLength(4)]]
             });

  }

  ngOnInit() {
  }

  clear() {
    this.brother = undefined;
    this.error = undefined;
    this.items = undefined;
  }

  showBrother() {
    this.youTubeService.search(this.searchForm.value.search)
      .subscribe(
        (data: YouTube) => this.brother = { ...data }, // success path
        error => this.error = error // error path
      );
  }

  copy(i: YouTubeItem) {
    this.userForm.setValue({
              title: i.snippet.title,
              band: '',
              type: '',
              url: i.id.videoId
            });
  }

  alta(s: SongClass) {
    this.songService.addSong(s);
    alert('Se ha añadido la Canción :' + s.getTitle() );
    this.router.navigate(['list']);
  }

  alEnviar() {
    const s = new SongClass(this.userForm.value.title,
                    this.userForm.value.band,
                    this.userForm.value.type,
                    this.userForm.value.url);
    this.alta(s);
  }

}
