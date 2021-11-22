import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiesComponent } from './ties/ties.component';

const routes: Routes = [
  {
    path: 'ties',
    component: TiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
