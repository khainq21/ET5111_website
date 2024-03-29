import actionTypes from '../actions/actionTypes';


const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    position: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRiquiredDoctorInfor: [],
    allSpecialty: [],
    allClinic: [],
    allHandbook: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state }
            copyState.isLoadingGender = true
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false
            state.genders = []
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.position = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.position = []
            return {
                ...state
            }


        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users//users ben adminAction
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = []
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = []
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = []
            return {
                ...state
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = []
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRiquiredDoctorInfor = action.allRequiredData
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRiquiredDoctorInfor = []
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            state.allSpecialty = action.dataSpecialty
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
            state.allSpecialty = []
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            state.allClinic = action.dataClinic
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CLINIC_FAILED:
            state.allClinic = []
            return {
                ...state
            }
        default:
            return state;

        case actionTypes.FETCH_ALL_HANDBOOK_SUCCESS:
            state.allHandbook = action.dataHandbook
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_HANDBOOK_FAILED:
            state.allHandbook = []
            return {
                ...state
            }
    }
}

export default adminReducer;

//nơi thực hiện các chức năng và lấy data từ các action lưu vào bộ nhớ của reddux
// các file còn lại tương tự nhưng phân rõ các action.