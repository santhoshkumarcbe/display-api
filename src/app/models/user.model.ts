import { FormControl } from "@angular/forms";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
  }
  
  export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
  }
  
  export interface Geo {
    lat: string;
    lng: string;
  }
  
  export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }

  export interface UserForm {
    email: FormControl<string | null>
    name: FormControl<string | null>;
    username: FormControl<string | null>;
    city: FormControl<string | null>;
    phone: FormControl<string | null>;
    website: FormControl<string | null>;
    company: FormControl<string | null>;
}