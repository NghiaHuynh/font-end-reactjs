import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import { languages } from '../../utils';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { fetchAllDoctorsStart, saveDetailDoctorStart } from '../../store/actions/adminActions';
import userService from '../../services/userService';
import { CRUD_ACTION } from '../../utils/constant';
import { act } from 'react';

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
            description: '',
            hasOldData: false
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
        let hasOldData = this.state.hasOldData;
        this.props.saveDetailDoctorStart({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE
        });
        // console.log('check state', this.state);
    }

    handleChangeSelect = async (selectedObtion) => {
        this.setState({ selectedOption: selectedObtion });
        // console.log(selectedObtion);
        let res = await userService.getDetailDoctorApi(selectedObtion.value);
        // console.log('check res', res);
        if (res && res.data.errCode === 0
            && res.data.data
            && res.data.data.markdownData
            && res.data.data.markdownData.description) {
            let markdownData = res.data.data.markdownData;
            this.setState({
                contentHTML: markdownData.contentHTML,
                contentMarkdown: markdownData.contentMarkdown !== null ? markdownData.contentMarkdown : '',
                description: markdownData.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }

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
        let { hasOldData } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">them thong tin doctor</div>
                <div className='more-infor'>
                    <div className='content-left'>

                        <label>Chọn Doctor:</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
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
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>
                <button className={
                    hasOldData === true ? "btn-primary save-content-doctor" : "btn-primary create-content-doctor"}
                    onClick={() => this.handleSaveContentMarkdown()}>
                    {hasOldData === true ?
                        <FormattedMessage id="manage-doctor.edit" /> : <FormattedMessage id="manage-doctor.add" />}
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
