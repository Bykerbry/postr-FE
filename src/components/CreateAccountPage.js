import React from 'react'
import createUser from '../services/users/createUser'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class CreateAccountPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    }
    submitHandler = (e) => {
        e.preventDefault()
        createUser(this.state, this.props)
    }
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={this.state.firstName}
                        onChange={this.changeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        value={this.state.lastName} 
                        onChange={this.changeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input 
                        type="text" 
                        name="email" 
                        value={this.state.email} 
                        onChange={this.changeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="text" 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.changeHandler}
                    />
                </div>
                <button>Create Account</button>
            </form>
        ) 
    }
}

export default connect((state) => {
    return {
        user: state.user,
        error: state.error
    }
})(withRouter(CreateAccountPage))
