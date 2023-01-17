import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewClinic, editClinicService } from '../../../services/userService';
import { toast } from 'react-toastify';
import *as actions from '../../../store/actions';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            previewImgURL: '',
            clinicId: '',
        }
    }

    async componentDidMount() {
        this.props.getAllClinics()

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.allClinic !== prevProps.allClinic) {
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewImgURL: '',
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)// doc file anh sang dang base64
            let objectUrl = URL.createObjectURL(file)// tao dang url de hien thi
            this.setState({
                previewImgURL: objectUrl,
                imageBase64: base64
            })
        }
    }

    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new clinic successfully!')
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewImgURL: '',
            })
            this.props.getAllClinics()
        } else {
            toast.error('Error...')
            console.log('check loi:', res)
        }
    }

    handleEditClinic = (clinic) => {
        this.setState({
            name: clinic.name,
            address: clinic.address,
            descriptionHTML: clinic.descriptionHTML,
            descriptionMarkdown: clinic.descriptionMarkdown,
            previewImgURL: clinic.image,
            clinicId: clinic.id,
            imageBase64: clinic.image,
        })
    }

    btnEditClinic = async () => {
        let res = await editClinicService({
            id: this.state.clinicId,
            name: this.state.name,
            address: this.state.address,
            image: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown
        })
        if (res && res.errCode === 0) {
            toast.success('Update clinic succeed!')
            this.props.getAllClinics()
        } else {
            toast.error('Error!')
        }
    }



    render() {
        let clinicArr = this.props.allClinic

        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý phòng khám</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' type='text'
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input className='form-control-file'
                            type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                        <div className='preview-image'
                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}

                        ></div>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control' type='text'
                            value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={() => this.handleSaveNewClinic()}
                        >
                            Save</button>
                        <button className='btn-edit-specialty'
                            onClick={() => this.btnEditClinic()}
                        >
                            Update</button>
                    </div>
                    <table className='table-specialty' id="TableManageUser">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>name</th>
                                <th>address</th>
                                <th>descriptionMarkdown</th>
                                <th>Actions</th>
                            </tr>
                            {clinicArr && clinicArr.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>{item.descriptionMarkdown}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => { this.handleEditClinic(item) }}
                                            ><i className="far fa-edit"></i></button>
                                            <button className='btn-delete'
                                            ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allClinic: state.admin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllClinics: () => dispatch(actions.getAllClinics()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
