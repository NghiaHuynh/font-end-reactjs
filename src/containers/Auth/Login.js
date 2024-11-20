import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import userService from '../../services/userService';



class Login extends Component {
    // khai bao state
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleLogin = async () => {
        let copyState = { ...this.state };
        copyState.errMessage = '';
        this.setState({
            ...copyState
        });
        await userService.handleLoginApi(this.state.username, this.state.password)
            .then(res => {
                // console.log(res);
                copyState.errMessage = res.data.message;
                this.setState({
                    ...copyState
                });
                if (res && res.data.errCode === 0) {
                    this.props.userLoginSuccess(res.data.user);
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response) {
                    if (err.response.data) {
                        copyState.errMessage = err.response.data.message;
                    }
                }
                this.setState({
                    ...copyState
                });
            })
    }

    handleShowHidePassword = () => {
        let copyState = { ...this.state };
        copyState.isShowPassword = !copyState.isShowPassword;//lay gia tri nguoc lai
        this.setState({
            ...copyState
        });
    }

    // ham render
    render() {
        //viet theo cu phap cua react jsx
        //chi duy nhat 1 khoi o tang ngoai cung
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">
                            <h1>Login</h1>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input type="text" className="form-control"
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeInput(event, 'username')} />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div className="eye-icon custom-eye-icon">
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control" placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangeInput(event, 'password')} />
                                <span className="eye-icon-input"
                                    onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12">
                            <span style={{ color: 'red' }}>{this.state.errMessage}</span>
                        </div>
                        <div className="col-12">
                            <button className="btn-login" onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className="col-12 text-center">
                            <span className="forgot-password">Forgot password?</span>
                        </div>
                        <div className="col-12 text-center">
                            <span className="text-login">Or login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google google-login"></i>
                            <i className="fab fa-facebook-f facebook-login"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// ham lay state
const mapStateToProps = state => {
    //viet theo cu phap cua redux
    return {
        lang: state.app.language
    };
};

// ham dispatch
const mapDispatchToProps = dispatch => {
    return {
        //viet theo cu phap cua react-router
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
