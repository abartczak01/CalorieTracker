import { FormControl } from "@angular/forms";

export interface RegisterForm {
    readonly email: FormControl<string | null>;
    readonly password: FormControl<string | null>;
}
