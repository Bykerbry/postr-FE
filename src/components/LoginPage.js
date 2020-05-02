import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, Redirect} from 'react-router-dom'
import loginUser from '../services/loginUser'


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
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const {email, password} = this.state
        loginUser({email, password}, this.props)
    }

    // Below is required in place of componnentWillRecieveProps()
    // getDerivedStateFromProps(nextProps, prevState){ if change component did update will be called }
    // componentDidUpdate(prevProps, prevState) { setState can then be called here }

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
                {this.state.error && <p>{this.state.error}</p>}
                <button>Login</button>
                <p>OR</p>
                <Link to="/create-account">Create Account</Link>
            </form>
        )
    }
}

export default connect((state) => {
    return {
        user: state.user
    }
})(withRouter(LoginPage))



