import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ServiceService } from './service.service';
import { RouterModule } from '@angular/router';
import { IContacts } from '../model/IContacts';

@Component({
  selector: 'app-conyacts',
  standalone: true,
  imports: [
    DatePipe,
    RouterModule
  ],
  templateUrl: './conyacts.component.html',
  styleUrl: './conyacts.component.css'
})
export default class ConyactsComponent implements OnInit {
  private contactsService = inject(ServiceService);
  public contacts: IContacts[] = [];

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((contacts: any) => {
      this.contacts = contacts;
    });
  }

  delete(id: number) {
    this.contactsService.deleteContact(id).subscribe(() => {
      this.contacts = this.contacts.filter((contact: any) => contact.id !== id);
    });
  }

}
