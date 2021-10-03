import React from 'react'

const Filter = (props) => {
    return (
        <div>
          filter shown with <input placeholder="insert filter word..." value={props.value} onChange={props.onChange}/>
        </div>
    )
  }

export default Filter