const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    APP_LANGUAGE_CHANGE: 'APP_LANGUAGE_CHANGE',

    //admin
    ADMIN_LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
    ADMIN_LOGIN_FAIL: 'ADMIN_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //admin.gender
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIL: 'FETCH_GENDER_FAIL',

    //admin.position
    FETCH_POSITION_START: 'FETCH_POSITION_START',
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAIL: 'FETCH_POSITION_FAIL',

    //admin.role
    FETCH_ROLE_START:"FETCH_ROLE_START",
    FETCH_ROLE_SUCCESS:"FETCH_ROLE_SUCCESS",
    FETCH_ROLE_FAIL:"FETCH_ROLE_FAIL",

    //admin.save.user
    CREATE_USER_START: 'CREATE_USER_START',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAIL: 'CREATE_USER_FAIL',


    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',


})

export default actionTypes;