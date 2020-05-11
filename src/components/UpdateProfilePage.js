import React from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { removeError } from '../actions/errorActions'
import updateUser from '../services/users/updateUser'
import UploadImage from './UploadImage'
// import styles from '../styles/components/UpdateProfilePage.module.scss'
import styles from '../styles/components/Forms.module.scss'


const UpdateProfilePage = (props) => {
    const {user, error, dispatch} = props
    const {errors, register, handleSubmit} = useForm({
        defaultValues: {
            firstName: user.info.firstName,
            lastName: user.info.lastName,
            email: user.info.email
        }
    })
    const onSubmit = (data) => {
        updateUser(data, dispatch)
    }
    const handleEmailChange = e => {
        if (error.email && error.email !== e.target.value) {
            dispatch(removeError())
        }
    }

    return (
        <div className={styles.updateContainer}>
            <h1>Update Profile</h1>
            <h3>Update Your Account Information</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputContainer}>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text" 
                        name="firstName"
                        className={styles.input} 
                        ref={register({required: true})}
                    />
                </div>
                {errors.firstName && <p>First name is required</p>}
                <div className={styles.inputContainer}>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text" 
                        name="lastName"
                        className={styles.input}
                        ref={register({required: true})}
                    />
                </div>
                {errors.lastName && <p>Last name is required</p>}

                <div className={styles.inputContainer}>
                    <label htmlFor="email">E-mail</label>
                    <input 
                        type="text" 
                        name="email" 
                        className={styles.input}
                        ref={register({required: true})}
                        onChange={handleEmailChange}
                    />
                    {errors.email && <p>Email is required</p>}
                    {props.error.email && <p>{props.error.email.message}</p>}
                </div>
                <button className={styles.centeredBtn}>Update Profile</button>
            </form>
            <h3>Update Your Profile Picture</h3>
            <UploadImage />
        </div>
    )
}

export default connect(state => ({
    user: state.user,
    error: state.error
}))(UpdateProfilePage)
