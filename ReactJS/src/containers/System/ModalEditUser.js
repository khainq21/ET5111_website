import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _, { isEmpty } from 'lodash';
import { useReducer } from 'react';




class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }


    }


    componentDidMount() {
        let user = this.props.currentUser//{}
        // let {currentUser}=this.props;  ---lay thuoc tinh user dang object trong props
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: '••••••••',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
        console.log('ditmount:', this.props.currentUser)
    }

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


    handleSaveUser = () => {
        let valid = this.checkValideInput()
        if (valid === true) {
            // call Api edit user
            this.props.editUser(this.state);
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
                <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
                <ModalBody>
                    <form>
                        <div className='modal-user-body'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input
                                    type='text'
                                    onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                    value={this.state.email}
                                    disabled
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>Password</label>

                                <input type='current-password'
                                    onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                    value={this.state.password}
                                    disabled
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
                        onClick={() => { this.handleSaveUser() }}>
                        Save Changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
