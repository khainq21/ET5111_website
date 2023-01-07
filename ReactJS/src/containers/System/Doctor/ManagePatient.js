import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy, postSendReject } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import RejectModal from './RejectModal';


class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            isOpenRejectModal: false,
            dataModal: {},
        }
    }

    async componentDidMount() {
        this.getDataPatient()

    }

    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        // convert date to type in db unix
        let FormattedDate = new Date(currentDate).getTime();

        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: FormattedDate,
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    handleBtnReject = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType
        }
        this.setState({
            isOpenRejectModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false
        })
    }

    closeRejectModal = () => {
        this.setState({
            isOpenRejectModal: false
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
        })
        if (res && res.errCode === 0) {
            toast.success("Xác nhận lịch khám thành công!")
            this.closeRemedyModal()
            await this.getDataPatient()
        } else {
            toast.error('Something Error!')
        }
    }

    sendRejection = async (dataChild) => {
        let { dataModal } = this.state
        let res = await postSendReject({
            email: dataModal.email,
            reason: dataChild.reason,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
        })
        if (res && res.errCode === 0) {
            toast.success("Xác nhận hủy lịch khám thành công!")
            this.closeRejectModal()
            await this.getDataPatient()
        } else {
            toast.error('Something Error!')
        }
    }

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal, isOpenRejectModal } = this.state
        let { language } = this.props
        return (
            <>
                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        Quản lý bệnh nhân khám bệnh
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label>Chọn ngày khám</label>
                            <DatePicker
                                className=" form-control"
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>Họ và tên</th>
                                        <th>Địa chi</th>
                                        <th>Giới tính</th>
                                        <th>Actions</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0
                                        ?
                                        dataPatient.map((item, index) => {
                                            let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                                            let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{gender}</td>
                                                    <td>
                                                        <button className='btn-confirm'
                                                            onClick={() => this.handleBtnConfirm(item)}
                                                        >Xác nhận</button>
                                                        <button className='btn-reject'
                                                            onClick={() => this.handleBtnReject(item)}
                                                        >Từ chối</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td> Bác sĩ không có lịch hẹn trong ngày</td>
                                            <td>Null</td>
                                            <td>Null</td>
                                            <td>Null</td>
                                            <td>Null</td>
                                            <td>Null</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div >
                <RemedyModal
                    isOpenModal={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy={this.sendRemedy}
                />
                <RejectModal
                    isOpenModal={isOpenRejectModal}
                    closeRejectModal={this.closeRejectModal}
                    sendRejection={this.sendRejection}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
