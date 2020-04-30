import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
    handleSubmit = e => {
        e.preventDefault()
        const {email, password} = this.state
        axios.post('http://localhost:8080/users/login', {email, password})
            .then(response => {
                this.setState({error: ''})
                console.log(response.data)
                localStorage.setItem('authToken', response.data.token)
            })
            .catch(error => this.setState({error: error.response.data.error}))
    }
    render() {
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

export default LoginPage
