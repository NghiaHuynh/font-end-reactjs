import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logoIcon from '../../assets/images/logo.svg';
import headerBackground from '../../assets/images/header-background.png';

class HomeHeader extends Component {

    render() {

        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img src={logoIcon}/>
                            <div className='header-logo'>
                                <img />
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>Chuyên Khoa</b></div>
                                <div className='subs-title'>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ sở y tế</b></div>
                                <div className='subs-title'>Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác sĩ</b></div>
                                <div className='subs-title'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói Khám</b></div>
                                <div className='subs-title'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i>Hỗ Trợ</div>
                            <div className='language-vn'>VN</div>
                            <div className='language-en'>EN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className='content-up'>
                        <div className="title1">NỀN TẢN Y TẾ</div>
                        <div className="title2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm bác sĩ, chuyên khoa, cơ sở y tế" />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-hospital-alt"></i></div>
                                <div className="text-child">Kham chuyen khoa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-user-md"></i></div>
                                <div className="text-child">Kham benh vien</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-procedures"></i></div>
                                <div className="text-child">Xet nghiem</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-flask"></i></div>
                                <div className="text-child">Kham benh</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-stethoscope"></i></div>
                                <div className="text-child">Dich vu</div>
                            </div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
