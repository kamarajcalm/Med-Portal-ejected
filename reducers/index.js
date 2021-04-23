import { combineReducers } from 'redux';
import { selectTheme } from '../actions';


const selectedThemeReducer = (selectedTheme = null, action) => {
    if (action.type === "THEME_SELECTED") {
        return action.payload;
    }
    return selectedTheme
}
const selectedUserReducer = (selectedUser = null, action) => {
    if (action.type === "USER_SELECTED") {
        return action.payload;
    }
    return selectedUser
}
const selectedClinicReducer = (selectedClinic= null, action) => {
    if (action.type === "CLINIC_SELECTED") {
        return action.payload;
    }
    return selectedClinic
}
export default combineReducers({
    selectedTheme: selectedThemeReducer,
    selectedUser: selectedUserReducer,
    selectedClinic:selectedClinicReducer
})