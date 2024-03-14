import {createContext, useContext, useState} from 'react'
import axios from 'axios'
import {useQueryClient, useMutation, useQuery} from 'react-query'
import {useAuth} from './Auth'

const AdmissionContext = createContext()

export const AdmissionContextProvider = ({children}) => {
  const [studentId, setStudentId] = useState('')
  const queryClient = useQueryClient()
  const {auth} = useAuth()
  const [admissionFormData, setAdmissionFormData] = useState([])
  let config = {
    headers: {
      Authorization: `Bearer ${auth?.api_token}`,
    },
  }

  const studentsLists = useQuery({
    queryKey: ['getStudents'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/students', config)
        return response.data
      } catch (error) {
        throw new Error('Error fetching student data: ' + error.message)
      }
    },
  })

  //console.log(studentsLists)
  const createStudentMutation = useMutation({
    mutationFn: async (newAdmission) => {
      console.log(newAdmission)
      return axios
        .post('http://localhost:8080/api/addmission_form', newAdmission, config)
        .then((res) => res.data)
    },
    onMutate: () => {
      console.log('mutate')
    },

    onError: () => {
      console.log('error')
    },

    onSuccess: () => {
      alert('Addmission done success 😊')
      console.log('success')
    },

    onSettled: async (_, error) => {
      console.log('settled')
      if (error) {
        console.log(error)
        alert(
          'Something went wrong I think with your email admission done please try another email address then it will work 😊😊'
        )
      } else {
        await queryClient.invalidateQueries({queryKey: ['getStudents']})
      }
    },
  })

  // delete student
  const deleteStudentMutation = useMutation({
    mutationFn: (id) => {
      return axios
        .delete(`http://localhost:8080/api/students/${id}`, config)
        .then((res) => res.data)
    },
    onSuccess: () => {
      alert('Student deleted successfully')
    },
    onSettled: async (_, error) => {
      if (error) {
        alert(error)
      } else {
        await queryClient.invalidateQueries({queryKey: ['getStudents']})
      }
    },
  })

  // update Student
  const updateStudentMutation = useMutation({
    mutationFn: async (updateStudent) => {
      // console.log(id)
      return axios
        .put(`http://localhost:8080/api/students/${studentId}`, updateStudent, config) // Corrected order of arguments
        .then((res) => res.data)
    },
    onSettled: async (_, error) => {
      if (error) {
        alert('Error while updating student...', error)
      } else {
        await queryClient.invalidateQueries({queryKey: ['getStudents']})
      }
    },
  })

  return (
    <AdmissionContext.Provider
      value={{
        admissionFormData,
        setAdmissionFormData,
        createStudentMutation,
        studentsLists,
        deleteStudentMutation,
        updateStudentMutation,
        setStudentId,
      }}
    >
      {children}
    </AdmissionContext.Provider>
  )
}

export const useAdmissionContext = () => {
  const context = useContext(AdmissionContext)
  if (!context) {
    throw new Error('useAdmissionContext must be used within an AdmissionContextProvider')
  }
  return context
}
