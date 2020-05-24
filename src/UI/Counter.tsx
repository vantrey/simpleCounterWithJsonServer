import React from "react";

type OwnPropsType = {
  value: number
  isFetching: boolean
  setValue: () => void
}

type PropsType = OwnPropsType

const Counter: React.FC<PropsType> = (props) => {
  return (
    <div>
      <h1>Counter</h1>
      <h2>value: <span>{props.value}</span></h2>
      <button disabled={props.isFetching} onClick={props.setValue}>increment Counter</button>
    </div>
  )
}

export default Counter