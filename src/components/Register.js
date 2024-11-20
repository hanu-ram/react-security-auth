import React, { useState } from 'react'
import { registerService } from '../service/authService';
import { useForm } from 'react-hook-form';
import { isEmail } from 'validator'

export default function Register ()
{

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ message, setMessage ] = useState( '' );
  const [ isSuccessful, setSuccessful ] = useState( false );
  const REQUIRED = 'This field is required';
  const handleRegister = ( data ) =>
  {
    setMessage( "" );
    setSuccessful( false );
    registerService( data.username, data.password, data.email )
      .then( response =>
      {
        setMessage( response.data.message );
        setSuccessful( true );
      }
      )
      .catch( err =>
      {
        const resMessage =
          ( err.response &&
            err.response.data &&
            err.response.data.message ) ||
          err.message ||
          err.toString();
        setMessage( resMessage );
        setSuccessful( false );
      } )
  }

  return (
    <div className="col-md-12">
      <div className="container w-25 mx-auto">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="rounded-circle w-25 align-self-center"
        />

        <form onSubmit={ handleSubmit( handleRegister ) }>
          { !isSuccessful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  { ...register( 'username', {
                    required: REQUIRED,
                    minLength: {
                      value: 3,
                      message: 'The username must be between 3 and 20 characters.'
                    },
                    maxLength: {
                      value: 20,
                      message: "The username must be between 3 and 20 characters."
                    }
                  } ) }
                />
                { errors.username && (
                  <div className="alert alert-danger" role="alert">
                    { errors.username.message }
                  </div>
                ) }
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  { ...register( 'email', {
                    required: REQUIRED,
                    validate: ( value ) => isEmail( value ) || 'This is not valid Email'
                  } ) }
                />
                { errors.email && (
                  <div className="alert alert-danger" role="alert">
                    { errors.email.message }
                  </div>
                ) }
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  { ...register( 'password', {
                    required: REQUIRED,
                    minLength: {
                      value: 6,
                      message: "The password must be between 6 and 40 characters."
                    },
                    maxLength: {
                      value: 40,
                      message: "The password must be between 6 and 40 characters."
                    }
                  } ) }
                />
                { errors.password && (
                  <div className="alert alert-danger" role="alert">
                    { errors.password.message }
                  </div>
                ) }
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          ) }

          { message && (
            <div className="form-group">
              <div
                className={ isSuccessful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                { message }
              </div>
            </div>
          ) }
        </form>
      </div>
    </div>
  )
}
