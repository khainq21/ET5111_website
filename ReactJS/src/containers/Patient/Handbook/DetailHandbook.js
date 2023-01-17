import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { getAllDetailHandbookById } from '../../../services/userService';
import _ from 'lodash';
import HomeHeader from '../../HomePage/HomeHeader';
import "./DetailHandbook.scss";

class DetailHandbook extends Component {

    constructor(props) {
        super(props)
        this.state = {
            DetailHandbook: [],
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getAllDetailHandbookById({
                id: id
            })
            if (res && res.errCode === 0) {
                this.setState({
                    DetailHandbook: res.data,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        let { DetailHandbook } = this.state
        return (
            <div className='detail-handbook-container'>
                <HomeHeader />
                <div className='detail-handbook-body'>
                    <div className='handbook-content'>
                        {DetailHandbook && !_.isEmpty(DetailHandbook)
                            &&
                            <>
                                <div>{DetailHandbook.name}</div>
                                <div dangerouslySetInnerHTML={{ __html: DetailHandbook.descriptionHTML }} >
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
