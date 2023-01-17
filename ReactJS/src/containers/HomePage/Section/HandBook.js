import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './Handbook.scss';
import { getAllHandbook } from "../../../services/userService";
import { withRouter } from 'react-router';


class HandBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataHandbooks: [],
        }
    }

    async componentDidMount() {
        let res = await getAllHandbook()
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbooks: res.data ? res.data : []
            })
        }
    }

    handleViewDetailHandbook = (handbook) => {
        if (this.props.history) {
            //redirect
            this.props.history.push(`detail-handbook/${handbook.id}`)
        }
    }

    render() {

        let { dataHandbooks } = this.state

        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataHandbooks && dataHandbooks.length > 0
                                &&
                                dataHandbooks.map((item, index) => {
                                    return (
                                        <div className='section-customize handbook-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailHandbook(item)}
                                        >
                                            <div className='bg-image section-handbook'

                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='handbook-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
