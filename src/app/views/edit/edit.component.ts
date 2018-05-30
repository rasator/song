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
  selector: 'so-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
public song: SongClass;
private title: string;
private band: string;
private type: string;
private url: string;
public userForm: FormGroup;
public searchForm: FormGroup;
private search: string;
private sOriginal: SongClass;
indexOriginal: any;
error: any;
items: YouTubeItem[];
brother: YouTube;

router: Router;

  constructor(private _router: Router, private songService: SongServiceService,
    private formBuilder: FormBuilder, private youTubeService: SearchService,
    private route: ActivatedRoute) {
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
    this.indexOriginal = this.route.snapshot.paramMap.get('index');
    this.sOriginal = this.songService.getSong(this.indexOriginal);
      this.title = this.sOriginal.getTitle();
      this.band = this.sOriginal.getBand();
      this.type = this.sOriginal.getType();
      this.url = this.sOriginal.getUrl();

    this.userForm.setValue({
      title: this.title,
      band: this.band,
      type: this.type,
      url: this.url
    });
  }

  clear() {
    this.brother = undefined;
    this.error = undefined;
    this.items = undefined;
  }

  cancel() {
    this._router.navigate(['/']);
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

  alEnviar() {
    const sReemplazo = new SongClass(this.userForm.value.title,
                    this.userForm.value.band,
                    this.userForm.value.type,
                    this.userForm.value.url);
    this.songService.changeSong(this.indexOriginal, sReemplazo);
    this.router.navigate(['/']);

  }

}
