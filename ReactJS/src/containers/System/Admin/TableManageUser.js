import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import *as actions from '../../../store/actions';
import { connect } from 'react-redux';
import './TableManageUser.scss';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);



class TableManageUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers,
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }

    render() {

        let arrUsers = this.state.usersRedux
        return (
            <React.Fragment>
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => { this.handleEditUser(item) }}
                                        ><i className="far fa-edit"></i></button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteUser(item)}
                                        ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users // lấy giá trị trong state reddux adminReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
