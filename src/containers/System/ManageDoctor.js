import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import {languages} from '../../utils';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { fetchAllDoctorsStart, saveDetailDoctorStart } from '../../store/actions/adminActions';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentHTML: '',
            contentMarkdown: '',
            selectedOption: {},
            listDoctors: [],
            description: ''
        }
    }

    componentDidMount() {
        //goi cac gia tri tu api va set vao state
        // this.props.fetchAllUsersStartRedux();
        this.props.fetchAllDoctorsStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux);
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    handleDeleteUser = async (user) => {
        // this.props.deleteUserStartRedux(user.id);
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
        // console.log('handleEditorChange', html, text);
    }

    handleSaveContentMarkdown = () => {
        this.props.saveDetailDoctorStart({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value
        });
        // console.log('check state', this.state);
    }

    handleChange = (selectedObtion) => {
        this.setState({ selectedOption: selectedObtion });
        // console.log(selectedObtion);
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleEditUser = (user) => {
        // this.props.handleFillFormEditUserParent(user);
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = this.props.language === languages.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    // Lifecycle
    // Run when component is mounted /born => set state
    // Run when component is unmounted /die

    render() {
        
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">them thong tin doctor</div>
                <div className='more-infor'>
                    <div className='content-left'>

                        <label>Chọn Doctor:</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            defaultValue={this.state.listDoctors[0]}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea className="form-control" rows="4"
                            value={this.state.description}
                            onChange={(event) => this.handleOnChangeInput(event, 'description')}>
                        </textarea>
                    </div>

                </div>
                <div className="manage-doctor-editor">
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                </div>
                <button className="btn-primary save-content-doctor"
                    onClick={() => this.handleSaveContentMarkdown()}>
                    Save
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctorsRedux: state.admin.allDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => dispatch(fetchAllDoctorsStart()),
        saveDetailDoctorStart: (data) => dispatch(saveDetailDoctorStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
