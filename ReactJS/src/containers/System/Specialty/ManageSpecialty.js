import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import *as actions from '../../../store/actions';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            previewImgURL: '',
            specialtyId: '',
            specialtyArr: [],
        }
    }

    async componentDidMount() {
        this.props.getAllSpecialties()

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.allSpecialties !== prevProps.allSpecialties) {
            this.setState({
                name: '',
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

    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new specialty successfully!')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewImgURL: '',
            })
            this.props.getAllSpecialties()
        } else {
            toast.error('Error...')
            console.log('check loi:', res)
        }
    }

    handleEditSpecialty = (specialty) => {
        this.setState({
            name: specialty.name,
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkdown: specialty.descriptionMarkdown,
            previewImgURL: specialty.image,
            specialtyId: specialty.id,
            imageBase64: specialty.image,
        })
    }

    btnEditSpecialty = () => {
        this.props.editSpecialty({
            id: this.state.specialtyId,
            name: this.state.name,
            image: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown
        })
    }



    render() {
        let specialtyArr = this.props.allSpecialties

        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quan ly chuyen khoa</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Ten chuyen khoa</label>
                        <input className='form-control' type='text'
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Anh chuyen khoa</label>
                        <input className='form-control-file'
                            type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                        <div className='preview-image'
                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}

                        ></div>
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
                            onClick={() => this.handleSaveNewSpecialty()}
                        >
                            Save</button>
                        <button className='btn-edit-specialty'
                            onClick={() => this.btnEditSpecialty()}
                        >
                            Update</button>
                    </div>
                    <table className='table-specialty' id="TableManageUser">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>name</th>
                                <th>descriptionHTML</th>
                                <th>descriptionMarkdown</th>
                                <th>Actions</th>
                            </tr>
                            {specialtyArr && specialtyArr.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.descriptionHTML}</td>
                                        <td>{item.descriptionMarkdown}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => { this.handleEditSpecialty(item) }}
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
        allSpecialties: state.admin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSpecialties: () => dispatch(actions.getAllSpecialty()),
        editSpecialty: (data) => dispatch(actions.editSpecialty(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
