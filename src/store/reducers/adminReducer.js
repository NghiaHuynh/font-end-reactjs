import DetailDoctor from '../../containers/Patient/Doctor/DetailDoctor';
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    allUsers: [],
    topDoctors: [],
    allDoctors: [],
    detailDoctorData: {}
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            // console.log('fetch gender start:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGender = false;
            state.genders = [];
            // console.log('fetch gender fail:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoadingGender = false;
            state.genders = action.data;
            // console.log('fetch gender success:', action.data);
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_START:
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_START:
            state.roles = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_START:
            state.allUsers = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.allUsers = action.arrUsers;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAIL:
            state.allUsers = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.arrDoctors;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            state.topDoctors = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.arrDoctors;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            state.allDoctors = [];
            return {
                ...state
            }
        case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
            state.detailDoctorData = action.detailDoctor;
            console.log('check get detail doctor success:', state.detailDoctorData);
            return {
                ...state
            }
        case actionTypes.GET_DETAIL_DOCTOR_FAIL:
            state.detailDoctorData = {};
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;