import React, { useEffect, useState } from 'react'
import UserService from '../service/userService';

export default function BoardModerator ()
{
  const [ content, setContent ] = useState( "" );

  useEffect( () =>
  {
    UserService.getModeratorBoard().then(
      ( response ) =>
      {
        setContent( response.data );
      },
      ( error ) =>
      {
        const _content =
          ( error.response &&
            error.response.data &&
            error.response.data.message ) ||
          error.message ||
          error.toString();

        setContent( _content );
      }
    );
  }, [] );

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{ content }</h3>
      </header>
    </div>
  );
}
