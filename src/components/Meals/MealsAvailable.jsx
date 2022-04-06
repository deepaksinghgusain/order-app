import React, { useEffect, useState } from 'react'
import Card from '../UI/Card';
import MealItems from './MealItems/MealItems';
import classes from './MealsAvailable.module.css'

export default function MealsAvailable() {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const fetchMeals = async () => {
    const response = await fetch(process.env.REACT_APP_FIREBASE_API + 'meals.json');

    if(!response.ok){
      throw new Error('Something went wrong');
    }

    const responseData = await response.json();

    const loadedMeals = [];

    for (let key in responseData) {
      loadedMeals.push({
        id: key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price
      })
    }

    setMeals(loadedMeals);
    setIsLoading(false);
  }

  useEffect(() => {

    fetchMeals().catch(error => {
      
      setIsLoading(false);
      setError(error.message)
    });
    
  }, []);

  if (isLoading) {
    return <section className={classes.isLoading}>
      <p>...Loading</p>
    </section>
  }

  if(error){
    return <section className={classes.error}>
      <p>{error}</p>
    </section>
  }


  const mealsList = meals.map((meal) => (
    <MealItems
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  )
}
