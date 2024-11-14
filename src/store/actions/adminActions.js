import actionTypes from './actionTypes';
import userService from '../../services/userService';
import { toast } from 'react-toastify';

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
    type: actionTypes.FETCH_GENDER_FAIL
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
    type: actionTypes.FETCH_POSITION_FAIL
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const createNewUserStart = (data) => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.CREATE_USER_START});
            let res = await userService.createNewUserApi(data);
            console.log('check create user start:', res);
            
            if(res && res.data.errCode === 0){
                toast.success('Create new user succeed!');
                dispatch({
                    type: actionTypes.CREATE_USER_SUCCESS,
                })
                dispatch(fetchAllUsersStart());
            }else{
                toast.error(res.data.message);
                dispatch({
                    type: actionTypes.CREATE_USER_FAIL,
                })
            }
        }catch(error){
            toast.error('Create new user failed!');
            dispatch({
                type: actionTypes.CREATE_USER_FAIL,
            })
        }
    }
}

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.FETCH_ALL_USER_START});
            let res = await userService.getAllUsersApi('ALL');
            let data = await userService.getTopDoctorHomeApi(6);
            console.log('check get all user start:', data);
            if(res && res.data.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_USER_SUCCESS,
                    arrUsers: res.data.users.reverse()//lay nguoc lai moi them vao thi vao dau danh sach
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALL_USER_FAIL,
                })
            }
        }catch(error){
            dispatch({
                type: actionTypes.FETCH_ALL_USER_FAIL,
            })
        }
    }
}

export const editUserStart = (data) => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.EDIT_USER_START});
            let res = await userService.editUserApi(data);
            console.log('check edit user start:', res);
            if(res && res.data.errCode === 0){
                toast.success('Edit user succeed!');
                dispatch({
                    type: actionTypes.EDIT_USER_SUCCESS,
                })
                dispatch(fetchAllUsersStart());
            }else{
                toast.error('Edit user failed!');
                dispatch({
                    type: actionTypes.EDIT_USER_FAIL,
                })
            }
        }catch(error){
            toast.error('Edit user failed!');
            dispatch({
                type: actionTypes.EDIT_USER_FAIL,
            })
        }
    }    
}

export const deleteUserStart = (inputId) => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.DELETE_USER_START});
            let res = await userService.deleteUserApi(inputId);
            
            if(res && res.data.errCode === 0){
                toast.success('Delete user succeed!');
                dispatch({
                    type: actionTypes.DELETE_USER_SUCCESS,
                })
                dispatch(fetchAllUsersStart());
            }else{
                toast.error('Delete user failed!');
                dispatch({
                    type: actionTypes.DELETE_USER_FAIL,
                })
            }
        }catch(error){
            toast.error('Delete user failed!');
            dispatch({
                type: actionTypes.DELETE_USER_FAIL,
            })
        }
    }    
}


export const fetchTopDoctorHomeStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.FETCH_TOP_DOCTOR_START});
            let res = await userService.getTopDoctorHomeApi(6);
            // console.log('check get top doctor start:', res);
            if(res && res.data.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    arrDoctors: res.data.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
                })
            }
        }catch(error){
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
            })
        }
    }    
}

export const fetchAllDoctorsStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.FETCH_ALL_DOCTOR_START});
            let res = await userService.getAllDoctorsApi();
            // console.log('check get all doctor start:', res);
            if(res && res.data.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    arrDoctors: res.data.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
                })
            }
        }catch(error){
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
            })
        }
    }    
}

export const saveDetailDoctorStart = (data) => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.SAVE_DETAIL_DOCTOR_START});
            let res = await userService.saveDetailDoctorApi(data);
            // console.log('check save detail doctor start:', res);
            if(res && res.data.errCode === 0){
                toast.success('Save detail doctor succeed!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            }else{
                toast.error('Save detail doctor failed!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
                })
            }
        }catch(error){
            toast.error('Save detail doctor failed!');
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
            })
        }
    }    
}   

export const fetchDetailDoctorStart = (inputId) => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.GET_DETAIL_DOCTOR_START});
            let res = await userService.getDetailDoctorApi(inputId);
            // console.log('check get detail doctor start:', res);
            if(res && res.data.errCode === 0){
                dispatch({
                    type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
                    detailDoctor: res.data.data
                })
            }else{
                dispatch({
                    type: actionTypes.GET_DETAIL_DOCTOR_FAIL,
                })
            }
        }catch(error){
            dispatch({
                type: actionTypes.GET_DETAIL_DOCTOR_FAIL,
            })            
        }
    }    
}