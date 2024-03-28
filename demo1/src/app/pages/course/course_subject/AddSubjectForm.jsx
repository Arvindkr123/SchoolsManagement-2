const AddSubjectForm = ({newSubject, setNewSubject}) => {
  return (
    <>
      <tr>
        <td>
          <div className='form-check form-check-sm form-check-custom form-check-solid'></div>
        </td>
        <td>
          <input
            type='text'
            value={newSubject.subjectName}
            onChange={(e) => setNewSubject({...newSubject, subjectName: e.target.value})}
            placeholder='Enter subject name...'
            className='form-control'
          />
        </td>
        <td>
          <input
            type='text'
            value={newSubject.subjectCode}
            onChange={(e) => setNewSubject({...newSubject, subjectCode: e.target.value})}
            placeholder='Enter subject code...'
            className='form-control'
          />
        </td>
        <td>
          <input
            type='number'
            min={1}
            max={1000}
            value={newSubject.fullMarks}
            onChange={(e) => setNewSubject({...newSubject, fullMarks: e.target.value})}
            placeholder='Enter full Marks...'
            className='form-control'
          />
        </td>
        <td>
          <input
            className='form-control'
            type='number'
            min={1}
            max={1000}
            value={newSubject.passMarks}
            onChange={(e) => setNewSubject({...newSubject, passMarks: e.target.value})}
            placeholder='Enter pass Marks...'
          />
        </td>

        <td>
          <button type='submit' className='btn btn-success'>
            Add
          </button>
        </td>
      </tr>
    </>
  )
}
export default AddSubjectForm
