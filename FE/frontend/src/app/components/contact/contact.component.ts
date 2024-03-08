import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from '../../services/email.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactFormGroup: FormGroup = this.formBuilder.group({});
 // storage: Storage = sessionStorage;


  constructor(private formBuilder: FormBuilder,
    private emailService: EmailService,
    private router: Router) { }
  ngOnInit(): void {


    //validation
    this.contactFormGroup = this.formBuilder.group({
      contact: this.formBuilder.group({
        contactName: new FormControl('', [Validators.required,
        Validators.minLength(2)]),
        contactNum: new FormControl('', [Validators.required,
        Validators.minLength(10)]), //lookup validation for digits
        contactEm: new FormControl('', [Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9._]+\\.[a-z]{2,4}$')]), 
        subject: new FormControl('', [Validators.required,
          Validators.minLength(4)]),
        message: new FormControl()
      })
    })

  }

  get contactName() { return this.contactFormGroup.get('contact.contactName'); }
  get contactEm() { return this.contactFormGroup.get('contact.contactEm'); }
  get contactNum() { return this.contactFormGroup.get('contact.contactNum'); }
  get subject() {return this.contactFormGroup.get('contact.subject')}
  get message() {return this.contactFormGroup.get('contact.message')}

  onSubmit() {
    if (this.contactFormGroup.invalid) {
      this.contactFormGroup.markAllAsTouched();
      return;
    }
  const contact = this.contactFormGroup.controls['contact'].value;
  if (contact.message==null || contact.message==""){
    contact.message='no message';
  }
   let em= this.emailService.constructEmail( contact.contactName,
     contact.contactNum, contact.contactEm, contact.message, contact.subject);

    this.emailService.sendEmail(em).subscribe({
      next: (response: any) => {
        alert(`Your email has been sent ..`);
        this.resetForm();
      },
      error: (err: { message: any; }) => {
        alert(`Error Message: ${err.message}`)
        this.resetForm();
      }
    })
  }
  resetForm() {
    this.contactFormGroup.reset();
   // this.router.navigateByUrl("/landing");
  }

}
