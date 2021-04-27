export const selectTheme = (theme) => {
    return {
        type: 'THEME_SELECTED',
        payload: theme
    }
}
export const selectUser = (user) => {
    return {
        type: 'USER_SELECTED',
        payload: user
    }
}
export const selectClinic = (clinic) => {
    return {
        type: 'CLINIC_SELECTED',
        payload: clinic
    }
}
export const selectMedical = (medical) => {
    return {
        type: 'MEDICAL_SELECTED',
        payload: medical
    }
}