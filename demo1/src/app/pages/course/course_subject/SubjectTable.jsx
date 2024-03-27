import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'

const SubjectTable = () => {
  return (
    <>
      <div className='table-responsive'>
        {/* begin::Table */}
        <table className='table align-middle gs-0 gy-3'>
          {/* begin::Table head */}
          <thead>
            <tr>
              <th className='p-0 w-50px'></th>
              <th className='p-0 min-w-150px'></th>
              <th className='p-0 min-w-140px'></th>
              <th className='p-0 min-w-120px'></th>
            </tr>
          </thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody>
            <tr>
              <td>
                <div className='symbol symbol-50px me-2'>
                  <span className='symbol-label'>
                    <img
                      src={toAbsoluteUrl('/media/svg/avatars/001-boy.svg')}
                      className='h-75 align-self-end'
                      alt=''
                    />
                  </span>
                </div>
              </td>
              <td>
                <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                  Brad Simmons
                </a>
                <span className='text-muted fw-semibold d-block'>Successful Fellas</span>
              </td>
              <td>
                <span className='text-muted fw-semibold d-block fs-7'>Paid</span>
                <span className='text-dark fw-bold d-block fs-5'>$200,500</span>
              </td>
              <td className='text-end'>
                <span className='text-primary fs-7 fw-bold'>+28%</span>
              </td>
              <td className='text-end'>
                <a href='#' className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'>
                  <KTIcon iconName='arrow-right' className='fs-2' />
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <div className='symbol symbol-50px me-2'>
                  <span className='symbol-label'>
                    <img
                      src={toAbsoluteUrl('/media/svg/avatars/018-girl-9.svg')}
                      className='h-75 align-self-end'
                      alt=''
                    />
                  </span>
                </div>
              </td>
              <td>
                <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                  Jessie Clarcson
                </a>
                <span className='text-muted fw-semibold d-block'>HTML, CSS Coding</span>
              </td>
              <td>
                <span className='text-muted fw-semibold d-block fs-7'>Paid</span>
                <span className='text-dark fw-bold d-block fs-5'>$1,200,000</span>
              </td>
              <td className='text-end'>
                <span className='text-warning fs-7 fw-bold'>+52%</span>
              </td>
              <td className='text-end'>
                <a href='#' className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'>
                  <KTIcon iconName='arrow-right' className='fs-2' />
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <div className='symbol symbol-50px me-2'>
                  <span className='symbol-label'>
                    <img
                      src={toAbsoluteUrl('/media/svg/avatars/047-girl-25.svg')}
                      className='h-75 align-self-end'
                      alt=''
                    />
                  </span>
                </div>
              </td>
              <td>
                <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                  Jessie Clarcson
                </a>
                <span className='text-muted fw-semibold d-block'>PHP, Laravel, VueJS</span>
              </td>
              <td>
                <span className='text-muted fw-semibold d-block fs-7'>Paid</span>
                <span className='text-dark fw-bold d-block fs-5'>$1,200,000</span>
              </td>
              <td className='text-end'>
                <span className='text-danger fs-7 fw-bold'>+52%</span>
              </td>
              <td className='text-end'>
                <a href='#' className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'>
                  <KTIcon iconName='arrow-right' className='fs-2' />
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <div className='symbol symbol-50px me-2'>
                  <span className='symbol-label'>
                    <img
                      src={toAbsoluteUrl('/media/svg/avatars/014-girl-7.svg')}
                      className='h-75 align-self-end'
                      alt=''
                    />
                  </span>
                </div>
              </td>
              <td>
                <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                  Natali Trump
                </a>
                <span className='text-muted fw-semibold d-block'>UI/UX Designer</span>
              </td>
              <td>
                <span className='text-muted fw-semibold d-block fs-7'>Paid</span>
                <span className='text-dark fw-bold d-block fs-5'>$3,400,000</span>
              </td>
              <td className='text-end'>
                <span className='text-success fs-7 fw-bold'>-34%</span>
              </td>
              <td className='text-end'>
                <a href='#' className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'>
                  <KTIcon iconName='arrow-right' className='fs-2' />
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <div className='symbol symbol-50px me-2'>
                  <span className='symbol-label'>
                    <img
                      src={toAbsoluteUrl('/media/svg/avatars/043-boy-18.svg')}
                      className='h-75 align-self-end'
                      alt=''
                    />
                  </span>
                </div>
              </td>
              <td>
                <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                  Kevin Leonard
                </a>
                <span className='text-muted fw-semibold d-block'>Art Director</span>
              </td>
              <td>
                <span className='text-muted fw-semibold d-block fs-7'>Paid</span>
                <span className='text-dark fw-bold d-block fs-5'>$35,600,000</span>
              </td>
              <td className='text-end'>
                <span className='text-info fs-7 fw-bold'>+230%</span>
              </td>
              <td className='text-end'>
                <a href='#' className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'>
                  <KTIcon iconName='arrow-right' className='fs-2' />
                </a>
              </td>
            </tr>
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
    </>
  )
}
export default SubjectTable
