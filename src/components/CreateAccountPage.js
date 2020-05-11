import React, { useEffect } from 'react'
import createUser from '../services/users/createUser'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { removeError } from '../actions/errorActions'
import styles from '../styles/components/Forms.module.scss'

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
        <div className={styles.container}>
            <h2 className={styles.pageTitle}>Create Account</h2>        
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputContainer}>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        className={styles.input}
                        ref={register({required: true})}
                    />
                    {errors.firstName && <p>First Name is required</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text" 
                        name="lastName"
                        className={styles.input}
                        ref={register({required: true})}
                    />
                    {errors.lastName && <p>Last Name is required</p>}

                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="email">E-mail</label>
                    <input 
                        type="text" 
                        name="email" 
                        onChange={handleChangeEmail}
                        className={styles.input}
                        ref={register({required: true})}
                    />
                    {errors.email && errors.email.type === 'required' && <p>E-mail is required</p>}
                    {props.error.email && <p>{props.error.email.message}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        className={styles.input}
                        ref={register({required: true, minLength: 7, validate: validatePassword})}
                    />
                    {errors.password && errors.password.type === 'required' && <p>Password is required</p>}
                    {errors.password && errors.password.type === 'minLength' && <p>Password must be at least 7 characters</p>}
                    {errors.password && errors.password.type === 'validate' && <p>Password can not contain "password"</p>}
                </div>
                <button className={styles.centeredBtn}>Create Account</button>
            </form>
        </div>
    ) 
}


export default connect((state) => {
    return {
        user: state.user,
        error: state.error
    }
})(withRouter(CreateAccountPage))
