import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from '../../Patient/Doctor/DoctorExtraInfor';
import HomeFooter from '../../HomePage/HomeFooter';

class DetailDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            DetailDoctor: [],
            currentDoctorId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id)
            if (res && res.errCode === 0) {
                this.setState({
                    DetailDoctor: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }



    render() {
        let { DetailDoctor, } = this.state
        let { language } = this.props
        let nameVi = ''
        let nameEn = ''
        if (DetailDoctor && DetailDoctor.positionData) {
            nameVi = `${DetailDoctor.positionData.valueVi}, ${DetailDoctor.lastName} ${DetailDoctor.firstName} `
            nameEn = `${DetailDoctor.positionData.valueEn}, ${DetailDoctor.firstName} ${DetailDoctor.lastName}`
        }

        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${DetailDoctor && DetailDoctor.image ? DetailDoctor.image : ''})` }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {DetailDoctor.Markdown && DetailDoctor.Markdown.description
                                    && <span>
                                        {DetailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorIdFromParent={this.state.currentDoctorId} />
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfor
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>

                    </div>
                    <div className='detail-infor-doctor'>
                        {DetailDoctor.Markdown && DetailDoctor.Markdown.contentHTML
                            && <div dangerouslySetInnerHTML={{ __html: DetailDoctor.Markdown.contentHTML }} >

                            </div>
                        }
                    </div>
                    <div className='comment-docotor'>

                    </div>
                    <HomeFooter />
                </div>
            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
