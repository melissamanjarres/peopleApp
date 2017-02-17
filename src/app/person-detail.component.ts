 import { Component, OnInit } from '@angular/core'; 
 import { Router, ActivatedRoute, Params } from '@angular/router';
 import { Location }  from '@angular/common';

 import { Person } from './person';
 import { PersonService } from './person.service';
 import 'rxjs/add/operator/switchMap';


 @Component({ 
  moduleId: module.id,
  selector: 'person-detail', 
  templateUrl: './person-detail.component.html'  })  

  export class PersonDetailComponent implements OnInit{ 
  /* Permite la edición y vista de una persona particular, obtiene la persona requerida haciendo
  uso de getPerson en PersonService*/
  person: Person;

   constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private location: Location
  ){}


  ngOnInit(): void{
    this.route.params
    .switchMap((params : Params) => this.personService.getPerson(+params['id']))
    .subscribe((person:Person) => this.person = person);
  }

  goBack(): void{
    this.location.back();
  }

  save(): void {
    this.personService.update(this.person)
      .then(() => this.goBack());
  }


}