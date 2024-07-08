import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { ApiMeal} from '../../types';
import {toast} from "react-toastify";
import axiosApi from "../../AxiosApi";
import MutateMeal from "../../components/MealForm/MealForm";

const EditMeal = () => {
    const { id } = useParams();
    const [meal, setMel] = useState<ApiMeal | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchOneMeal = useCallback(async () => {
        const { data: meal } = await axiosApi.get<ApiMeal | null>(
            `/meals/${id}.json`,
        );
        setMel(meal);
    }, [id]);

    const updateMeal = async (meal: ApiMeal) => {
        try {
            setIsUpdating(true);
            await axiosApi.put(`/meals/${id}.json`, meal);
            toast.success('Meal Update!');
        }catch (e) {
            toast.error('Error Update!');
        }finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        void fetchOneMeal();
    }, [fetchOneMeal]);

    return (
        <div className="row mt-2">
            <div className="col">
                {meal && (
                    <MutateMeal
                        onSubmit={updateMeal}
                        existingMeal={meal}
                        isLoading={isUpdating}
                    />
                )}
            </div>
        </div>
    );
};

export default EditMeal;
