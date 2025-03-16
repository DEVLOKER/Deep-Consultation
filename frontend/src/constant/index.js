export const constants = {
    CONSULTATION_PROGRESSING : 0,
    CONSULTATION_PROCESSED : 1,
    CLIENT_SIDE: "CLIENT",
    ADMIN_SIDE: "ADMIN",
    USER_ADMIN: "USER_ADMIN",
    USER_CLIENT: "USER_CLIENT",
    FORM_ADD: "FORM_ADD",
    FORM_EDIT: "FORM_EDIT",
    // SERVER_URL: 'http://localhost:4000',
    SERVER_URL: 'https://deep-consultation.onrender.com',
    REFRESH_INTERVAL: 2000, // 2s
}

export const actionType = {
    REQUEST: "REQUEST",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE"
}

export const loadingState = {
    EMPTY: "EMPTY",
    LOADING: "LOADING",
    ERROR: "ERROR",
    SUCCESS: "SUCCESS"
}

export const screen = { xs: 12, sm: 12, md: 6, lg: 6, xl: 6, xxl: 6 }


export const alertStatus = {
    [loadingState.SUCCESS]: "success",
    [loadingState.ERROR]: "danger",
    [loadingState.LOADING]: "info",
    [loadingState.EMPTY]: "warning",
}
