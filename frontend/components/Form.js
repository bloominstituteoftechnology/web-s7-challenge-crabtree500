import { findAllByTestId } from '@testing-library/react'
import { getInitialValue } from '@testing-library/user-event/dist/types/document/UI'
import e from 'cors'
import React, { useEffect, useState } from 'react'
import * as yup from "yup"
import * as axios from "axios"
// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
const userSchema = yup.object({
fullName: yup.string.min(3, validationErrors.fullNameTooShort).max(20, validationErrors.fullNameTooLong),
size: string.oneOf('S', 'M', 'L', validationErrors.sizeIncorrect),
})
// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]


export default function Form() {
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: '',
    size: '',
    toppings: [],
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormValues({
      ...formValues,
      [name]: inputValue,
    });
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      toppings: checked
        ? [...prevValues.toppings, name]
        : prevValues.toppings.filter((topping) => topping !== name),
    }));
  };


  const onSubmit = (evt) => {
    evt.preventDefault();
    userSchema
      .validate(formValues)
      .then(() => {
        axios.post("http://localhost:9009/api/order", formValues)
          .then(() => setSuccessMessage(true))
          .catch(error => setErrorMessage(error.message));
      })
      .catch(error => {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setErrorMessage(errors);
      });
  };

  return (
    <form onSubmit={onSubmit} disabled={successMessage || errorMessage}>
      <h2>Order Your Pizza</h2>
{successMessage && <div className='success'>Thank you for your order!</div>}
{errorMessage && <div className='failure'>Something went wrong: {errorMessage}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" type="text" value={formValues.fullName} onChange={handleChange} />
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" value={formValues.size} onChange={handleChange}>
            <option value="">----Choose Size----</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            {/* Fill out the missing options */}
          </select>
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
  {toppings.map(({ topping_id, text }) => (
    <label key={topping_id}>
      <input
        name={text}
        type="checkbox"
        onChange={handleCheckboxChange}
        checked={formValues.toppings.includes(text)}
      />
      {text}<br />
    </label>
  ))}
</div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit"  />
    </form>
  )
}
