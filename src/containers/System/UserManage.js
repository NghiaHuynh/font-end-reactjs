import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import userService from '../../services/userService';
import ModalUser from './ModalUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isShowModal: false
        }
    }

    async componentDidMount() {
        //goi cac gia tri tu api va set vao state
        let res = await userService.getAllUsersApi('ALL');
        console.log(res);
        if (res && res.data.errCode === 0) {
            this.setState({
                arrUsers: res.data.users
            })
        }
    }

    handleAddNewUser = ()=>{
        // alert("add new user");
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }

    toggleModal = () => {
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }

    // Lifecycle
    // Run when component is mounted /born => set state
    // Run when component is unmounted /die

    render() {
        console.log('check user manage: ', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    //props cua thang con la state cua thang cha
                    isOpen={this.state.isShowModal}
                    toggleParentModal={this.toggleModal}
                />
                <div className="title text-center">Manage users</div>
                <div className="mx-5">
                    <button className="btn btn-primary px-3"
                        onClick={this.handleAddNewUser}
                    ><i className="fas fa-plus"></i>Add new user</button>
                </div>
                <div className="users-table mt-4 mx-5">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Acction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn btn-delete"><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
