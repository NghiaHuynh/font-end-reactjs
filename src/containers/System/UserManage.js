import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import userService from '../../services/userService';
import ModalUser from './ModalUser';
import { emitterUtils } from '../../utils/emitter';
import { Modal } from 'reactstrap';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isShowModal: false,
            isShowModalEdit: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        //goi cac gia tri tu api va set vao state
        this.getAllUsers();
    }

    getAllUsers = async () => { //goi cacgia tri tu api va set vao state
        let res = await userService.getAllUsersApi('ALL');
        if (res && res.data.errCode === 0) {
            this.setState({
                arrUsers: res.data.users
            })
        }
    }

    handleAddNewUser = () => {
        // alert("add new user");
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }

    handleDeleteUser = async (user) => {
        // alert("delete user"+user.id);
        try {
            let res = await userService.deleteUserApi(user.id);
            if (res && res.data.errCode === 0) {
                this.getAllUsers();
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    createNewUser = async (data) => {
        try {
            let res = await userService.createNewUserApi(data);
            console.log(res);
            if (res && res.data.errCode !== 0) {
                alert(res.data.message);
            } else {
                this.getAllUsers();
                emitterUtils.emit('EVENT_CLEAR_MODAL_DATA');//truyen di 1 event
            }
        } catch (error) {
            console.log(error);
        }
    }

    toggleModal = () => {
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }

    toggleModalEdit = () => {
        this.setState({
            isShowModalEdit: !this.state.isShowModalEdit
        })
    }

    handleEditUser = (user) => {
        // alert("edit user ==>>"+user.id);
        this.setState({
            isShowModalEdit: !this.state.isShowModalEdit,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await userService.editUserApi(user);
            if (res && res.data.errCode === 0) {
                this.getAllUsers();
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Lifecycle
    // Run when component is mounted /born => set state
    // Run when component is unmounted /die

    render() {
        // console.log('check user manage: ', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    //props cua thang con la state cua thang cha
                    isOpen={this.state.isShowModal}
                    toggleParentModal={this.toggleModal}
                    createParentNewUser={this.createNewUser}
                />
                {/* Modal edit user dung cach nay thi trong componentDidMount 
                cua thang con se co duoc thong tin cua editUser */}
                {this.state.isShowModalEdit &&
                    <ModalEditUser
                        //props cua thang con la state cua thang cha
                        isOpenEdit={this.state.isShowModalEdit}
                        toggleParentModalEdit={this.toggleModalEdit}
                        currentUser={this.state.userEdit}
                        editParentUser={this.doEditUser}
                    />
                }
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
                                            <button className="btn btn-edit"
                                                onClick={() => this.handleEditUser(item)}
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                onClick={() => this.handleDeleteUser(item)}
                                                className="btn btn-delete"><i className="fas fa-trash"></i></button>
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
