import { Component, inject } from '@angular/core';
import { User, UserForm } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-display-api-data',
  templateUrl: './display-api-data.component.html',
  styleUrls: ['./display-api-data.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, MatInputModule],
})
export class DisplayApiDataComponent {

  constructor() { }

  http: HttpClient = inject(HttpClient);

  columns = ['ID', 'Name', 'Username', 'Email', 'City', 'Phone', 'Website', 'Company', 'Edit'];
  names = ['santhosh', 'jeevan'];
  users: User[] | null = null;
  isPhoneNumberOptional = false;
  isUserEditFormOpen = false;
  user: User | null = null;
  getUsersUrl = `${environment.baseUrl}/users`

  userForm = new FormGroup<UserForm>({
    email: new FormControl<string>(''),
    name: new FormControl<string>(''),
    username: new FormControl<string>(''),
    city: new FormControl(),
    phone: new FormControl(),
    website: new FormControl(),
    company: new FormControl()
  })

  ngOnInit() {
    this.getUsers().subscribe({
      next: data => {
        this.users = data;
      },
      error: error => {
        console.error(error);
      }
    })
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getUsersUrl);
  }

  editUserDetails(user: User): void {
    this.user = user;
    this.isUserEditFormOpen = true
    this.userForm = new FormGroup<UserForm>({
      email: new FormControl({ value: this.user.email, disabled: true }, [Validators.required]),
      name: new FormControl(this.user.name, [Validators.required, this.forbiddenNameValidator()]),
      username: new FormControl(this.user.username, [Validators.required, this.checkUsernameForPhoneValidation()]),
      city: new FormControl(this.user.address.city, [Validators.required]),
      phone: new FormControl(this.user.phone, [Validators.required]),
      website: new FormControl(this.user.website, [Validators.required]),
      company: new FormControl(this.user.company.name, [Validators.required])
    })
  }

  forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let isInputNameContainsInNames = false;
      this.names.forEach(name => {
        if (name === control.value) {
          isInputNameContainsInNames = true
        }
      })
      return isInputNameContainsInNames ? { forbiddenName: { value: control.value } } : null;
    };
  }

  checkUsernameForPhoneValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneControl = this.userForm.get('phone');
      const isInputNameContainsInNames = this.names.some(name => name === control.value);
      this.isPhoneNumberOptional = isInputNameContainsInNames;

      if (isInputNameContainsInNames) {
        phoneControl?.clearValidators();
        phoneControl?.updateValueAndValidity();
      } else {
        phoneControl?.addValidators(Validators.required)
        phoneControl?.updateValueAndValidity();
      }
      
      return null;
    }
  }

  phoneNumberRequiredValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error: boolean = !this.isPhoneNumberOptional && control.value === ''
      return error ? { required: true } : null;
    };
  }

  onCancelClick(): void {
    this.isUserEditFormOpen = false;
  }

  onOkClick() {
    if (this.user !== null && this.userForm !== null && this.userForm.valid) {
      this.user.name = this.userForm.value.name!.toString();
      this.user.username = this.userForm.value.username!.toString();
      this.user.address.city = this.userForm.value.city!.toString();
      this.user.phone = this.userForm.value.phone!.toString();
      this.user.website = this.userForm.value.website!.toString();
      this.user.company.name = this.userForm.value.company!.toString();
      this.isUserEditFormOpen = false;
    }
  }
}
