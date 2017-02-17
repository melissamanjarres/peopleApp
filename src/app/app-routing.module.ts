import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailComponent } from './person-detail.component';
import { PersonComponent } from './person.component';


const routes: Routes=[
	{path: 'people', component: PersonComponent},
	{path: 'detail/:id', component: PersonDetailComponent}
];

@NgModule({
	imports: [
    RouterModule.forRoot(routes)
    ],
	exports: [RouterModule]
})

export class AppRoutingModule{}