export interface Meal {
    id: string;
    timeMeal: string;
    descriptionMeal:string;
    kcal: number;
}

export type ApiMeal = Omit<Meal, 'id'>;

export interface ApiMeals{
    [id:string]: ApiMeal;
}

export interface MealMutation{
    timeMeal: string;
    descriptionMeal:string;
    kcal: string;
}