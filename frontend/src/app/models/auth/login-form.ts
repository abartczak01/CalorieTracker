import { FormControl } from "@angular/forms";

export interface LoginForm {
    readonly email: FormControl<string | null>;
    readonly password: FormControl<string | null>;
}
