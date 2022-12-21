import React from 'react'

const PatternTitle = (props) => {
  return (
    <div className="recipe-title" onClick={() =>{props.visibilityHandler(props.children)}}>{props.children}</div>
  )
}

export default PatternTitle