import axios from "axios";
import authHeader from "./authHeader";

const axiosApi = axios.create( {
  baseURL: 'http://localhost:8080/api/test',
  headers: authHeader()
} );

const getPublicContent = () => axiosApi.get( '/all' );
const getUserBoard = () => axiosApi.get( '/user' );
const getModeratorBoard = () => axiosApi.get( '/mod' );
const getAdminBoard = () => axiosApi.get( '/admin' );

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;