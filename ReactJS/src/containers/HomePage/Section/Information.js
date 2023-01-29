import React, { Component } from 'react';
import { connect } from 'react-redux';
import home from "../../../assets/home.mp4";
import "./information.scss";




class Information extends Component {

    render() {

        return (
            <div className='container'>
                <div className='section-share section-information'>
                    <video autoPlay loop muted playsInline>
                        <source src={home} />
                    </video>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Information);
