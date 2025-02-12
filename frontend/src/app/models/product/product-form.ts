import { FormControl, FormGroup } from "@angular/forms";

export interface ProductForm {
    readonly name: FormControl<string>;
    readonly ingredients: FormControl<string | null>;
    readonly isVegan: FormControl<boolean>;
    readonly nutritionalInfo: FormGroup<{
        readonly kcal: FormControl<number>;
        readonly protein: FormControl<number>;
        readonly fat: FormControl<number>;
        readonly carbohydrate: FormControl<number>;
        readonly fiber: FormControl<number>;
        readonly sodium: FormControl<number>;
    }>;
}
