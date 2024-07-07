import {Link, useLocation} from "react-router-dom";
import {ApiMeal, ApiMeals} from "../../types";
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import axiosApi from "../../AxiosApi";
import Spinner from "../Spiner/Spinner";

const ShowMeals:React.FC = () => {
    const location = useLocation();
    const [meals, setMeals] = useState<ApiMeal[]>([]);
    const[loading,setLoading] = useState(false);

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
    return (
        <>
            <div className="row col-12 d-flex align-items-center mb-5">
                <span className="col-6 text-start">
                    Total Calories:
                    <strong> {}kcal</strong>
                </span>
                <div className="col-6 text-end">
                    <Link to='/new-meal' className="btn btn-primary">Add new meal</Link>
                </div>
            </div>
            {loading ? (
                <Spinner/>
            ) : (
                meals.map((meal) => (
                    <div className="card col-12" key={meal.id}>
                        <div className="row d-flex align-items-center">
                            <div className="col-5">
                                <h4>{meal.timeMeal}</h4>
                                <span>{meal.descriptionDishes}</span>
                            </div>
                            <div className="col-5">
                                <span>{meal.kcal} kcal</span>
                            </div>
                            <div className="col-1">

                            </div>
                            <div className="col-1">

                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default ShowMeals;