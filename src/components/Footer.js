import React from "react"

const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>The phonebook app, by Javier Ramos (<a href="mailto:jiramos87@gmail.com">jiramos87@gmail.com</a>), as an assignment for the Fullstack open course by the Department of Computer Science, University of Helsinki 2021</em>
      </div>
    )
}

export default Footer
