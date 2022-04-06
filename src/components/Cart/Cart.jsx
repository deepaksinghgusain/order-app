import React, { Fragment, useContext, useState } from 'react';
import cartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

export default function Cart(props) {
    const cartctx = useContext(cartContext);

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const totalAmount = `$${cartctx.totalAmount.toFixed(2)}`;
    const hasItems = cartctx.items.length > 0 ? true : false;


    const cartItemAddHandler = (item) => {
        const itm = { ...item, amount: 1 }
        cartctx.addItem(itm);
    }

    const cartItemRemoveHandler = (id) => {
        cartctx.removeItem(id);
    }

    const orderHandler = (event) => {
        event.preventDefault()
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);

        await fetch(process.env.REACT_APP_FIREBASE_API + 'order.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartctx.items
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartctx.items.map(item =>
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
        )}
    </ul>;

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
            </div>
        </Fragment>
    );

    const isSubmittingModalContent = <p>Sending order Data...</p>;

    const didSubmitModalContent = 
        <div className={classes['cart-items']}>
            <p>Successfully sent the order</p>
            <div className={classes.actions}>
                <button type='button' onClick={props.onClose}>Continue Shopping</button>
            </div>           
        </div>

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}
