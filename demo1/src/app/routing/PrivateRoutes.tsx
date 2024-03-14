import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import AddStudent from '../pages/AddStudent'
import AddUser from '../pages/AddUser'
import UserList from '../pages/UserList'
import AddCourseEditAndAdd from '../pages/course/course-type/AddCourseEditAndAdd'
import AddCourseTypeEdit from '../pages/course/course-type/AddCourseTypeEdit'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const AddMissionForm = lazy(() => import('../pages/AddMissionForm'))
  const MyPage = lazy(() => import('../pages/MyPage'))
  const StudentsList = lazy(() => import('../pages/StudentsList'))
  const StudentProfile = lazy(() => import('../pages/student-profile/StudentProfile'))
  const CourseTypes = lazy(() => import('../pages/course/course-type'))
  const CourseCategory = lazy(() => import('../pages/course/category'))
  const NumberOfYearsCourse = lazy(() => import('../pages/course/Number Of Years'))
  const AddCourse = lazy(() => import('../pages/course'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />

        {/* ====================Start Course Here ==================== */}
        <Route
          path='/course/course-type'
          element={
            <SuspensedView>
              <CourseTypes className='' />
            </SuspensedView>
          }
        />
        <Route
          path='/course/course-type/editAdd/:id'
          element={
            <SuspensedView>
              <AddCourseEditAndAdd />
            </SuspensedView>
          }
        />
        <Route
          path='/course/course-type/edit/:id'
          element={
            <SuspensedView>
              <AddCourseTypeEdit />
            </SuspensedView>
          }
        />

        <Route
          path='/course/category'
          element={
            <SuspensedView>
              <CourseCategory />
            </SuspensedView>
          }
        />
        <Route
          path='/course/no_of_years_course'
          element={
            <SuspensedView>
              <NumberOfYearsCourse className='' />
            </SuspensedView>
          }
        />
        <Route
          path='/course/addCourse'
          element={
            <SuspensedView>
              <AddCourse />
            </SuspensedView>
          }
        />

        {/* ====================End Course Here ==================== */}

        <Route
          path='/my-page'
          element={
            <SuspensedView>
              <MyPage />
            </SuspensedView>
          }
        />
        <Route
          path='/addmission-form'
          element={
            <SuspensedView>
              <AddMissionForm />
            </SuspensedView>
          }
        />
        <Route
          path='/students'
          element={
            <SuspensedView>
              <StudentsList className='' />
            </SuspensedView>
          }
        />
        <Route
          path='/student/:id'
          element={
            <SuspensedView>
              <StudentProfile />
            </SuspensedView>
          }
        />

        {/* <Route path='/add-user' element={<AddUser />} />
        <Route path='/user-list' element={<UserList />} /> */}
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
