import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './Handbook.scss';
import { getAllHandbook } from "../../../services/userService";
import { withRouter } from 'react-router';
import ModalMoreInfor from './ModalMoreInfor/ModalMoreInfor';
import { FormattedMessage } from 'react-intl';


class HandBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataHandbooks: [],
            isOpenModalMoreInfor: false
        }
    }

    async componentDidMount() {
        let res = await getAllHandbook()
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbooks: res.data ? res.data : []
            })
        }
    }

    handleViewDetailHandbook = (handbook) => {
        if (this.props.history) {
            //redirect
            this.props.history.push(`detail-handbook/${handbook.id}`)
        }
    }

    OpenModalMoreInfor = () => {
        this.setState({
            isOpenModalMoreInfor: true
        })
    }

    CloseModalMoreInfor = () => {
        this.setState({
            isOpenModalMoreInfor: false
        })
    }

    render() {

        let { dataHandbooks, isOpenModalMoreInfor } = this.state

        return (
            <>
                <div className='section-share section-handbook'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id='homepage.handbook' /></span>
                            <button className='btn-section'
                                onClick={() => this.OpenModalMoreInfor()}
                            ><FormattedMessage id='homepage.more-infor' /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {dataHandbooks && dataHandbooks.length > 0
                                    &&
                                    dataHandbooks.map((item, index) => {
                                        return (
                                            <div className='section-customize handbook-child'
                                                key={index}
                                                onClick={() => this.handleViewDetailHandbook(item)}
                                            >
                                                <div className='bg-image section-handbook'

                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                />
                                                <div className='handbook-name'>{item.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
                <ModalMoreInfor
                    isOpenModal={isOpenModalMoreInfor}
                    closeMoreInforModal={this.CloseModalMoreInfor}
                    id={'Handbook'}
                    data={dataHandbooks}
                />
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
