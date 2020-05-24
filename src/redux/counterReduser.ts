import {AppStateType, InferActionTypes} from "./store";
import {api} from "../DAL/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

const initialState = {
  value: 0,
  isError: false,
  isFetching: false,
  isInitialised: false,
}

export const counterReducer = (state: typeof initialState = initialState, action: ActionsType) => {
  switch (action.type) {
    case "COUNTER_REDUCER/GET_VALUE_SUCCESS":
      return {...state, value: action.value, isInitialised: true}
    case 'COUNTER_REDUCER/SET_VALUE_SUCCESS':
      return {...state, value: action.value}
    case "COUNTER_REDUCER/SET_ERROR":
      return {...state, isError: true}
    case "COUNTER_REDUCER/SET_IS_FETCHING":
      return {...state, isFetching: action.isFetching}
    default:
      return state
  }
}

export const actions = {
  setValueSuccess: (value: number) => ({type: 'COUNTER_REDUCER/SET_VALUE_SUCCESS', value} as const),
  getValueSuccess: (value: number) => ({type: 'COUNTER_REDUCER/GET_VALUE_SUCCESS', value} as const),
  setError: () => ({type: 'COUNTER_REDUCER/SET_ERROR'} as const),
  setIsFetching: (isFetching: boolean) => ({type: 'COUNTER_REDUCER/SET_IS_FETCHING', isFetching} as const),
}
type ActionsType = InferActionTypes<typeof actions>

// thunks
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
type DispatchType = ThunkDispatch<AppStateType, unknown, ActionsType>

export const setValue = (): ThunkType => async (dispatch: DispatchType, getState: () => AppStateType) => {
  dispatch(actions.setIsFetching(true))
  try {
    const result = await api.setCounterValue(getState().counter.value + 1)
    dispatch(actions.setValueSuccess(result))
    dispatch(actions.setIsFetching(false))
  } catch (e) {
    console.error('error: ' + {...e})
    dispatch(actions.setError())
  }
}
export const getValue = (): ThunkType => async (dispatch: DispatchType) => {
  try {
    const result = await api.getCounterValue()
    dispatch(actions.getValueSuccess(result))
  } catch (e) {
    console.error({...e})
    dispatch(actions.setError())
  }
}