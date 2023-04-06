import React, { Component } from 'react';
import { connect } from 'react-redux';
import home from "../../../assets/home.mp4";
import "./information.scss";
import GoogleMapReact from 'google-map-react';

const Position = () => <div className='highlight'><i className="fa-solid fa-house"></i></div>

class Information extends Component {
    constructor(props) {
        super(props)
        this.state = {
            position: {
                lat: 21.003478910052905,
                lng: 105.84432643916797,
            }
        }
    }

    render() {
        let { position } = this.state
        return (
            <div className='container'>
                <div className='section-share section-information'>
                    <video autoPlay loop muted playsInline>
                        <source src={home} />
                    </video>
                </div>
                <div className='content_info'>
                    <div className='content_left'>
                        <div>Dành riêng cho bác sĩ chuyên khoa</div>
                        <div>Liên hệ hợp tác với chúng tôi</div>
                    </div>
                    <div className='content_right'>
                        <div className='location'>Địa chỉ: 2 P. Trần Đại Nghĩa, Bách Khoa, Hai Bà Trưng, Hà Nội, Việt Nam </div>
                        <div className='map'>  <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyC9p0UHgpZ2lYW1vBn_pE8b03WtGceKV_A' }}
                            defaultCenter={position}
                            defaultZoom={16}
                            center={position}
                        >
                            <Position className='highlight'
                                lat={position.lat}
                                lng={position.lng}
                            >

                            </Position>
                        </GoogleMapReact></div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Information);
