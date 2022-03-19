import React, { useState } from 'react'

export default function InputMessage({ sendMessage }) {

  const [inputValue, setInputValue] = useState('')

  return (
    <div>
      <input
        placeholder="input placeholder"
        value={inputValue}
        onChange={(event) => { setInputValue(event.target.value) }}>
      </input>
      <button type='button' onClick={() => sendMessage(inputValue)}>Отправить</button>
    </div>
  )
}
