import React, { useState } from 'react';
import { ApiMeal, MealMutation } from '../../types';
import ButtonSpinner from "../Spiner/ButtonSpiner";

interface Props {
    onSubmit: (meal: ApiMeal) => void;
    existingMeal?: ApiMeal;
    isLoading?: boolean;
}

const emptyState: MealMutation = {
    timeMeal: '',
    descriptionMeal: '',
    kcal: '',
};

const TimeMealCategories = [
    {title: 'Breakfast', id: 'breakfast'},
    {title: 'Snack', id: 'snack'},
    {title: 'Lunch', id: 'lunch'},
    {title: 'Dinner', id: 'dinner'},
];

const MealForm: React.FC<Props> = ({ onSubmit, existingMeal, isLoading = false }) => {
    const initialState: MealMutation = existingMeal
        ? { ...existingMeal, kcal: existingMeal.kcal.toString() }
        : emptyState;

    const [mealMutation, setMealMutation] = useState<MealMutation>(initialState);

    const onFieldChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        setMealMutation((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        onSubmit({
            ...mealMutation,
            kcal: parseFloat(mealMutation.kcal),
        });
    };

    return (
        <div className="MutateMeal bg-light p-3 text-start rounded">
            <h1>{existingMeal ? 'Edit Meal' : 'Add New Meal'}</h1>
            <form className="MutateMealForm d-flex flex-column align-items-start justify-content-center"
                  onSubmit={onFormSubmit}>
                <label className="mb-2">Select meal time:</label>
                <select
                    name="timeMeal"
                    required
                    className="AddSelectForm-input col-2 mb-3"
                    value={mealMutation.timeMeal}
                    onChange={onFieldChange}
                >
                    <option value="">Select meal time</option>
                    {TimeMealCategories.map(category => (
                        <option key={category.id} value={category.title}>
                            {category.title}
                        </option>
                    ))}
                </select>
                <label className="mb-2">Meal description:</label>
                <input
                    type="text"
                    name="descriptionMeal"
                    required
                    className="AddSelectForm-input col-5 mb-3"
                    value={mealMutation.descriptionMeal}
                    onChange={onFieldChange}
                    placeholder="Title"
                />
                <label className="mb-2">Calories:</label>
                <input
                    type="number"
                    name="kcal"
                    min="1"
                    required
                    className="AddSelectForm-input col-1 mb-3"
                    value={mealMutation.kcal}
                    onChange={onFieldChange}
                    placeholder="Content"
                />
                <button type="submit"
                        className="btn btn-primary mt-2"
                        disabled={isLoading}>
                    {isLoading && <ButtonSpinner/>}
                    Save
                </button>
            </form>
        </div>
    );
};

export default MealForm;
