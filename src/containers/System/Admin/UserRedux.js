import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, CRUD_ACTION, CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import { URL as url } from 'url';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import { fetchAllUsersStart } from '../../../store/actions';
import { Buffer } from 'buffer';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: '',
            genderArr: [],
            positionArr: [],
            roleArr: [],
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            image: '',
            userEditId: '',

            action: CRUD_ACTION.CREATE
        };
    }

    componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //khi render thì sẽ run didUpdate
        // so sanh hiện tại (this) và quá khứ (previous)
        // [] => [3]
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
                gender: this.props.genderRedux && this.props.genderRedux.length > 0 ? this.props.genderRedux[0].keyMap : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
                position: this.props.positionRedux && this.props.positionRedux.length > 0 ? this.props.positionRedux[0].keyMap : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
                role: this.props.roleRedux && this.props.roleRedux.length > 0 ? this.props.roleRedux[0].keyMap : ''
            })
        }

        if (prevProps.allUsersRedux !== this.props.allUsersRedux) {
            let arrGenders = this.props.genderRedux;
            let arrPosition = this.props.positionRedux;
            let arrRole = this.props.roleRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                image: '',

                previewImgURL: '',
                action: CRUD_ACTION.CREATE
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                image: base64
            })
        }
    }

    openLightbox = () => {
        // console.log('open lightbox');
        if (!this.state.previewImgURL) {
            return;
        }
        this.setState({
            isOpen: true
        })
    }

    handleSaveNewUser = () => {
        let isValid = this.checkValidateInput();
        if (!isValid) return;

        let { action } = this.state;
        if (action === CRUD_ACTION.CREATE) {
            //fire redux event : actions
            this.props.createNewUserStart({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                position: this.state.position,
                role: this.state.role,
                image: this.state.image

            })
        }
        else if (action === CRUD_ACTION.EDIT) {
            //fire redux event : actions
            this.props.editUserStartRedux({
                id: this.state.userEditId,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                position: this.state.position,
                role: this.state.role,
                image: this.state.image
            })
        }

        // setTimeout(() => {
        //     this.props.fetchAllUsersStartRedux();
        // }, 1000);
        // console.log('save new user', this.state);
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleFillFormEditUser = (user) => {
        let imgeBase64 = '';
        if (user.image) {
            const buffer = Buffer.from(user.image, 'base64');
            imgeBase64 = `${buffer.toString('binary')}`;

            this.setState({
                previewImgURL: imgeBase64
            })
        }

        this.setState({
            email: user.email,
            password: "HARD_CODE",
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            action: CRUD_ACTION.EDIT,
            userEditId: user.id
        })
    }

    handleCancelEditUser = () => {
        let arrGenders = this.props.genderRedux;
        let arrPosition = this.props.positionRedux;
        let arrRole = this.props.roleRedux;
        
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
            position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
            role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
            image: '',

            previewImgURL: '',
            action: CRUD_ACTION.CREATE
        })
    }

    render() {
        let genderArr = this.state.genderArr;
        let positionArr = this.state.positionArr;
        let roleArr = this.state.roleArr;
        let { language, isLoadingGenderRedux } = this.props;
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, image } = this.state;
        // console.log('check state edit : ', this.state);
        return (
            <div className="user-redux-container">
                <div className="title">
                    {/* <FormattedMessage id="admin.manage-user.title" /> */}
                    User Redux
                </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <form className="row g-3">
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.email" /></label>
                                    <input type="email"
                                        value={email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                        className="form-control" id="inputEmail4"
                                        disabled={this.state.action === CRUD_ACTION.EDIT ? true : false} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.password" /></label>
                                    <input type="password"
                                        value={password}
                                        onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                        className="form-control" id="inputPassword4"
                                        disabled={this.state.action === CRUD_ACTION.EDIT ? true : false} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.first-name" /></label>
                                    <input type="text"
                                        value={firstName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                        className="form-control" id="firstName" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.last-name" /></label>
                                    <input type="text"
                                        value={lastName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                        className="form-control" id="lastName" />
                                </div>
                                <div className="col-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.phone-number" /></label>
                                    <input type="text"
                                        value={phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                        className="form-control" id="phoneNumber" placeholder="+84 1234" />
                                </div>
                                <div className="col-9">
                                    <label className="form-label"><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text"
                                        value={address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                        className="form-control" id="address" placeholder="Apartment, studio, or floor" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.gender" /></label>
                                    <select id="inputState" className="form-select"
                                        onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                        value={gender}
                                    >
                                        {genderArr && genderArr.length > 0 &&
                                            genderArr.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === languages.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.position" /></label>
                                    <select id="inputState" className="form-select"
                                        onChange={(event) => this.handleOnChangeInput(event, 'position')}
                                        value={position}
                                    >
                                        {positionArr && positionArr.length > 0 &&
                                            positionArr.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === languages.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.role" /></label>
                                    <select id="inputState" className="form-select"
                                        onChange={(event) => this.handleOnChangeInput(event, 'role')}
                                        value={role}
                                    >
                                        {roleArr && roleArr.length > 0 &&
                                            roleArr.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === languages.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.image" /></label>
                                    <div className='preview-img-container'>
                                        <input type="file" className="form-control" id="inputImage" hidden
                                            onChange={(event) => this.handleOnchangeImage(event)} />
                                        <label className='label-upload' htmlFor='inputImage'>Tải ảnh<i className="fa fa-upload"></i></label>
                                        <div className="preview-image"
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            onClick={() => this.openLightbox()}>

                                        </div>
                                    </div>

                                </div>
                                <div className="col-auto">
                                    <button type="button"
                                        className={this.state.action === CRUD_ACTION.EDIT ? "btn-warning" : "btn-primary"}
                                        onClick={() => this.handleSaveNewUser()}>
                                        {this.state.action === CRUD_ACTION.EDIT ?
                                            <FormattedMessage id="manage-user.edit" /> :
                                            <FormattedMessage id="manage-user.save" />
                                        }
                                    </button>

                                    {this.state.action === CRUD_ACTION.EDIT &&
                                        <button type="button"
                                            style={{ marginLeft: '10px' }}
                                            className="btn-danger"
                                            onClick={() => this.handleCancelEditUser()}>
                                            <FormattedMessage id="manage-user.cancel" />
                                        </button>}
                                </div>

                            </form>

                            <div className="col-12 mt-5">
                                <TableManageUser
                                    handleFillFormEditUserParent={this.handleFillFormEditUser}
                                    actionParent={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGenderRedux: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        allUsersRedux: state.admin.allUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUserStart: (data) => dispatch(actions.createNewUserStart(data)),
        fetchAllUsersStartRedux: () => dispatch(fetchAllUsersStart()),
        editUserStartRedux: (data) => dispatch(actions.editUserStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
