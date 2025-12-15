
import { useState } from 'react';

export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  const handleSubmit = async (onSubmit) => {
    setIsSubmitting(true);
    let validationErrors = {};
    
    if (validate) {
      validationErrors = validate(values);
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        await onSubmit(values);
        // Optional: resetForm(); // Don't auto-reset, let component decide
      } catch (error) {
        console.error("Form submission error", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors
  };
};
