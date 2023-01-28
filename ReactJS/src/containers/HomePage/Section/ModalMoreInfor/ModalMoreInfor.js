import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal } from 'reactstrap';
import './ModalMoreInfor.scss';
import { withRouter } from 'react-router';


class ModalMoreInfor extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleViewMoreInfor = (item, id) => {
        if (this.props.history) {
            //redirect
            if (id === 'Specialty') {
                this.props.history.push(`detail-specialty/${item.id}`)
            }
            if (id === 'Clinic') {
                this.props.history.push(`detail-clinic/${item.id}`)
            }
            if (id === 'Handbook') {
                this.props.history.push(`detail-handbook/${item.id}`)
            }
            if (id === 'Doctor') {
                this.props.history.push(`/detail-doctor/${item.id}`)
            }
        }
    }

    render() {
        let { isOpenModal, closeMoreInforModal, data, id } = this.props
        return (
            <div>
                <Modal isOpen={isOpenModal} className={'more-infor-modal-container'}
                    size='md'
                    centered
                >
                    <div className='more-infor-modal-content' >
                        <div className='more-infor-modal-header'>
                            <span className='right'
                                onClick={closeMoreInforModal}
                            ><i className="fas fa-times"></i></span>
                        </div>
                        <div>
                            {data && data.length > 0
                                && data.map((item, index) => {
                                    return (
                                        <div className='more-infor-content'
                                            key={index}
                                            onClick={() => this.handleViewMoreInfor(item, id)}
                                        >
                                            <div className='more-infor-img'>
                                                <div className='more-infor-imgbase64'
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                />
                                                <div className='more-infor-name'>{item.name}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                        <div className='more-infor-modal-footer'>
                            <button className='btn-more-infor-cancel'
                                onClick={closeMoreInforModal}
                            >cancel</button>
                        </div>
                    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalMoreInfor));
