// import { Typography } from '@mui/joy'
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { color } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { adminLoginSuccess, login } from '../../Redux/Actions/AuthActions'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch= useDispatch()
  const navigate= useNavigate();
  const data= useSelector(state=> state.auth)

  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('')

  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(login(email, password, navigate))
  }

  

  // useEffect(()=>{
  //   let token= localStorage.getItem('aToken');
  //   let userData= jwtDecode(token)
  //   dispatch(adminLoginSuccess(token, userData))
  // }, [])

 

  
  return (
    <Box height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
    <Box component={'form'} onSubmit={handleSubmit} width={'26%'} height={'20rem'} p={'1.5rem'} borderRadius={'9px'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'start'} boxShadow={'rgba(0, 0, 0, 0.1) 0px 4px 12px'}  border={`1px solid ${color.border}`}>
        <Typography fontSize={'1.5rem'} fontWeight={600} ml={'auto'} mr={'auto'}><span style={{color: color.primary}}>Admin</span> Login</Typography>
       
        <TextField label="Email"  onChange={(e)=> setEmail(e.target.value)} id="standard-basic" sx={{width: '100%'}}  variant="standard" />
        <TextField label="Password" onChange={(e)=> setPassword(e.target.value)} id="standard-basic" sx={{width: '100%'}} variant="standard" />
        <Button variant='contained' type='submit' sx={{width: '100%', bgcolor: color.primary, p: '0.5rem 0rem' }}>Login</Button>

        <Typography>Doctor Login?  <span style={{color: color.primary, borderBottom: `1px solid ${color.primary}`, cursor: 'pointer'}}>Click here</span></Typography>
  
    </Box>
    </Box>
  )
}

export default Login