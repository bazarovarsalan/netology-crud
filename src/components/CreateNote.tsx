import React from 'react'

const CreateNote = ({value, onChange, createNote}) => {

   
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>): void => {
        onChange(event.target.value);
    }


  return (
    <div className="note-form">
          <p>New Note</p>
          <div className='inputWrapper'>
            <input className="note-textarea"
            name='input'
            type='text'
            value={value}
            onChange={handleChange} 
            />
            <a className="note-send" href="#/" >
                <span className="material-icons" onClick={createNote}>send</span>
            </a>
          </div>
    </div>
  )
}

export default CreateNote
