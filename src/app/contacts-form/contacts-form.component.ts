import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServiceService } from '../contacts/service.service';
import { IContacts } from '../model/IContacts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts-form',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './contacts-form.component.html',
  styleUrl: './contacts-form.component.css'
})
export default class ContactsFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contactsService = inject(ServiceService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  form?: FormGroup;
  contact?: IContacts;
  errors: string[] = [];

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.contactsService.getContact(id).subscribe((contact: any) => {
        this.contact = contact;
        this.form = this.fb.group({
          name: [contact.name , [Validators.required]],
          email: [contact.email , [Validators.required, Validators.email]],
        });
      });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
      });
    }      
  }


  create() {
    if (this.form?.invalid) {
      return;
    }

    const contactForm = this.form!.value;
    let request: Observable<IContacts>;

    if (this.contact) {
      request = this.contactsService.updateContact(this.contact.id, contactForm);
    } else {
      request = this.contactsService.addContact(contactForm);
    }

    request.subscribe({
      next: () => {
        this.router.navigate(['/contacts']);
        this.errors = [];
      },
      error: (err) => {
        console.error(err);
        this.errors = err.error.errors;
      }
    })

  }
}
