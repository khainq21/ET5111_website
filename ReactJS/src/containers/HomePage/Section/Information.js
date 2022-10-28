import React, { Component } from 'react';
import { connect } from 'react-redux';




class Information extends Component {

    render() {

        return (
            <div className='section-share section-information'>
                chung ta cua hien tai Waiting for you
                <div>
                    <iframe width="400" height="250" src="https://www.youtube.com/embed/CHw1b_1LVBA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
