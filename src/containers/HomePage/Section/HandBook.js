import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';


class HandBook extends Component {

    render() {
        
        return (
            <div className='section-share section-handBook'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='section-title'>Cam nang y tê</span>
                        <button className='section-btn'>xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='section-img section-handBook'></div>
                                <div>co-xuong-khop</div>
                            </div>
                            <div className='section-customize'>
                                <div className='section-img section-handBook'></div>
                                <div>co-xuong-khop</div>
                            </div>
                            <div className='section-customize'>
                                <div className='section-img section-handBook'></div>
                                <div>co-xuong-khop</div>
                            </div>
                            <div className='section-customize'>
                                <div className='section-img section-handBook'></div>
                                <div>co-xuong-khop</div>
                            </div>
                            <div className='section-customize'>
                                <div className='section-img section-handBook'></div>
                                <div>co-xuong-khop</div>
                            </div>
                            <div className='section-customize'>
                                <div className='section-img section-handBook'></div>
                                <div>co-xuong-khop</div>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

//lay gia tri tu redux vao trong props cua my component react
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

//dispatch action len redux gửi sự kiện cho redux
const mapDispatchToProps = dispatch => {
    return {
        //Map function changeLanguageAppRedux đến this.Props
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
