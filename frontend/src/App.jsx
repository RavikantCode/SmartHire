
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Companies from './components/Companies'
import Profile from './components/Profile'
import Details from './components/Details'
import RegisterCompany from './components/recruiter/RegisterCompany'
import CompanyPage from './components/recruiter/CompanyPage'
import CompanySetUp from './components/recruiter/CompanySetUp'
import Managejobs from './components/recruiter/Managejobs'
import PostJob from './components/recruiter/PostJob'
import Applicants from './components/recruiter/Applicants'
import ProtectedRoute from './components/recruiter/ProtectedRoute'
import SavedJobs from './components/SavedJobs'
import TpoDash from './components/tpo/TpoDash'
import TpoJobs from './components/tpo/TpoJobs'
import TpoCompany from './components/tpo/TpoCompany'
// import TestComponent from './components/TestComponent'


const appRouter = createBrowserRouter([
  {
  path:'/',
  element:<Home/>
},{
  path:'/login',
  element:<Login/>
},{
  path:'/signup',
  element:<Signup></Signup>
},{
  path:'/jobs',
  element:<Jobs></Jobs>
},
{
  path:'/browse',
  element:<Browse></Browse>
},
{
  path:"/description/:id",
  element:<Details></Details>
},
{
  path:'/company',
  element:<Companies/>
},{
  path:'/profile',
  element:<Profile/>
},{
  path:'/SavedJobs',
  element:<SavedJobs/>
},{
  //Tpo part
  path:'/tpo/',
  element:<TpoDash/>
},{
  path:'/TpoJobs',
  element:<TpoJobs/>
},{
  path:'/TpoCompany',
  element:<TpoCompany/>
},{
  //Recruiter part
  path:'/recruiter/',
  element:<RegisterCompany/>
},
{
  path:'/ManageJobs',
  element:<Managejobs/>
},{
  path:'/company/create',
  element:<CompanyPage/>
},
// {
//   path:'/company/:id',
//   element:<CompanySetUp/>
// }
,{
  path:'/Recruiter/jobs/post',
  element:<PostJob/>
},{
  path:'/ViewApplications/:id/applicants',
  element:<Applicants/>
}
])

function App() {

  return (
    <>
     <RouterProvider router = {appRouter}></RouterProvider>
     {/* <TestComponent/> */}
    </>
  )
}

export default App
