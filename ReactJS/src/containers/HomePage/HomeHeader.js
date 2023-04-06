import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
// import logo from '../../assets/logo.svg';
import logo from '../../assets/logo_single.svg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';
import Popup from 'reactjs-popup';
import Select from 'react-select';
import { getAllSpecialties } from '../../services/userService';


class HomeHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: [],
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialties()
        if (res && res.errCode === 0) {
            let dataSelect = this.builDataInputSelect(res.data ? res.data : [])
            this.setState({
                dataSpecialty: dataSelect
            })
        }
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevProps.dataSpecialty !== this.props.dataSpecialty) {
    //         let dataSelect = this.builDataInputSelect(this.props.dataSpecialty)
    //         this.setState({
    //             dataSpecialty: dataSelect
    //         })
    //     }
    // }

    builDataInputSelect = (inputData) => {
        let result = []
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                object.label = item.name
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }

    handleChangeSelect = async (selectedOption) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${selectedOption.value}`)
        }

    };

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire reduce event : actions

    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/homepage`)
        }
    }

    render() {
        let language = this.props.language
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-deader-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo} onClick={() => this.returnToHome()} />
                            <div className='name-web'>make your life</div>
                        </div>
                        <div className='center-content'>
                            {/* <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.speciality" /></b></div>

                                <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div className='subs-title'><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div className='subs-title'><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.check-health" /></div>
                            </div>
                            <div className='child-content'>

                            </div> */}
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <Popup contentStyle={{
                                    width: "180px", height: '150px', background: 'white',
                                    borderRadius: '10px', padding: '10px', fontSize: '15px', color: 'hotpink', fontStyle: 'initial'
                                }}
                                    trigger={open => (
                                        <div>
                                            <i className="fas fa-question-circle"></i>
                                            <FormattedMessage id="homeheader.support" />
                                        </div>
                                    )}
                                    on={['hover', 'focus']}
                                    position="bottom center"
                                    closeOnDocumentClick
                                >
                                    <div>Mọi thắc mắc xin liên hệ đường dây nóng</div>
                                    <div>Hotline: 19001009 </div>
                                    <div>Trung tâm chăm sóc khách hàng:</div>
                                    <div>Đ/c: số 1 Đại Cồ Việt</div>
                                </Popup>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='tiltle1'><FormattedMessage id="banner.title1" /></div>
                            <div className='tiltle2'><FormattedMessage id="banner.title2" /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                {/* <input className='placeholder' type='text' placeholder='Tìm kiếm chuyên khoa phù hợp'>

                                </input> */}
                                <Select
                                    className='slect'
                                    // value={this.state.dataSpecialty}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.dataSpecialty}
                                    placeholder={'Tìm kiếm chuyên khoa phù hợp'}
                                />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child1" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-mobile"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child2" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-file-medical-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child3" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-burn"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child4" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child5" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child6" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
