import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailclinicById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import HomeFooter from '../../HomePage/HomeFooter';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import GoogleMapReact from 'google-map-react';

//chứa giao diện thông tin chi tiết phòng khám hiển thị phía bệnh nhân
//tương tự các folder doctor, handbook, specialty, chứa giao diện của từng đối tượng phía bệnh nhân sử dụng
const Position = () => <div className='highlight'> <i className="fas fa-hospital"></i></div>

class DetailClinic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            backgroundImage: '',
            position: {
                lat: null,
                lng: null,
            }
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            let res = await getAllDetailclinicById({
                id: id
            })

            if (res && res.errCode === 0) {
                let data = res.data
                let backgroundImg = Buffer.from(res.data.image, 'base64').toString('binary')
                // lay doctorId tu api va set state arrDoctorId
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.getDetailLocation(res.data.address)
                // this.getDetailLocation('số 1 Đại Cồ Việt')
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                    backgroundImage: backgroundImg,

                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.position !== prevProps.position) {
            this.getDetailLocation(this.state.dataDetailClinic.address)
        }
    }

    getDetailLocation = async (address) => {
        try {
            let results = await geocodeByAddress(address)
            let position = await getLatLng(results[0])
            console.log('noi khai yeu em', position)
            this.setState({
                position: position
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let { arrDoctorId, dataDetailClinic, backgroundImage, position } = this.state
        let { language } = this.props
        // console.log('check', position)
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className='description-specialty' style={{ backgroundImage: `url(${backgroundImage})` }}>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                            &&
                            <>
                                <div className='name'>{dataDetailClinic.name}</div>
                                <div className='description' dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }} >
                                </div>
                            </>
                        }
                    </div >
                    <div className='dataMap'>
                        <div className='img-contact'>
                        </div>
                        <div className='map'>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyC9p0UHgpZ2lYW1vBn_pE8b03WtGceKV_A' }}
                                defaultCenter={position}
                                defaultZoom={16}
                                center={position}
                            >
                                <Position className='highlight'
                                    lat={position.lat}
                                    lng={position.lng}
                                >

                                </Position>
                            </GoogleMapReact>
                        </div>
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            // dataTime={}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>

                                </div>
                            )
                        })}
                </div>
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
