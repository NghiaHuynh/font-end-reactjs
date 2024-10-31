import actionTypes from './actionTypes';
import userService from '../../services/userService';

export const adminLoginSuccess = (adminInfo) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    adminInfo: adminInfo
})

export const adminLoginFail = () => ({
    type: actionTypes.ADMIN_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})


// bao gom 3 buoc thuc hien
export const fetchGenderStart = () => {
    
    return async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.FETCH_GENDER_START});
            let res = await userService.getAllCodeApi('gender');
            // console.log('fetch gender start:', res);
            if(res && res.data.errCode === 0){
                dispatch(fetchGenderSuccess(res.data.data));
            }else{
                dispatch(fetchGenderFailed());
            }
        }catch(error){
            dispatch(fetchGenderFailed());
        }
    }
}

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.FETCH_POSITION_START});
            let res = await userService.getAllCodeApi('position');
            if(res && res.data.errCode === 0){
                dispatch(fetchPositionSuccess(res.data.data));
            }else{
                dispatch(fetchPositionFailed());
            }
        }catch(error){
            dispatch(fetchPositionFailed());
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.FETCH_ROLE_START});
            let res = await userService.getAllCodeApi('role');
            if(res && res.data.errCode === 0){
                dispatch(fetchRoleSuccess(res.data.data));
            }else{
                dispatch(fetchRoleFailed());
            }
        }catch(error){
            dispatch(fetchRoleFailed());
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
