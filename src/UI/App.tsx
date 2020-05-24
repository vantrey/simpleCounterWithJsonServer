import React, {useEffect} from 'react';
import './App.css';
import Counter from "../UI/Counter";
import {connect} from "react-redux";
import {getValue, setValue} from "../redux/counterReduser";
import {AppStateType} from "../redux/store";

type mapStatePropsType = {
  value: number
  isFetching: boolean
  isError: boolean
  isInitialised: boolean
}

type mapDispatchPropsType = {
  getValue: () => void
  setValue: () => void
}

type PropsType = mapStatePropsType & mapDispatchPropsType
const App: React.FC<PropsType> = (props) => {
  useEffect(() => {
    props.getValue()
  }, [])
  return (
    <div className='counter'>
      {
        !props.isInitialised
          ? <></>
          : props.isError
          ? <div>Server error</div>
          : <Counter {...props}/>
      }
    </div>
  )
}
const mapStateToProps = (state: AppStateType) => ({
  value: state.counter.value,
  isFetching: state.counter.isFetching,
  isError: state.counter.isError,
  isInitialised: state.counter.isInitialised
})
export default connect<mapStatePropsType, mapDispatchPropsType, {}, AppStateType>
(mapStateToProps, {getValue, setValue})(App);
