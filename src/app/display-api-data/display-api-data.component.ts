import { Component, Inject, inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { delay, map, Observable, of } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserForm } from '../models/userForm.model';

@Component({
  selector: 'app-display-api-data',
  templateUrl: './display-api-data.component.html',
  styleUrls: ['./display-api-data.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, FormsModule],
})
export class DisplayApiDataComponent {

  constructor(private http: HttpClient) { }

  users: User[] | null = null;

  ngOnInit() {
    this.getUsers().subscribe({
      next: data => {
        this.users = data;
        console.log(this.users);
      },
      error: error => {
        console.error(error);
      }
    })
  }

  getUsersUrl = `https://jsonplaceholder.typicode.com/users`

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getUsersUrl);
  }

  isUserEditFormOpen = false;
  data: User | null = null;
  userForm: FormGroup | null = null;

  editUserDetails(user: User): void {
    console.log(user);
    this.data = user;
    this.isUserEditFormOpen = true

    this.userForm = new FormGroup<UserForm>({
      name: new FormControl(this.data.name, [Validators.required, this.forbiddenNameValidator()]),
      username: new FormControl(this.data.username, [Validators.required, this.passValueToPhone()]),
      city: new FormControl(this.data.address.city, [Validators.required]),
      phone: new FormControl(this.data.phone,[],[this.phoneValidation()]),
      website: new FormControl(this.data.website, [Validators.required]),
      company: new FormControl(this.data.company.name, [Validators.required])
    })
  }

  forbiddenNameValidator(): ValidatorFn {
    const names = ['santhosh', 'jeevan'];
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = names.some(name => name === control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  // isPhoneNumberOptional = false;
  username = '';
  passValueToPhone(): ValidatorFn {
    this.phoneValidation()
    const names = ['santhosh', 'jeevan'];
    return (control: AbstractControl): ValidationErrors | null => {
      this.username = control.value
      console.log('username', this.username);
      
      const forbidden = names.some(name => name === control.value);
      // this.isPhoneNumberOptional = forbidden;
      // console.log("forbidden", this.isPhoneNumberOptional);
      return null;
    }
  }

  checkIfUsernameExists(value: string, phonenumber: string) {
    const names = ['santhosh', 'jeevan'];
    console.log('value',value , 'phonenumber', phonenumber);
    
    return of(names.some((a) =>{ 
      a !== value && phonenumber === null
    })).pipe(
      delay(10)
    );
  }

  phoneValidation(): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfUsernameExists(this.username, control.value)
      .pipe(
        map((result: boolean) => 
          result ? { phoneNumberOptional: true } : null
        )
      );
  }
}

  onCancelClick(): void {
    this.isUserEditFormOpen = false;
  }

  onOkClick() {
    if (this.userForm !== null && this.userForm.invalid) {
      console.log("form not valid");
    }
    else {
      if (this.data !== null && this.userForm !== null) {
        this.data.name = this.userForm.value.name.toString();
        this.data.username = this.userForm.value.username.toString();
        this.data.address.city = this.userForm.value.city.toString();
        this.data.phone = this.userForm.value.phone.toString();
        this.data.website = this.userForm.value.website.toString();
        this.data.company.name = this.userForm.value.company.toString();
        this.isUserEditFormOpen = false;
      }
    }
  }
}