import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';


@NgModule({
  imports: []
})

@Component({
  selector: 'so-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  router: Router;

  constructor(private _router: Router, private route: ActivatedRoute) {
      this.router = _router;

    }

  ngOnInit() {
  }

}
