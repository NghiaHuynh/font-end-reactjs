import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import specialtyImg from '../../../assets/specialty/co-xuong-khop.png';

class Specialty extends Component {



    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }
        return (
            <div className='section-specialty'>
                <div className='specialty-content'>
                    <div className='specialty-header'>
                        <span className='specialty-title'>chuyên khoa</span>
                        <button className='specialty-btn'>xem thêm</button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...settings}>
                            <div className='specialty-customize'>
                                <div className='specialty-img'></div>
                                <div>co-xuong-khop</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='specialty-img'></div>
                                <div>co-xuong-khop</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='specialty-img'></div>
                                <div>co-xuong-khop</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='specialty-img'></div>
                                <div>co-xuong-khop</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='specialty-img'></div>
                                <div>co-xuong-khop</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='specialty-img'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
