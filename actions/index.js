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
export const selectClinic = (user) => {
    return {
        type: 'CLINIC_SELECTED',
        payload: user
    }
}