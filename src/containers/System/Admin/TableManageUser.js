import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import { fetchAllUsersStart, deleteUserStart } from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
        }
    }

    componentDidMount() {
        //goi cac gia tri tu api va set vao state
        this.props.fetchAllUsersStartRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allUsersRedux !== this.props.allUsersRedux) {
            this.setState({
                arrUsers: this.props.allUsersRedux
            })
        }
    }

    handleDeleteUser = async (user) => {
        this.props.deleteUserStartRedux(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleFillFormEditUserParent(user);
    }

    // Lifecycle
    // Run when component is mounted /born => set state
    // Run when component is unmounted /die

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <React.Fragment>
                <table id="customers">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Acction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn btn-edit"
                                            onClick={() => this.handleEditUser(item)}
                                        ><i className="fas fa-pencil-alt"></i></button>
                                        <button
                                            onClick={() => this.handleDeleteUser(item)}
                                            className="btn btn-delete"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        allUsersRedux: state.admin.allUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersStartRedux: () => dispatch(fetchAllUsersStart()),
        deleteUserStartRedux: (userId) => dispatch(deleteUserStart(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
