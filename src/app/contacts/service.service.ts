import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IContacts } from '../model/IContacts';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/contacts';

  getContacts() {
    return this.http.get<IContacts[]>(`${this.url}/list`)
  }

  getContact(id: number) {
    return this.http.get<IContacts>(`${this.url}/list/${id}`);
  }

  addContact(contact: any) {
    return this.http.post<IContacts>(`${this.url}/create`, contact);
  }

  updateContact(id: number, contact: any) {
    return this.http.put<IContacts>(`${this.url}/update/${id}`, contact);
  }

  deleteContact(id: number) {
    return this.http.delete(`${this.url}/list/${id}`);
  }

}
