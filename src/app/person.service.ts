import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Person } from './person';

@Injectable()


@Injectable()
export class PersonService {
  
  /*Necesario para simulación de request HTTP*/
  private headers = new Headers({'Content-Type': 'application/json'});
  private peopleUrl = 'api/people';  // URL to web api
  constructor(private http: Http) { }

  /*Lista las personas (método solicitado en PersonComponent) devuelve un array de Personas*/

  getPeople(): Promise<Person[]> {
    return this.http.get(this.peopleUrl)
               .toPromise()
               .then(response => response.json().data as Person[])
               .catch(this.handleError);
  }

  /*Permite ver los detalles de la persona identificada con el id provisto*/
  getPerson(id: number): Promise<Person> {
    const url = `${this.peopleUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Person)
      .catch(this.handleError);
  }

  /*Realiza el eliminado de la persona */
  delete(id: number): Promise<void> {
    const url = `${this.peopleUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  /*Creación de personas, método POST*/
  create(name: string): Promise<Person> {
    return this.http
      .post(this.peopleUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  /*Actualización de personas, método PUT*/
  update(person: Person): Promise<Person> {
    const url = `${this.peopleUrl}/${person.id}`;
    return this.http
      .put(url, JSON.stringify(person), {headers: this.headers})
      .toPromise()
      .then(() => person)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}
