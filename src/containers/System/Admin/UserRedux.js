import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from '../../../utils';
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import { URL as url } from 'url';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: '',
            genderArr: [],
            positionArr: [],
            roleArr: [],
            isOpen: false
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
                genderArr: this.props.genderRedux
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
    }

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl
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

    render() {
        let genderArr = this.state.genderArr;
        let positionArr = this.state.positionArr;
        let roleArr = this.state.roleArr;
        let { language, isLoadingGenderRedux } = this.props;
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
                                    <input type="email" className="form-control" id="inputEmail4" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.password" /></label>
                                    <input type="password" className="form-control" id="inputPassword4" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.first-name" /></label>
                                    <input type="email" className="form-control" id="inputEmail4" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.last-name" /></label>
                                    <input type="password" className="form-control" id="inputPassword4" />
                                </div>
                                <div className="col-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.phone-number" /></label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="+84 1234" />
                                </div>
                                <div className="col-9">
                                    <label className="form-label"><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.gender" /></label>
                                    <select id="inputState" className="form-select">
                                        {genderArr && genderArr.length > 0 &&
                                            genderArr.map((item, index) => {
                                                return (
                                                    <option key={index}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.position" /></label>
                                    <select id="inputState" className="form-select">
                                        {positionArr && positionArr.length > 0 &&
                                            positionArr.map((item, index) => {
                                                return (
                                                    <option key={index}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.role" /></label>
                                    <select id="inputState" className="form-select">
                                        {roleArr && roleArr.length > 0 &&
                                            roleArr.map((item, index) => {
                                                return (
                                                    <option key={index}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
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
                                <div className="col-12">
                                    <button type="submit" className="btn-primary"><FormattedMessage id="manage-user.save" /></button>
                                </div>
                            </form>
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
        roleRedux: state.admin.roles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
