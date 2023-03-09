import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";


const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    // authenticatedSelector check state isLogin
    //if return true ---> render component
    authenticatedSelector: state => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    //if return false ---> redirect to redirectPath
    redirectPath: '/login'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.user.isLoggedIn,
    //authenticatedSelector retrun true ---> redner lại login
    wrapperDisplayName: 'UserIsNotAuthenticated',
    //authenticatedSelector retrun falsle ---> redirect to home : check islogin = true ---> redirect to manage-user
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false
});


//https://www.tabnine.com/code/javascript/functions/redux-auth-wrapper/connectedRouterRedirect