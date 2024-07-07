export interface ApiMeal {
    id: string;
    timeMeal: string;
    descriptionDishes:string;
    kcal: number;
}

export interface ApiMeals{
    [id:string]: ApiMeal;
}

export interface Meal extends ApiMeal{
    id:string;
}

export interface MealMutation{
    timeMeal: string;
    descriptionDishes:string;
    kcal: string;
}