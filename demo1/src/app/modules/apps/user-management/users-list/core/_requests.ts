import axios, { AxiosResponse } from 'axios'
import { ID, Response } from '../../../../../../_metronic/helpers'
import { User, UsersQueryResponse } from './_models'


const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/user`
// const GET_USERS_URL = `${API_URL}/users/query`
const GET_USERS_URL = ``

const getUsers = async (query: string): Promise<UsersQueryResponse> => {
  // console.log(query); 

  return axios
    .get(`http://localhost:8080/api/users?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = async (id: ID): Promise<User | undefined> => {
  // console.log(id);

  return axios
    .get(`http://localhost:8080/api/users/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = async (user: User): Promise<User | undefined> => {
  return axios
    .post(`http://localhost:8080/api/users`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateUser = async (user: User): Promise<User | undefined> => {
  //console.log(user);
  return axios
    .post(`http://localhost:8080/api/users/${user.id}`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = async (userId: ID): Promise<void> => {
  return axios.delete(`http://localhost:8080/api/users/${userId}`).then(() => { })
}

const deleteSelectedUsers = async (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => { })
}

export { getUsers, deleteUser, deleteSelectedUsers, getUserById, createUser, updateUser }
