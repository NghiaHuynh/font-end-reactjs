import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';


class HomeFooter extends Component {

    render() {
        
        return (
            <div className='home-footer'>
                <p>&copy; 2024 by hhnghia. More infomation, please visit:<a target='_blank' href='https://github.com/NghiaHuynh'>&rarr; Click Here &rarr;</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
