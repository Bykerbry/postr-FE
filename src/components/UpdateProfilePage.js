import React from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { removeError } from '../actions/errorActions'
import updateUser from '../services/users/updateUser'


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
        <div>
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        ref={register({required: true})}
                    />
                </div>
                {errors.firstName && <p>First name is required</p>}
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text" 
                        name="lastName"
                        ref={register({required: true})}
                    />
                </div>
                {errors.lastName && <p>Last name is required</p>}

                <div>
                    <label htmlFor="email">E-mail</label>
                    <input 
                        type="text" 
                        name="email" 
                        ref={register({required: true})}
                        onChange={handleEmailChange}
                    />
                    {errors.email && <p>Email is required</p>}
                    {props.error.email && <p>{props.error.email.message}</p>}
                </div>
                <button>Update Profile</button>
            </form>
        </div>
    )
}

export default connect(state => ({
    user: state.user,
    error: state.error
}))(UpdateProfilePage)
