import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import './RemedyModal.scss';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import { CommonUtils } from "../../../utils";

class RemedyModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imgBase64: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                //email = email to ManagePatient
                email: this.props.dataModal.email,
            })
        }
    }

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        //send data to ManagePatient
        this.props.sendRemedy(this.state)
    }

    render() {

        let { isOpenModal, closeRemedyModal, dataModal } = this.props

        return (
            <div>
                <Modal isOpen={isOpenModal} className={'booking-modal-container'}
                    size='md'
                    centered
                >
                    <div className="modal-header"><h5 className="modal-title">Xác nhận và gửi hóa đơn khám bệnh</h5>
                        <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                            <span aria-hidden="true">×</span></button></div>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Email bệnh nhân</label>
                                <input className='form-control' type='email' value={this.state.email}
                                    onChange={(e) => this.handleOnChangeEmail(e)}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Chọn đơn thuốc</label>
                                <input className='form-control-file'
                                    onChange={(e) => this.handleOnChangeImage(e)}
                                    type='file'></input>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleSendRemedy()}>Gửi</Button>{' '}
                        <Button color="secondary" onClick={closeRemedyModal}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
