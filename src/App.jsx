import {lazy} from 'react'
import { Box, useMediaQuery } from '@mui/material'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AddDoctor from './pages/AddDoctor/AddDoctor'
import Login from './pages/Auth/Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { adminLoginSuccess, logout } from './Redux/Actions/authActions'
import AllDoctors from './pages/AllDoctors/AllDoctors'
import Appointments from './pages/Appointments/Appointments'
import { color } from './utils/utils'
import Dashboard from './pages/Dashboard/Dashboard'
// const Dashboard= lazy(()=> import('./pages/Dashboard/Dashboard'))

function App() {
  // let token = localStorage.getItem('aToken')
  const navigate = useNavigate();
  const dispatch= useDispatch()
  const {isAuthenticated, userData}= useSelector(state=> state.auth)
  
  
  useEffect(()=>{
    const token= localStorage.getItem('aToken');
    if(token){
      try {
        const userData= jwtDecode(token);
        dispatch(adminLoginSuccess(token, userData))
        // navigate('/')
        } catch (error) {
          console.log(error)
          dispatch(logout())
          navigate('/auth')
        }
    }else{
      navigate('/auth')
    }
   
  }, [])

  const isLargerThan600 = useMediaQuery('(min-width: 600px)');


  return (
    <Box>
      {
       isAuthenticated && userData ?
          
            (<><Navbar />

            <Box display={'flex'} bgcolor={color.background}>
              {
                isLargerThan600 && <Sidebar />
              }
              
              <Routes>
              <Route path={'/'} element={<Dashboard />} />
                <Route path={'/dashboard'} element={<Dashboard />} />
                <Route path={'/adddoctor'} element={<AddDoctor />} />
                <Route path={'/alldoctors'} element={<AllDoctors />} />
                <Route path={'/appointments'} element={<Appointments />} />
              </Routes>
            </Box></>)
           :
          <Routes>
            <Route path={'/auth'} element={<Login />} />
          </Routes>
      }


    </Box>
  )
}

export default App
