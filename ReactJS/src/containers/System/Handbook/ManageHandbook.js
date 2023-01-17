import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageHandbook.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewHandbook, editHandbookService } from '../../../services/userService';
import { toast } from 'react-toastify';
import *as actions from '../../../store/actions';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandbook extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            previewImgURL: '',
            handbookId: '',
        }
    }

    async componentDidMount() {
        this.props.getAllHandbooks()

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.allHandbook !== prevProps.allHandbook) {
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

    handleSaveNewHandbook = async () => {
        let res = await createNewHandbook(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new handbook successfully!')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewImgURL: '',
            })
            this.props.getAllHandbooks()
        } else {
            toast.error('Error...')
            console.log('check loi:', res)
        }
    }

    handleEditHandbook = (handbook) => {
        this.setState({
            name: handbook.name,
            descriptionHTML: handbook.descriptionHTML,
            descriptionMarkdown: handbook.descriptionMarkdown,
            previewImgURL: handbook.image,
            handbookId: handbook.id,
            imageBase64: handbook.image,
        })
    }

    btnEditHandbook = async () => {
        let res = await editHandbookService({
            id: this.state.handbookId,
            name: this.state.name,
            image: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown
        })
        if (res && res.errCode === 0) {
            toast.success('Update handbook succeed!')
            this.props.getAllHandbooks()
        } else {
            toast.error('Error!')
        }
    }



    render() {
        let handbookArr = this.props.allHandbook
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý thông tin cẩm nang</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên cẩm nang</label>
                        <input className='form-control' type='text'
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh bìa cẩm nang</label>
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
                            onClick={() => this.handleSaveNewHandbook()}
                        >
                            Save</button>
                        <button className='btn-edit-specialty'
                            onClick={() => this.btnEditHandbook()}
                        >
                            Update</button>
                    </div>
                    <table className='table-specialty' id="TableManageUser">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>name</th>
                                <th>descriptionMarkdown</th>
                                <th>Actions</th>
                            </tr>
                            {handbookArr && handbookArr.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.descriptionMarkdown}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => { this.handleEditHandbook(item) }}
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
        allHandbook: state.admin.allHandbook,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllHandbooks: () => dispatch(actions.getAllHandbooks()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
