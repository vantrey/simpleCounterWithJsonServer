import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk";
import {counterReducer} from "./counterReduser";

const rootReducer = combineReducers({
  counter: counterReducer
})
export type AppStateType = ReturnType<typeof rootReducer>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store