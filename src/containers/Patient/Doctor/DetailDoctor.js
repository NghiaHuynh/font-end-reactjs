import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import * as actions from '../../../store/actions';
import { languages } from '../../../utils';

class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctorData: {}
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.props.fetchDetailInforDoctorRedux(id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctorRedux !== this.props.detailDoctorRedux) {
            this.setState({
                detailDoctorData: this.props.detailDoctorRedux
            })
        }
    }

    render() {

        let { detailDoctorData } = this.state;
        let language = this.props.language;
        let nameVi = '', nameEn = '';
        if (detailDoctorData && detailDoctorData.positionData) {
            nameVi = `${detailDoctorData.positionData.valueVi}, ${detailDoctorData.lastName} ${detailDoctorData.firstName}`;
            nameEn = `${detailDoctorData.positionData.valueEn}, ${detailDoctorData.firstName} ${detailDoctorData.lastName}`;
        }
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="detail-doctor-container">
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDoctorData && detailDoctorData.image ? detailDoctorData.image : ''})` }}>
                        </div>
                        <div className='content-right'
                        >
                            <div className='up'>
                                {language === languages.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDoctorData && detailDoctorData.markdownData &&
                                    <span>
                                        {detailDoctorData.markdownData.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctorData && detailDoctorData.markdownData &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctorData.markdownData.contentHTML }}></div>
                        }
                    </div>
                    <div className='comment-doctor'>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        detailDoctorRedux: state.admin.detailDoctorData,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailInforDoctorRedux: (id) => dispatch(actions.fetchDetailDoctorStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
