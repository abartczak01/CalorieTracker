export interface ProductFilter {
    readonly name: string;
    readonly vegan: string;
    readonly protein: boolean;
    readonly kcal: { readonly min: number; readonly max: number };
}
