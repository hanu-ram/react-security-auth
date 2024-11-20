import axios from "axios";

const axiosApi = axios.create( {
  baseURL: "http://localhost:8080/api/auth"
} )

const registerService = ( username, password, email ) =>
{
  return axiosApi.post( "/signup", {
    username,
    password,
    email
  }
  );
}

// const login = ( username, password ) =>
// {
//   return axiosApi.post( "/login", {
//     username,
//     password
//   }
//   ).then( response =>
//   {
//     if ( response.data.accessToken )
//     {
//       localStorage.setItem( "user", JSON.stringify( response.data.accessToken ) );
//     }
//     return response.data;
//   } );
// }
const login = async ( username, password ) =>
{
  const response = await axiosApi.post( '/signin', {
    username,
    password
  } );
  if ( response.data.accessToken )
  {
    localStorage.setItem( "user", JSON.stringify( response.data ) );
  }
  return response.data;
}

const logout = () =>
{
  localStorage.removeItem( "user" );
}

const getCurrentUser = () =>
{
  return JSON.parse( localStorage.getItem( "user" ) );
};

export { login, logout, registerService, getCurrentUser }