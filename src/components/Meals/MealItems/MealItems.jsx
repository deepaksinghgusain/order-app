import { useContext } from 'react';
import cartContext from '../../../store/cart-context';
import classes from './MealItems.module.css';
import MealItemsForm from './MealItemsForm';

const MealItems = (props) => {
  const cartctx = useContext(cartContext);
  const price = `$${props.price.toFixed(2)}`;

  const onAddToCartHandler = (amount) => {
     cartctx.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price
     });
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
          <MealItemsForm onAddToCart={onAddToCartHandler} />
      </div>
    </li>
  );
};

export default MealItems;