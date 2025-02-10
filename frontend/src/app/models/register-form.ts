import { FormControl } from "@angular/forms";

export interface RegisterForm {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
}
