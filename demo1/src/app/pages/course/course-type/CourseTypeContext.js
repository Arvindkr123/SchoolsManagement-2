import {createContext, useContext, useState} from 'react'
import axios from 'axios'
import {useQueryClient, useMutation, useQuery} from 'react-query'
import {useAuth} from '../../../modules/auth'

const CourseTypesContext = createContext()

export const CourseTypesContextProvider = ({children}) => {
  const queryClient = useQueryClient()
  const {auth} = useAuth()
  let config = {
    headers: {
      Authorization: `Bearer ${auth?.api_token}`,
    },
  }

  const courseTypesLists = useQuery({
    queryKey: ['getCourseTypes'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/courses/courseType', config)
        return response.data
      } catch (error) {
        throw new Error('Error fetching student data: ' + error.message)
      }
    },
  })

  console.log(courseTypesLists)

  //console.log(studentsLists)
  const createAddCourseTypeMutation = useMutation({
    mutationFn: async (data) => {
      console.log(data)
      return axios
        .post('http://localhost:8080/api/courses/courseType', data, config)
        .then((res) => res.data)
    },
    onMutate: () => {
      console.log('mutate')
    },

    onError: () => {
      console.log('error')
    },

    onSuccess: () => {
      alert('Add Course Type Successfully!')
      console.log('success')
    },

    onSettled: async (_, error) => {
      console.log('settled')
      if (error) {
        //console.log(error)
        alert('There is Course Type Error You have existed course type !')
      } else {
        await queryClient.invalidateQueries({queryKey: ['getCourseTypes']})
      }
    },
  })

  // Course Types
  const deleteCourseTypeMutation = useMutation({
    mutationFn: (id) => {
      return axios
        .delete(`http://localhost:8080/api/courses/courseType/${id}`, config)
        .then((res) => res.data)
    },
    onSuccess: () => {
      alert('Course Types deleted successfully')
    },
    onSettled: async (_, error) => {
      if (error) {
        alert(error)
      } else {
        await queryClient.invalidateQueries({queryKey: ['getCourseTypes']})
      }
    },
  })

  // update Course type
  const updateCourseTypeMutation = useMutation({
    mutationFn: async (updateData) => {
      //console.log(updateData)
      return axios
        .put(`http://localhost:8080/api/courses/courseType/${updateData.id}`, updateData, config) // Corrected order of arguments
        .then((res) => res.data)
    },
    onSettled: async (_, error) => {
      if (error) {
        alert('Error while updating student...', error)
      } else {
        await queryClient.invalidateQueries({queryKey: ['getCourseTypes']})
      }
    },
  })

  return (
    <CourseTypesContext.Provider
      value={{
        updateCourseTypeMutation,
        courseTypesLists,
        createAddCourseTypeMutation,
        deleteCourseTypeMutation,
      }}
    >
      {children}
    </CourseTypesContext.Provider>
  )
}

export const useCourseTypesContext = () => {
  const context = useContext(CourseTypesContext)
  if (!context) {
    throw new Error('useAdmissionContext must be used within an AdmissionContextProvider')
  }
  return context
}
