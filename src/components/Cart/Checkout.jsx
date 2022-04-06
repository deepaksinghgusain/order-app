import React, {  useRef, useState } from 'react'
import classes from './Checkout.module.css';

export default function Checkout(props) {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city:true,
        postCode: true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postCodeInputRef = useRef();
    const cityInputRef = useRef();

    const isEmpty = value => value.trim() === '';
    const isFiveChars = value => value.trim() === 5;
    

    const confirmHandler = (event) => {
        event.preventDefault();       
 
        const enterName = nameInputRef.current.value;
        const enterStreet = streetInputRef.current.value;
        const enterPostCode = postCodeInputRef.current.value;
        const enterCity = cityInputRef.current.value;


        const enteredNameIsValid = !isEmpty(enterName);
        const enteredStreetIsValid = !isEmpty(enterStreet);
        const enteredPostCodeIsValid = !isFiveChars(enterPostCode);
        const enteredCityIsValid = !isEmpty(enterCity);

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostCodeIsValid && enteredCityIsValid;

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postCode: enteredPostCodeIsValid,
            city: enteredCityIsValid
        })

        if(!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enterName,
            street: enterStreet,
            postCode: enterPostCode,
            city: enterCity
        });
    }

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
    const postCodeControlClasses = `${classes.control} ${formInputsValidity.postCode ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;

    return (
        <form className={nameControlClasses} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />

                {!formInputsValidity.name && <p>Please Enter the valid Name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!formInputsValidity.street && <p>Please Enter the valid Street Name</p>}
            </div>
            <div className={postCodeControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postCodeInputRef}/>
                {!formInputsValidity.postCode && <p>Please Enter the valid Postal Code</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please Enter the valid City Name</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
}
