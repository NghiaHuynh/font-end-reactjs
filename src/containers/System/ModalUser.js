import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {



    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    toggle = () => {
        //close modal goi tu thang con len thang cha
        this.props.toggleParentModal();
    }


    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                size="lg"
                className='modal-user-container'
                centered={true} toggle={() => (this.toggle())}>
                <ModalHeader toggle={() => (this.toggle())}>Create New User</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                            {/* <span class="input-group-text" id="basic-addon1">@example.com</span> */}
                            <input type="Password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            {/* <span class="input-group-text" id="basic-addon1">First and Last Name</span> */}
                            <input type="text" className="form-control" placeholder="First Name" aria-label="First Name" aria-describedby="basic-addon1" />
                            <input type="text" className="form-control" placeholder="Last Name" aria-label="Last Name" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Address" aria-label="Address" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Phone Number" aria-label="Phone Number" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Role" aria-label="Role" aria-describedby="basic-addon1" />
                        </div>
                        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" className='px-3' color="primary" onClick={() => (this.toggle())}>
                        Do Something
                    </Button>
                    <Button type="button" className='px-3' color="secondary" onClick={() => (this.toggle())}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
