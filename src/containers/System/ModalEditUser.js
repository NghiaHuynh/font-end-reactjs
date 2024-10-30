import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'; //dung cho viec check object rong hay khong

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
            phonenumber: '',
            roleId: ''
        }
        
    }


    componentDidMount() {
        let { currentUser } = this.props;
        if (currentUser && !_.isEmpty(currentUser)) {
            this.setState({
                id: currentUser.id,
                email: currentUser.email,
                password: 'HARDCODE',
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                address: currentUser.address,
                phonenumber: currentUser.phonenumber,
                roleId: currentUser.roleId
            })
        }

    }

    toggle = () => {
        //close modal goi tu thang con len thang cha
        this.props.toggleParentModal();
    }

    toggleModalEdit = () => {
        //close modal goi tu thang con len thang cha
        this.props.toggleParentModalEdit();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState //copy y nguyen object state cua thanh phan object
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api edit user
            this.props.editParentUser(this.state);
            this.toggleModalEdit();
        }
    }


    render() {
        return (
            <Modal isOpen={this.props.isOpenEdit}
                size="lg"
                className='modal-user-container'
                centered={true} toggle={() => (this.toggleModalEdit())}>
                <ModalHeader toggle={() => (this.toggleModalEdit())}>Edit New User</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className="input-group mb-3">
                            <input type="text"
                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                value={this.state.email}
                                disabled
                             className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                            {/* <span class="input-group-text" id="basic-addon1">@example.com</span> */}
                            <input type="Password"
                                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                value={this.state.password}
                                disabled
                             className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            {/* <span class="input-group-text" id="basic-addon1">First and Last Name</span> */}
                            <input type="text"
                                onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                value={this.state.firstName}
                             className="form-control" placeholder="First Name" aria-label="First Name" aria-describedby="basic-addon1" />
                            <input type="text"
                                onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                value={this.state.lastName}
                             className="form-control" placeholder="Last Name" aria-label="Last Name" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text"
                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                value={this.state.address}
                             className="form-control" placeholder="Address" aria-label="Address" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text"
                                onChange={(event) => this.handleOnChangeInput(event, 'phonenumber')}
                                value={this.state.phonenumber}
                             className="form-control" placeholder="Phone Number" aria-label="Phone Number" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Role" aria-label="Role" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" className='px-3' color="primary" 
                    onClick={() => (this.handleSaveUser())}>
                        Save changes
                    </Button>
                    <Button type="button" className='px-3' color="secondary" 
                    onClick={() => (this.toggleModalEdit())}>
                        Close
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
