import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { color } from '../../utils/utils'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/Actions/AuthActions'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const dispatch= useDispatch();
  const navigate= useNavigate();

  const handleLogout=()=>{
    dispatch(logout(navigate))
  }

  return (
    <Box height={'4rem'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={'0rem 2rem'} borderBottom={'1px solid lightgrey'}>
        <Box width={'14rem'} display={'flex'} alignItems={'center'}>
            <Box display={'flex'} flexDirection={'column'} mr={'0.5rem'}>
            <Typography fontSize={'1.6rem'} mb={'-0.4rem'}>Doctor<span style={{color: color.primary}}>Now</span></Typography>
            <Typography fontSize={'10px'}>Dashboard Pannel</Typography>
            </Box>
            <Typography bgcolor={'white'} borderRadius={'12px'} p={'0.1rem 0.7rem'} fontSize={'12px'} border={'0.6px solid #282828'}>Admin</Typography>
        </Box>

        <Button variant='contained' onClick={handleLogout} sx={{borderRadius: '20px', width: '9rem'}} >Logout</Button>
    </Box>
  )
}

export default Navbar