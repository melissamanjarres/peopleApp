/* Librerias importadas para el manejo del componente PersonComponent*/
import { Component,  OnInit} from '@angular/core';
import { Person } from './person';
import { PersonService } from './person.service';
import { Router, RouterModule } from '@angular/router';



@Component({
  moduleId: module.id,
  selector: 'person-app',
  templateUrl: './person.component.html',
  styleUrls: ['./app.component.css']
})

export class PersonComponent implements OnInit{
  people: Person[];
  selectedPerson: Person;
  
  /* Constructor de Personas, utilizando el servicio de personas person.service.ts, 
    requerido para el listado de personas inscritas, insercion y eliminación*/
  constructor(
  private router: Router,
  private personService: PersonService) { }

  /* Lista las personas almacenadas solicita el metodo getPeople de PersonService*/
  getPeople(): void {
    this.personService.getPeople().then(people => this.people = people);
  }

  
  ngOnInit(): void {
    this.getPeople();
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
    this.router.navigate(['/detail', this.selectedPerson.id]);

  }

  /* Agrega nuevas personas a la lista, con indice incremental solicita el metodo add de PersonService*/
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.personService.create(name)
      .then(person => {
        this.people.push(person);
        this.selectedPerson = null;
      });
  }

  /* Elimina personas de la lista, buscando a través de id la persona correspondiente
  solicita el metodo delete de PersonService*/
  delete(person: Person): void {
    this.personService
        .delete(person.id)
        .then(() => {
          this.people = this.people.filter(p => p !== person);
          if (this.selectedPerson === person) { this.selectedPerson = null; }
        });
  }

  /*Permite ver los detalles de la persona seleccionada según id*/
  gotoDetail(): void{
    this.router.navigate(['/detail', this.selectedPerson.id]);
  } 
}