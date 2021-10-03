import React from 'react'

const Person = (props) => {
    return(
      <li key={props.id}> {props.name} {props.number} 
        <button onClick={props.deletePerson}>
                delete
        </button>
      </li>
    )
}

export default Person