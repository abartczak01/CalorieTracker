import { ProductQuantity } from "./product-quantity";
export interface Meal {
    readonly id: number;
    readonly name: string;
    readonly productQuantities: ProductQuantity[];
    readonly mealKcal: number;
    readonly mealProtein: number;
    readonly mealFat: number;
    readonly mealCarbohydrate: number;
    readonly mealSodium: number;
    readonly mealFiber: number;
}
