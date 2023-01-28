import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialties } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import ModalMoreInfor from './ModalMoreInfor/ModalMoreInfor';




class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: [],
            isOpenModalMoreInfor: false,
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialties()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            //redirect
            this.props.history.push(`detail-specialty/${item.id}`)
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
        let { dataSpecialty, isOpenModalMoreInfor } = this.state
        return (
            <>
                <div className='section-share section-specialty'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id='homepage.specialty-polular' /></span>
                            <button className='btn-section'
                                onClick={() => this.OpenModalMoreInfor()}
                            ><FormattedMessage id='homepage.more-infor' /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {dataSpecialty && dataSpecialty.length > 0
                                    && dataSpecialty.map((item, index) => {
                                        return (
                                            <div className='section-customize specialty-child'
                                                key={index}
                                                onClick={() => this.handleViewDetailSpecialty(item)}
                                            >
                                                <div className='bg-image section-specialty'
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                />
                                                <div className='specialty-name'>{item.name}</div>
                                            </div>
                                        )
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
                <ModalMoreInfor
                    isOpenModal={isOpenModalMoreInfor}
                    closeMoreInforModal={this.CloseModalMoreInfor}
                    id={'Specialty'}
                    data={dataSpecialty}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
