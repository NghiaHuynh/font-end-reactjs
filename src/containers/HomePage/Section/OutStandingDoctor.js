import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class OutStandingDoctor extends Component {

    render() {

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='section-title'>Bác sĩ nổi bật tuần qua</span>
                        <button className='section-btn'>Tìm Kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='section-img section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư tiến sĩ</div>
                                        <div>Chính xác</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='section-img section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư tiến sĩ</div>
                                        <div>Chính xác</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='section-img section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư tiến sĩ</div>
                                        <div>Chính xác</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='section-img section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư tiến sĩ</div>
                                        <div>Chính xác</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='section-img section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư tiến sĩ</div>
                                        <div>Chính xác</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='section-img section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư tiến sĩ</div>
                                        <div>Chính xác</div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
