import React, { useEffect } from 'react'
import createUser from '../services/users/createUser'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { removeError } from '../actions/errorActions'

const CreateAccountPage = (props) => {
    const { errors, register, handleSubmit } = useForm()
    const { dispatch } = props

    const onSubmit = (data) => {
        console.log(data)
        createUser(data, props)
    }
    const validatePassword = (password) => {
        return !password.toLowerCase().includes('password')
    }
    const handleChangeEmail = (e) => {
        if (props.error.email && e.target.value !== props.error.email.attempt) {
            console.log('dispatching remove error')
            dispatch(removeError())
        }
    }
    useEffect(() => {
        dispatch(removeError())
    }, [dispatch])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input 
                    type="text" 
                    name="firstName" 
                    ref={register({required: true})}
                />
                {errors.firstName && <p>First Name is required</p>}
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input 
                    type="text" 
                    name="lastName"
                    ref={register({required: true})}
                />
                {errors.lastName && <p>Last Name is required</p>}

            </div>
            <div>
                <label htmlFor="email">E-mail</label>
                <input 
                    type="text" 
                    name="email" 
                    onChange={handleChangeEmail}
                    ref={register({required: true})}
                />
                {errors.email && errors.email.type === 'required' && <p>E-mail is required</p>}
                {props.error.email && <p>{props.error.email.message}</p>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                    type="text" 
                    name="password" 
                    ref={register({required: true, minLength: 7, validate: validatePassword})}
                />
                {errors.password && errors.password.type === 'required' && <p>Password is required</p>}
                {errors.password && errors.password.type === 'minLength' && <p>Password must be at least 7 characters</p>}
                {errors.password && errors.password.type === 'validate' && <p>Password can not contain "password"</p>}
            </div>
            <button>Create Account</button>
        </form>
    ) 
}


export default connect((state) => {
    return {
        user: state.user,
        error: state.error
    }
})(withRouter(CreateAccountPage))
