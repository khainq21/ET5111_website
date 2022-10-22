import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class OutStandingDoctor extends Component {

    render() {

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className='outder-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Doctor, Nguyễn Huy Anh </div>
                                        <div>Khoa sản</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className='outder-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Doctor, Nguyễn Huy Anh </div>
                                        <div>Khoa sản</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className='outder-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Doctor, Nguyễn Huy Anh </div>
                                        <div>Khoa sản</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className='outder-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Doctor, Nguyễn Huy Anh </div>
                                        <div>Khoa sản</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className='outder-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Doctor, Nguyễn Huy Anh </div>
                                        <div>Khoa sản</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className='outder-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Doctor, Nguyễn Huy Anh </div>
                                        <div>Khoa sản</div>
                                    </div>
                                </div>
                            </div>

                        </Slider>
                    </div>
                </div >
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
