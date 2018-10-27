import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent} from './views/add/add.component';
import { ListComponent} from './views/list/list.component';
import { AboutComponent} from './views/about/about.component';
import { EditComponent} from './views/edit/edit.component';
import { LoginComponent} from './views/login/login.component';

const routes: Routes = [
    {
      path: '',
      component: ListComponent
    },
    {
      path: 'add',
      component: AddComponent
    },
    {
      path: 'edit/:index',
      component: EditComponent
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {
      path: '**',
      redirectTo: '/'
    }
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes), AddComponent, LoginComponent,
            ListComponent, AboutComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
