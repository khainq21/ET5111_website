import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Loading from '../../../components/Loading';


class RejectModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reason: '',
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeReason = (e) => {
        this.setState({
            reason: e.target.value
        })
    }

    handleSendRejection = () => {
        //send data to ManagePatient
        this.props.sendRejection(this.state)
        this.setState({
            reason: ''
        })
    }

    render() {

        let { isOpenModal, closeRejectModal, isLoading } = this.props

        return (
            <div>
                <Modal isOpen={isOpenModal} className={'booking-modal-container'}
                    size='md'
                    centered
                >
                    <div className="modal-header"><h5 className="modal-title">Xác nhận hủy lịch khám</h5>
                        <button type="button" className="close" aria-label="Close" onClick={closeRejectModal}>
                            <span aria-hidden="true">×</span></button></div>
                    <ModalBody>
                        {isLoading === false ?
                            <div className='row'>
                                <div className='col-12 form-group'>
                                    <label>Lý do từ chối lịch khám</label>
                                    <input className='form-control' type='text' value={this.state.reason}
                                        onChange={(e) => this.handleOnChangeReason(e)}
                                    ></input>
                                </div>
                            </div>
                            :
                            <Loading />
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleSendRejection()}>Gửi</Button>{' '}
                        <Button color="secondary" onClick={closeRejectModal}>Hủy</Button>
                    </ModalFooter>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RejectModal);
