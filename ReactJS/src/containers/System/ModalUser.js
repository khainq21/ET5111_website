import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';


class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // isShowpassword: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }

        this.listenToEmitter(); // goi ham dat lai
    }


    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => { //emitter.on('name') ddat lai state
            // reset state
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }


    componentDidMount() {
    }


    // handleShowHidePassword = () => {
    //     this.setState({
    //         isShowpassword: !this.state.isShowpassword
    //     })
    // }

    toggle = () => {
        this.props.toggle()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValideInput = () => {
        let valid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                valid = false
                alert('Missing parameter: ' + arrInput[i])
                break
            }
        }
        return valid
    }


    handleAddNewUser = () => {
        let valid = this.checkValideInput()
        if (valid === true) {
            // call Api
            this.props.createNewUser(this.state);
        }

    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}      //----lay gai tri this,props.name gtri
                toggle={() => { this.toggle() }}//----lay gia tri ham this.props.funtion
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new User</ModalHeader>
                <ModalBody>
                    <form>
                        <div className='modal-user-body'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input
                                    type='text'
                                    onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                    value={this.state.email}
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input
                                    type='current-password'
                                    onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                    value={this.state.password}
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>FirstName</label>
                                <input type='text'
                                    onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                    value={this.state.firstName}>

                                </input>
                            </div>
                            <div className='input-container'>
                                <label>LastName</label>
                                <input type='text'
                                    onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                    value={this.state.lastName}></input>
                            </div>
                            <div className='input-container max-width-input'>
                                <label>Address</label>
                                <input type='text'
                                    onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                    value={this.state.address}></input>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3'
                        onClick={() => { this.handleAddNewUser() }}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" className='px-3'
                        onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
