import React from 'react'
import axios from 'axios'

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
        console.log(this.state);
        axios.post('http://localhost:8080/users', this.state)
            .then(response => {
                console.log(response)
                localStorage.setItem('authToken', response.data.token)
            })
            .catch(error => console.log(error))
    }
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    componentDidMount = () => {
        // axios.post('http://localhost8080/users', this.state)
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

export default CreateAccountPage