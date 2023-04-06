import React, { Component } from 'react';
import { connect } from "react-redux";
import { RotatingLines } from 'react-loader-spinner';
import './Loading.scss';

class DefaultClass extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {


        return (
            <div className='Loading'>
                <RotatingLines
                    strokeColor="blue"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="120"
                    visible={true}
                />
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
