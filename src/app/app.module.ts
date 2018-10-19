import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { MaterialModule } from './shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './views/list/list.component';
import { SongServiceService } from './services/song-service.service';
import { AddComponent } from './views/add/add.component';
import { AboutComponent } from './views/about/about.component';
import { SearchService } from '../app/services/search.service';
import { HttpClientModule } from '@angular/common/http';
import { EditComponent } from './views/edit/edit.component';
import { MongoService} from '../app/services/mongo.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListComponent,
    AddComponent,
    AboutComponent,
    EditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule],
  providers: [SongServiceService, SearchService, MongoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
