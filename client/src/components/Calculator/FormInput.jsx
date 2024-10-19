import React from 'react'


function FormInput({text,icon,placeholder,value,onInput,onKeyUp,readOnly=false}) {
  return (
    <div className='input-group '>
        <span style={{color:"white"}} className='input-group text'>{text}{icon}</span>
        <input className='form-control' type="number" placeholder={placeholder} value={value}
        onInput={onInput}
        onKeyUp={onKeyUp}
        readOnly={readOnly}
        />
        
      
    </div>
  )
}
export default FormInput
