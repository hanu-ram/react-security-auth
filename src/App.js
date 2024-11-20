import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { useEffect, useState } from 'react';
import UserService from './service/userService';
import { getCurrentUser, logout } from './service/authService';
import Home from './components/Home';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';

function App ()
{
  const [ showModeratorBoard, setShowModeratorBoard ] = useState( false );
  const [ showAdminBoard, setShowAdminBoard ] = useState( false );
  const [ currentUser, setCurrentUser ] = useState( undefined );
  useEffect( () =>
  {
    const user = getCurrentUser();

    if ( user )
    {
      setCurrentUser( user );
      setShowModeratorBoard( user.roles.includes( 'ROLE_MODERATOR' ) );
      setShowAdminBoard( user.roles.includes( 'ROLE_ADMIN' ) );
    }

  }, [] );

  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link to={ "/" } className='navbar-brand'>
          Hanu
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={ "/home" } className="nav-link">
              Home
            </Link>
          </li>

          { showModeratorBoard && (
            <li className="nav-item">
              <Link to={ "/mod" } className="nav-link">
                Moderator Board
              </Link>
            </li>
          ) }

          { showAdminBoard && (
            <li className="nav-item">
              <Link to={ "/admin" } className="nav-link">
                Admin Board
              </Link>
            </li>
          ) }

          { currentUser && (
            <li className="nav-item">
              <Link to={ "/user" } className="nav-link">
                User
              </Link>
            </li>
          ) }
        </div>
        { currentUser ? (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={ '/profile' } className='nav-link'>{ currentUser.username }</Link>
            </li>
            <li className='nav-item'>
              <a href='/login' className='nav-link' onClick={ logout }>LogOut</a>
            </li>
          </div>
        ) : (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to={ '/login' }>Login</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to={ '/register' }>Register</Link>
            </li>
          </div>
        ) }
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/home" element={ <Home /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/user" element={ <BoardUser /> } />
          <Route path="/mod" element={ <BoardModerator /> } />
          <Route path="/admin" element={ <BoardAdmin /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
