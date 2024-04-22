import React, { useEffect, useState } from "react";

import {
  inputClass,
  textareaClass,
  dateInputClass,
  formContainerClass,
  formSectionClass,
  buttonClass,
  navigationContainerClass,
  inputErrClass,
  textareaErrClass,
  dateInputErrClass,
} from "./FormField.style";

export const TextAreaField = ({ name, placeholder, globalValue, setGlobalFormData, className=textareaClass }) => {
  const [localValue, setLocalValue] = useState(globalValue)

  const handleChange = e => {
    setLocalValue(e.target.value)
  }

  const handleBlur = () => {
    setGlobalFormData(prevFormData => ({
      ...prevFormData,
      [name]: localValue
    }))
  }

  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
      className={className}
    />
  )
}

export const InputField = ({ name, placeholder, globalValue, setGlobalFormData, className=inputClass, type="text" }) => {
    const [localValue, setLocalValue] = useState(globalValue)
  
    const handleChange = e => {
      setLocalValue(e.target.value)
    }
  
    const handleBlur = () => {
        setGlobalFormData(prevFormData => ({
        ...prevFormData,
        [name]: localValue
      }))
    }
  
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={className}
      />
    )
  }
