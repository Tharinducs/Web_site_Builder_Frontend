import { combineReducers } from 'redux';
import login from "./login"
import website from "./website"
const reducers = combineReducers({
    login,
    website,
});

export default reducers;