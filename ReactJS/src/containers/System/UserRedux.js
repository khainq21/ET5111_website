import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className='container'>
                <div className='title'>
                    User-Redux manage
                </div>
                <div className='user-redux-body'>
                    <div>Them nguoi dung</div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
