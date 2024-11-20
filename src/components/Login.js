import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../service/authService';
import { useNavigate } from 'react-router-dom';

export default function Login ()
{
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ loading, setLoading ] = useState( false );
  const [ message, setMessage ] = useState( '' );
  const navigate = useNavigate();

  const onSubmit = data =>
  {
    setLoading( true );
    setMessage( '' );

    login( data.username, data.password ).then( () =>
    {
      navigate( "/profile" );
      window.location.reload();
    } )
      .catch( err =>
      {
        const errResponse = ( err.response && err.response.data && err.response.data.message ) || err.message || err.toString();
        setLoading( false );
        setMessage( errResponse );
      } );
  };

  return (
    <div className="container-sm w-25">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="rounded-circle w-25 align-self-center"
        />
        <form onSubmit={ handleSubmit( onSubmit ) }>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              { ...register( "username", { required: "This field is required" } ) }
            />
            { errors.username && (
              <div className="alert alert-danger" role="alert">
                { errors.username.message }
              </div>
            ) }
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              { ...register( "password", { required: "This field is required" } ) }
            />
            { errors.password && (
              <div className="alert alert-danger" role="alert">
                { errors.password.message }
              </div>
            ) }
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={ loading }>
              { loading && (
                <span className="spinner-border spinner-border-sm"></span>
              ) }
              <span>Login</span>
            </button>
          </div>

          { message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                { message }
              </div>
            </div>
          ) }
        </form>
      </div>
    </div>
  );
}
