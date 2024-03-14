import {createContext, useContext, useState} from 'react'
import axios from 'axios'
import {useQueryClient, useMutation, useQuery} from 'react-query'
import {useAuth} from '../../../modules/auth'

const NumberOfYearsCourseTypesContext = createContext()

export const NumberOfYearsCourseTypesContextProvider = ({children}) => {
  const queryClient = useQueryClient()
  const {auth} = useAuth()
  let config = {
    headers: {
      Authorization: `Bearer ${auth?.api_token}`,
    },
  }

  const numberOfCourseYearsTypesLists = useQuery({
    queryKey: ['getNumberOfCourseYearsTypes'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/courses/numberOfYears', config)
        return response.data
      } catch (error) {
        throw new Error('Error fetching student data: ' + error.message)
      }
    },
  })

  console.log(numberOfCourseYearsTypesLists)

  //console.log(studentsLists)
  const createNumberOfYearsCourseTypeMutation = useMutation({
    mutationFn: async (data) => {
      console.log(data)
      return axios
        .post('http://localhost:8080/api/courses/numberOfYears', data, config)
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
  const deleteNumberOfYearsCourseTypeMutation = useMutation({
    mutationFn: async (id) => {
      return axios
        .delete(`http://localhost:8080/api/courses/numberOfYears/${id}`, config)
        .then((res) => res.data)
    },
    onSuccess: () => {
      alert('Number of Course Years Types deleted successfully')
    },
    onSettled: async (_, error) => {
      if (error) {
        alert(error)
      } else {
        await queryClient.invalidateQueries({queryKey: ['getNumberOfCourseYearsTypes']})
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
    <NumberOfYearsCourseTypesContext.Provider
      value={{
        numberOfCourseYearsTypesLists,
        deleteNumberOfYearsCourseTypeMutation,
        createNumberOfYearsCourseTypeMutation,
      }}
    >
      {children}
    </NumberOfYearsCourseTypesContext.Provider>
  )
}

export const useNumberOfYearsCourseTypesContext = () => {
  const context = useContext(NumberOfYearsCourseTypesContext)
  if (!context) {
    throw new Error('useAdmissionContext must be used within an AdmissionContextProvider')
  }
  return context
}
