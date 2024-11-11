import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { languages } from '../../../utils';
import { Buffer } from 'buffer';
import { FormattedMessage } from 'react-intl';

class OutStandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            let arrDoctors = this.props.topDoctorsRedux;
            this.setState({
                arrDoctors: arrDoctors
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    render() {
        let { topDoctorsRedux } = this.props;
        let language = this.props.language;
        let { arrDoctors } = this.state;
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='section-title'>
                            <FormattedMessage id="home-page.outstanding-doctor" />
                        </span>
                        <button className='section-btn'>
                            <FormattedMessage id="home-page.more-info" />
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                                let imageBase64 = '';
                                // console.log("check image:"+item.image);
                                if (item.image) {
                                    imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div className='section-customize'>
                                        <div className='customize-border'>
                                            <div className='outer-bg' key={index}>
                                                <div className='section-img section-outstanding-doctor' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                            </div>
                                            <div className='position text-center'>
                                                <div>{language === languages.VI ? nameVi : nameEn}</div>
                                                <div>Chính xác</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='section-img section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư tiến sĩ</div>
                                        <div>Chính xác</div>
                                    </div>
                                </div>
                            </div> */}
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctorHomeStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
