import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';

@Component({
  selector: 'so-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  clearStorage() {
    if (window.confirm('Are sure you want to clear all songs from storage ?')) {
      localStorage.clear();
    }
}

}
