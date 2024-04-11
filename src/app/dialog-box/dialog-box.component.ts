import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DisplayApiDataComponent } from '../display-api-data/display-api-data.component';
import { User } from '../models/user.model';
import { DialogData } from '../models/dialogdata.model';
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
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) { }

  userForm = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required, forbiddenNameValidator()]),
    username: new FormControl(this.data.username),
    city: new FormControl(this.data.address.city),
    phone: new FormControl(this.data.phone),
    website: new FormControl(this.data.website),
    company: new FormControl(this.data.company.name)
  })

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

export function forbiddenNameValidator(): ValidatorFn {
  const names = ['santhosh', 'jeevan'];
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = names.some(name => name === control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

