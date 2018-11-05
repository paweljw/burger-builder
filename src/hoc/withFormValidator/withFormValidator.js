import React from 'react'

const checkValidity = (incomingForm, key, value) => {
  const form = { ...incomingForm }
  const input = { ...form[key] }

  if (input.validation.required && value.trim() === '') {
    return false
  }

  if (input.validation.zipCode && !value.match(/^\d{5}$/)) {
    return false
  }

  if (input.validation.email && !value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
    return false
  }

  return true
}

const validateForm = (incomingForm) => {
  let valid = true
  const form = { ...incomingForm }

  Object.keys(form).forEach(key => {
    const input = { ...form[key] }
    const value = input.value
    const validity = checkValidity(form, key, value)
    if (!validity) {
      valid = false
    }
    input.valid = validity
    form[key] = input
  })

  return [valid, form]
}

const withFormValidator = (WrappedComponent) => {
  return (props) => <WrappedComponent
    checkValidity={checkValidity}
    validateForm={validateForm}
    {...props}
  />
}

export default withFormValidator