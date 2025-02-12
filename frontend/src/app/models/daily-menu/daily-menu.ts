import { Meal } from "./meal";

export interface DailyMenu {
    readonly id: number;
    readonly date: string;
    readonly userId: number;
    readonly meals: Meal[];
    readonly totalKcal: number;
    readonly totalProtein: number;
    readonly totalCarbohydrate: number;
    readonly totalFat: number;
    readonly totalSodium: number;
    readonly totalFiber: number;
}
