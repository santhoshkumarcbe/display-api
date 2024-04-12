import { Component, Inject, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class DialogBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: User,
  ) { }

  @Input() data!: User;
  
  userForm = new FormGroup({
    name: new FormControl<string>(this.data.name, [Validators.required, this.forbiddenNameValidator()]),
    username: new FormControl<string>(this.data.username, [Validators.required, this.passValueToPhone()]),
    city: new FormControl<string>(this.data.address.city, [Validators.required]),
    phone: new FormControl<string>(this.data.phone, [this.getPhoneValidation()]),
    website: new FormControl<string>(this.data.website, [Validators.required]),
    company: new FormControl<string>(this.data.company.name, [Validators.required])
  })

  forbiddenNameValidator(): ValidatorFn {
    const names = ['santhosh', 'jeevan'];
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = names.some(name => name === control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }


  isPhoneNumberOptional = false;
  passValueToPhone(): ValidatorFn {
    const names = ['santhosh', 'jeevan'];
    this.forbiddenPhoneValidator();
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = names.some(name => name === control.value);
      this.isPhoneNumberOptional = forbidden;
      console.log("forbidden", this.isPhoneNumberOptional);
      return null;
    }
  }

  getPhoneValidation(): ValidatorFn {
    if (!this.isPhoneNumberOptional) {
      return Validators.required;
    }
    else{
      return (control: AbstractControl): ValidationErrors | null => {
      return null;
      }
    }
  }

  forbiddenPhoneValidator(): ValidatorFn {
    const names = ['santhosh', 'jeevan'];
    return (control: AbstractControl): ValidationErrors | null => {
      const username = this.userForm
      const forbidden = names.some(name => name === username?.value);
      console.log('FORBIDDEN', forbidden);
      if (!forbidden) {
        return Validators.required;
      }
      else {
        return null
      }
    };
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick() {
    if (this.userForm.invalid) {
      console.log("form not valid");
    }
    else {
      this.data.name = this.userForm.value.name!.toString();
      this.data.username = this.userForm.value.username!.toString();
      this.data.address.city = this.userForm.value.city!.toString();
      this.data.phone = this.userForm.value.phone!.toString();
      this.data.website = this.userForm.value.website!.toString();
      this.data.company.name = this.userForm.value.company!.toString();
      this.dialogRef.close();
    }
  }
}



