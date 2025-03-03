export interface Product {
    readonly id: number | null;
    readonly name: string;
    readonly ingredients: string | null;
    readonly kcal: number;
    readonly protein: number;
    readonly fat: number;
    readonly carbohydrate: number;
    readonly fiber: number;
    readonly sodium: number;
    readonly isVegan: boolean;
    readonly createdAt: string | null;
}