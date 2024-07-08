import {Link, useLocation} from "react-router-dom";
import {ApiMeal, ApiMeals} from "../../types";
import React, {useCallback, useEffect, useState} from "react";
import axiosApi from "../../AxiosApi";
import Spinner from "../Spiner/Spinner";
import {toast} from "react-toastify";
import ButtonSpinner from "../Spiner/ButtonSpiner";

const ShowMeals:React.FC = () => {
    const location = useLocation();
    const [meals, setMeals] = useState<ApiMeal[]>([]);
    const[loading,setLoading] = useState(false);
    const [delLoading, setDelLoading] = useState<string | null>(null);

    const fetchMeal = useCallback( async ()=>{
        try {
            setLoading(true)
            const {data:meals} = await axiosApi.get<ApiMeals|null>(
              '/meals.json',
            );
            if(!meals){
                setMeals([]);
            }else {
                const newMeals = Object.keys(meals).map((id)=>({
                    ...meals[id],
                    id,
                }));
                setMeals(newMeals);
            }
        }finally {
            setLoading(false);
        }
    },[]);
    useEffect(() => {
        if(location.pathname === '/'){
            void fetchMeal();
        }
    }, [fetchMeal,location]);

    const deleteMeal = async (id: string) => {
        try {
            setDelLoading(id);
            if (window.confirm('Are you sure you want to delete this meal?')) {
                await axiosApi.delete(`/meals/${id}.json`);
                toast.success('Meal deleted!');
                await fetchMeal();
            }
        }catch (e){
            toast.error('Could not delete this meal!');
        }finally {
            setDelLoading(null);
        }
    }

    const totalKcal=meals.reduce((sum,ApiMeal)=> {
        return sum  + ApiMeal.kcal;
    },0);

    return (
        <>
            <div className="row col-12 d-flex align-items-center mb-5">
                <span className="col-6 text-start">
                    Total Calories:
                    <strong> {totalKcal} kcal</strong>
                </span>
                <div className="col-6 text-end">
                    <Link to='/new-meal' className="btn btn-primary">Add new meal</Link>
                </div>
            </div>
            {loading ? (
                <Spinner/>
            ) : (
                meals.length > 0 ? (
                meals.map((meal) => (
                    <div className="card col-12 mb-2" key={meal.id}>
                        <div className="row d-flex align-items-center">
                            <div className="col-5">
                                <h4>{meal.timeMeal}</h4>
                                <span>{meal.descriptionMeal}</span>
                            </div>
                            <div className="col-5">
                                <span>{meal.kcal} kcal</span>
                            </div>
                            <div className="col-1">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteMeal(meal.id)}
                                    disabled={delLoading === meal.id}
                                >
                                    {delLoading === meal.id && <ButtonSpinner />}
                                    Delete
                                </button>
                            </div>
                            <Link className="btn btn-primary col-1" to={`/edit-meal/${meal.id}`}>
                                Edit
                            </Link>
                        </div>
                    </div>
                ))
                ) : (
                    <h1>Страница еды пуста</h1>
                )
            )}
        </>
    );
};

export default ShowMeals;