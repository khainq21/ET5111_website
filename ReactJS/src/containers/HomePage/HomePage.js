import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import MedicalFacility from './Section/MedicalFacility';
import Specialty from './Section/Specialty';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import Information from './Section/Information';
import HomeFooter from './HomeFooter';
import './HomePage.scss';

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            isfinite: true,
            // isfinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        }

        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <OutStandingDoctor
                    settings={settings} />
                <Specialty
                    settings={settings} />
                <MedicalFacility
                    settings={settings} />
                <Information />
                <HandBook
                    settings={settings} />
                <HomeFooter />

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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
