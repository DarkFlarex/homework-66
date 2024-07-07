import {ApiMeal, MealMutation} from "../../types";
import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import axiosApi from "../../AxiosApi";

interface Props{
    existingMeal?:ApiMeal;
}

const emptyState: MealMutation = {
    timeMeal: '',
    descriptionDishes: '',
    kcal: '',
};

const TimeMealCategories = [
    {title: 'Breakfast', id: 'breakfast'},
    {title: 'Snack', id: 'snack'},
    {title: 'Lunch', id: 'lunch'},
    {title: 'Dinner', id: 'dinner'},
];

const MutateMeal:React.FC<Props> = ({existingMeal}) => {
    const initialState: MealMutation = existingMeal
        ? { ...existingMeal, kcal: existingMeal.kcal.toString() }
        : emptyState;

    const navigate = useNavigate();
    const { id } = useParams();
    const [mealMutation, setMealMutation] = useState<MealMutation>(initialState);
    const [isLoading, setIsLoading] = useState(false);

        const fetchOneMeal = useCallback(async (id: string) => {
            try {
                const response = await axiosApi.get<ApiMeal>(`/meals/${id}.json`);
                if (response.data) {
                    setMealMutation({
                        timeMeal: response.data.timeMeal,
                        descriptionDishes: response.data.descriptionDishes,
                        kcal: response.data.kcal.toString(),
                    });
                }
            } catch (error) {
                console.error('Error fetching meal', error);
            }
        }, []);

        useEffect(() => {
            if (id) {
                void fetchOneMeal(id);
            } else {
                setMealMutation(initialState);
            }
        }, [id, fetchOneMeal]);

        const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = event.target;

            setMealMutation(prevState => ({
                ...prevState,
                [name]: value,
            }));
        };

        const onFormSubmit = async (event: React.FormEvent) => {
            event.preventDefault();
            setIsLoading(true);

            try {
                const postData = {
                    ...mealMutation,
                    kcal: parseFloat(mealMutation.kcal),
                };
                if (id) {
                    await axiosApi.put(`/meals/${id}.json`, postData);
                } else {
                    await axiosApi.post('/meals.json', postData);
                }

                navigate('/');
            } catch (e) {
                console.error('Error happened!', e);
            } finally {
                setIsLoading(false);
            }
        };

    return (
        <div className="MutateMeal bg-light p-3 text-start rounded">
            <h1>{id ? 'Edit Meal' : 'Add New Meal'}</h1>
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
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
                <label className="mb-2">Meal description:</label>
                <input
                    type="text"
                    name="descriptionDishes"
                    required
                    className="AddSelectForm-input col-5 mb-3"
                    value={mealMutation.descriptionDishes}
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
                <button type="submit" disabled={isLoading}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default MutateMeal;