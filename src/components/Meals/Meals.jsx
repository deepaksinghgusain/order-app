import React, { Fragment } from 'react'
import MealsAvailable from './MealsAvailable'
import MealsSummary from './MealsSummary'

export default function Meals() {
  return (
     <Fragment>
         <MealsSummary />
         <MealsAvailable />
     </Fragment>
  )
}
