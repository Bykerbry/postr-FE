import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, Redirect} from 'react-router-dom'
import loginUser from '../services/users/loginUser'
import { removeError } from '../actions/errorActions'

export class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        if (this.props.error.error) {
            this.props.dispatch(removeError())
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const {email, password} = this.state
        loginUser({email, password}, this.props)
    }

    render() {
        if(this.props.user.authToken) {
            return <Redirect to='/' />
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input 
                        type="text" 
                        name="email"
                        onChange={this.handleChange}    
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="text" 
                        name="password"
                        onChange={this.handleChange}    
                    />
                </div>
                {this.props.error.error && <p>{this.props.error.error}</p>}
                <button>Login</button>
                <p>OR</p>
                <Link to="/create-account">Create Account</Link>
            </form>
        )
    }
}

export default connect((state) => {
    return {
        user: state.user,
        error: state.error
    }
})(withRouter(LoginPage))



