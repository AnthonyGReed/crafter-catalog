import React from 'react'

const PatternTitle = (props) => {
  return (
    <div onClick={() =>{props.visibilityHandler(props.children)}}>{props.children}</div>
  )
}

export default PatternTitle