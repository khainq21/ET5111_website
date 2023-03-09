import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBBtn
} from 'mdb-react-ui-kit';
import "./HomeFooter.scss";


//giao diện phần footer chứa thông tin chi tiết của hệ thống
//các section là các thanh lựa chọn bác sĩ, chuyên khoa, cơ sở y tế, cẩm nang ở trang chủ

class HomeFooter extends Component {

    render() {

        return (
            <MDBFooter className='text-center' color='white' bgColor='info'>
                <MDBContainer className='p-4'>
                    <section className='mb-4'>
                        <MDBBtn outline color="light" floating className='m-1' href='https://www.facebook.com/60Centuries' role='button'>
                            <MDBIcon fab icon='facebook-f' />
                        </MDBBtn>

                        <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                            <MDBIcon fab icon='twitter' />
                        </MDBBtn>

                        <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                            <MDBIcon fab icon='google' />
                        </MDBBtn>

                        <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                            <MDBIcon fab icon='instagram' />
                        </MDBBtn>

                        <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                            <MDBIcon fab icon='linkedin-in' />
                        </MDBBtn>

                        <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                            <MDBIcon fab icon='github' />
                        </MDBBtn>
                    </section>
                    <section className='mb-4'>
                        <p>
                            Chăm sóc sức khỏe cộng đồng là sứ mệnh cao cả của chúng tôi. Hãy chung tay xây dựng một cộng đồng lớn mạnh,
                            góp phần thúc đấy sự phát triển của đất nước. Mỗi cá nhân khỏe mạnh là một gia đình hạnh phúc, mỗi gia đình hạnh phúc
                            là một đất nước vững mạnh.
                        </p>
                    </section>
                </MDBContainer>

                <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2023 Copyright: 20182594
                </div>
            </MDBFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
