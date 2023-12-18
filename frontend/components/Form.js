import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { isFocusable } from '@testing-library/user-event/dist/types/utils';

const validationErrors = {
  fullNameTooShort: 'Full name must be at least 3 characters',
  fullNameTooLong: 'Full name must be at most 20 characters',
  sizeIncorrect: 'Size must be S or M or L',
};

const UserSchema = yup.object().shape({
  fullName: yup.string().typeError(validationErrors.fullNameType).trim()
    .required(validationErrors.fullNameRequired).min(3, validationErrors.fullNameMin).max(20, validationErrors.fullNameMax),
  size: yup.string().oneOf(['S', 'M', 'L'], validationErrors.sizeOptions).required(validationErrors.sizeRequired).trim(),
  toppings: yup.array().typeError(validationErrors.toppingsType)
    .of(
      yup.number().typeError(validationErrors.toppingsType)
        .integer(validationErrors.toppingsType)
        .min(1, validationErrors.toppingInvalid)
        .max(5, validationErrors.toppingInvalid)
    )
})

const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
];

const getInitialValues = () => ({
  fullName: '',
  size: 'S',
  toppings: [],
});


export default function Form() {
  const [successMessage, setSuccessMessage] = useState(false);
  const [IsValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [formValues, setFormValues] = useState(getInitialValues())

  const handleChange = (e) => {
    const { name, value } = e.target;

setFormValues({
      ...formValues,
      [name]: value,
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

  const onSubmit = async (evt) => {
    try {
      evt.preventDefault();

      await UserSchema.validate(formValues);

      await axios.post('http://localhost:9009/api/order', formValues);

      setSuccessMessage(true);
      setFormValues(getInitialValues());
      setIsValid(true);

    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else if (error.inner) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setErrorMessage(errors);
      } else {
        setErrorMessage({ general: error.message });
        setIsValid(false)
      }
    }
  };

  return (
    <form onSubmit={onSubmit} >
      <h2>Order Your Pizza</h2>
      {successMessage && <div className="success">Thank you for your order!</div>}
      {errorMessage.general && <div className="failure">{errorMessage.general}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            placeholder="Type full name"
            id="fullName"
            name="fullName"
            type="text"
            value={formValues.fullName}
            onChange={handleChange}
          />
        </div>
        {errorMessage.fullName && <div className="error">{errorMessage.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select id="size" name="size" value={formValues.size} onChange={handleChange}>
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        {errorMessage.size && <div className="error">{errorMessage.size}</div>}
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
            {text}
            <br />
          </label>
        ))}
      </div>

      <button type="submit" disabled={!IsFormValid} >
        Submit
      </button>
    </form>
  );
}
