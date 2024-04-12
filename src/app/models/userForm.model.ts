import { FormControl } from "@angular/forms";

export interface UserForm {
    name: FormControl<string | null>;
    username: FormControl<string | null>;
    city: FormControl<string | null>;
    phone: FormControl<string | null>;
    website: FormControl<string | null>;
    company: FormControl<string | null>;
}