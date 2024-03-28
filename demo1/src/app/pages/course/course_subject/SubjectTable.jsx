import {Fragment, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import SubjectTableRead from './SubjectTableRead'
import AddSubjectForm from './AddSubjectForm'
import EditSubjectForm from './EditSubjectForm'

const SubjectTable = ({className}) => {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      subjectName: 'English',
      subjectCode: 'ENG-101',
      fullMarks: 100,
      passMarks: 40,
      addedBy: 'Admin',
      date: '28/03/2024',
    },
    {
      id: 2,
      subjectName: 'Math',
      subjectCode: 'MH-101',
      fullMarks: 100,
      passMarks: 40,
      addedBy: 'Admin',
      date: '28/03/2024',
    },
    {
      id: 3,
      subjectName: 'Math2',
      subjectCode: 'MH2-101',
      fullMarks: 100,
      passMarks: 40,
      addedBy: 'Admin',
      date: '28/03/2024',
    },
  ])

  const [newSubject, setNewSubject] = useState({
    subjectName: '',
    subjectCode: '',
    fullMarks: 0,
    passMarks: 0,
  })

  const [editSubjectId, setEditSubjectId] = useState(null)
  //console.log(editSubjectId)

  const [editSubject, setEditSubject] = useState({})
  //console.log(editSubject)

  const [AddSubjectFromToggle, setAddSubjectFormToggle] = useState(false)
  //console.log(newSubject)

  const handleAddNewSubject = (e) => {
    e.preventDefault()
    //console.log(newSubject)
    setSubjects([...subjects, {...newSubject, id: Date.now(), addedBy: 'Admin', date: Date.now()}])
    setAddSubjectFormToggle(false)
    setNewSubject({subjectName: '', subjectCode: '', fullMarks: 0, passMarks: 0})
  }

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter((subject) => subject.id !== id))
  }

  const handleEditSubject = (e) => {
    e.preventDefault()
    const newSubjects = [...subjects]
    const index = newSubjects.findIndex((subject) => subject.id === editSubjectId)
    newSubjects[index] = editSubject
    setSubjects(newSubjects)
    setEditSubjectId(null)
  }

  return (
    <>
      <div className='card'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <div
            className='card-toolbar'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            title='Click to add a user'
          >
            <button
              onClick={() => setAddSubjectFormToggle((prev) => !prev)}
              type='button'
              className='btn btn-sm btn-light-primary'
            >
              <KTIcon iconName='plus' className='fs-3' />
              Add Subjects
            </button>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            <form onSubmit={AddSubjectFromToggle ? handleAddNewSubject : handleEditSubject}>
              <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bold text-muted'>
                    <th className='w-25px'>
                      <div className='form-check form-check-sm form-check-custom form-check-solid'></div>
                    </th>
                    <th className='min-w-150px'>SR.</th>
                    <th className='min-w-150px'>Subject Name</th>
                    <th className='min-w-140px'>Subject Code</th>
                    <th className='min-w-120px'>Full Marks</th>
                    <th className='min-w-120px'>Pass Marks</th>
                    <th className='min-w-120px'>Added By</th>
                    <th className='min-w-120px'>Date</th>
                    <th className='min-w-100px text-end'>Actions</th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {subjects.map((subject, index) => (
                    <Fragment key={subject?.id}>
                      {editSubjectId === subject.id ? (
                        <EditSubjectForm
                          editSubject={editSubject}
                          setEditSubject={setEditSubject}
                          setEditSubjectId={setEditSubjectId}
                        />
                      ) : (
                        <SubjectTableRead
                          index={index}
                          subject={subject}
                          key={subject?.id}
                          setEditSubjectId={setEditSubjectId}
                          setEditSubject={setEditSubject}
                          handleDeleteSubject={handleDeleteSubject}
                        />
                      )}
                    </Fragment>
                  ))}
                  {AddSubjectFromToggle && (
                    <AddSubjectForm
                      setAddSubjectFormToggle={setAddSubjectFormToggle}
                      newSubject={newSubject}
                      setNewSubject={setNewSubject}
                    />
                  )}
                </tbody>
                {/* end::Table body */}
              </table>
            </form>
            {/* begin::Table */}
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
    </>
  )
}
export default SubjectTable
