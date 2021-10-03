import React from 'react'

const PersonForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input placeholder="Type name..." value={props.namevalue} onChange={props.namechange}/>
        </div>
        <div>
          number: <input placeholder="Type number..." value={props.numbervalue} onChange={props.numberchange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

export default PersonForm