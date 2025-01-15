import { combineReducers } from "redux";
import propertiesReducer from "./properties"
import memeDatasReducer from "./memeDatas"

export default combineReducers({
    properties: propertiesReducer,
    memeDatas: memeDatasReducer,
})