import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuestionContainerComponent} from "./questions/question-container.component";


const routes: Routes = [
  { path: 'questions', component: QuestionContainerComponent },
  { path: '**', redirectTo: 'questions', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
