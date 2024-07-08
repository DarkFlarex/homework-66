import React, { useState } from 'react';
import { ApiMeal } from '../../types';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import MutateMeal from "../../components/MealForm/MealForm";
import axiosApi from "../../AxiosApi";

const NewMeal: React.FC = () => {
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);

    const createMeal = async (meal: ApiMeal) => {
        try {
            setIsCreating(true);
            await axiosApi.post('/meals.json', meal);
            navigate('/');
            toast.success('Meal Created.');
        }catch (e) {
            toast.error('Error Created!');
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="row mt-2">
            <div className="col">
                <MutateMeal onSubmit={createMeal} isLoading={isCreating} />
            </div>
        </div>
    );
};

export default NewMeal;
