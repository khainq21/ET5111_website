import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from 'react-router';
import ModalMoreInfor from './ModalMoreInfor/ModalMoreInfor';
import { FormattedMessage } from 'react-intl';



class MedicalFacility extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataClinics: [],
            isOpenModalMoreInfor: false
        }
    }

    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            //redirect
            this.props.history.push(`detail-clinic/${clinic.id}`)
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

        let { dataClinics, isOpenModalMoreInfor } = this.state

        return (
            <>
                <div className='section-share section-medical-facility'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id='homepage.outstanding-clinic' /></span>
                            <button className='btn-section'
                                onClick={() => this.OpenModalMoreInfor()}
                            ><FormattedMessage id='homepage.more-infor' /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {dataClinics && dataClinics.length > 0
                                    &&
                                    dataClinics.map((item, index) => {
                                        return (
                                            <div className='section-customize clinic-child'
                                                key={index}
                                                onClick={() => this.handleViewDetailClinic(item)}
                                            >
                                                <div className='bg-image section-medical-facility'

                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                />
                                                <div className='clinic-name'>{item.name}</div>
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
                    id={'Clinic'}
                    data={dataClinics}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
