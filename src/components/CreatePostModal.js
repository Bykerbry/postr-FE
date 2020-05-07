import React, { Component } from 'react'
import Modal from "react-modal";

Modal.setAppElement("#root");

export class CreatePostModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            body: ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isModalOpen}
                contentLabel='Create Post Form'
            >
                <form onSubmit={this.props.handleCreatePost}>
                    <div>
                        <label htmlFor='title'>Title</label>
                        <input 
                            type='text' 
                            name='title' 
                            onChange={this.handleChange}    
                        />
                    </div>
                    <div>
                        <label htmlFor='body'>Content</label>
                        <textarea
                            cols='30'
                            rows='10'
                            name='body'
                            onChange={this.handleChange}    
                        ></textarea>
                        
                    </div>
                    <button>Add Post</button>
                </form>
            </Modal>
        )
    }
}

export default CreatePostModal
