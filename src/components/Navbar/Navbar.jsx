import { Box, Button, IconButton, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { color } from '../../utils/utils'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/Actions/authActions'
import { useLocation, useNavigate } from 'react-router-dom'
import { CiMenuFries } from 'react-icons/ci'
import { RiAddBoxLine, RiHomeSmile2Line } from 'react-icons/ri'
import { SlCalender } from 'react-icons/sl'
import { LuUsers } from 'react-icons/lu'
import { RxCross2 } from 'react-icons/rx'
import './Navbar.css'
import { FaBullseye } from 'react-icons/fa'
import { FaHouseMedical } from 'react-icons/fa6'
const style1 = { width: '100%', height: '3rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'start', color: '#515151', pl: '2.6rem', cursor: 'pointer' }

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/')[1];

  const handleLogout = () => {
    dispatch(logout(navigate))
  }

  // ------screen sizes-------
  const isLargerThan600 = useMediaQuery('(min-width: 600px)');
  const isLargerThan350 = useMediaQuery('(min-width: 350px)');
  const isLargerThan500 = useMediaQuery('(min-width: 500px)');

  return (
    <Box height={'4rem'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={isLargerThan600 ? '0rem 2rem' : '0rem 1rem'} borderBottom={'1px solid lightgrey'}>
      <Box width={'14rem'} display={'flex'} alignItems={'center'}>
        <Box onClick={() => navigate('/')} display={'flex'} flexDirection={'column'} mr={isLargerThan600 ? '0.5rem' : '0.3rem'}>
          {/* <Typography fontSize={isLargerThan600?'1.6rem': '1.2rem'} mb={'-0.4rem'}>Doc<span style={{ color: color.primary }}>mate</span></Typography> */}
          <Box display={'flex'} alignItems={'center'} fontWeight={'600'} mb={'-4px'}>
            <FaHouseMedical style={{ fontSize: isLargerThan500?'1.6rem': '1.4rem', marginRight: '0.2rem', color: '#004B4B' }} />
            <Typography sx={{ color: color.primary }} fontSize={isLargerThan500?'1.6rem': '1.4rem'} fontWeight={600}>Docmate</Typography>
          </Box>
          <Typography fontSize={isLargerThan600 ? '10px' : '9px'} ml={'1.7rem'}>Dashboard Pannel</Typography>
        </Box>
        <Typography bgcolor={'white'} borderRadius={'12px'} p={isLargerThan600 ? '0.1rem 0.7rem' : '0.1rem 0.6rem'} fontSize={isLargerThan600 ? '12px' : '9px'} border={'0.6px solid #282828'}>Admin</Typography>
      </Box>

      {
        isLargerThan600 ?
          <Button variant='contained' onClick={handleLogout} sx={{ borderRadius: '20px', width: '9rem' }} >Logout</Button> :
          <IconButton onClick={() => setIsOpen(true)}><CiMenuFries /></IconButton>

      }

      {
        !isLargerThan600 &&
        <Box className={`menu ${isOpen ? 'open' : ''}`} bgcolor={color.background}>
          {/* -----top slider---- */}
          <Box display={'flex'} justifyContent={'space-between'} p={'0.5rem 1rem'}>
            {/* <Box width={'14rem'} display={'flex'} alignItems={'center'}>
              <Box onClick={() => { navigate('/'), setIsOpen(false) }} display={'flex'} flexDirection={'column'} mr={'0.3rem'}>
                <Typography fontSize={'1.2rem'} mb={'-0.4rem'}>Doc<span style={{ color: color.primary }}>Mate</span></Typography>
                <Typography fontSize={'9px'}>Dashboard Pannel</Typography>
              </Box>
              <Typography bgcolor={'white'} borderRadius={'12px'} p={'0.1rem 0.6rem'} fontSize={'9px'} border={'0.6px solid grey'}>Admin</Typography>
            </Box> */}
             <Box width={'14rem'} display={'flex'} alignItems={'center'}>
        <Box onClick={() => navigate('/')} display={'flex'} flexDirection={'column'} mr={isLargerThan600 ? '0.5rem' : '0.3rem'}>
          {/* <Typography fontSize={isLargerThan600?'1.6rem': '1.2rem'} mb={'-0.4rem'}>Doc<span style={{ color: color.primary }}>mate</span></Typography> */}
          <Box display={'flex'} alignItems={'center'} fontWeight={'600'} mb={'-4px'}>
            <FaHouseMedical style={{ fontSize: isLargerThan500?'1.6rem': '1.4rem', marginRight: '0.2rem', color: '#004B4B' }} />
            <Typography sx={{ color: color.primary }} fontSize={isLargerThan500?'1.6rem': '1.4rem'} fontWeight={600}>Docmate</Typography>
          </Box>
          <Typography fontSize={isLargerThan600 ? '10px' : '9px'} ml={'1.7rem'}>Dashboard Pannel</Typography>
        </Box>
        <Typography bgcolor={'white'} borderRadius={'12px'} p={isLargerThan600 ? '0.1rem 0.7rem' : '0.1rem 0.6rem'} fontSize={isLargerThan600 ? '12px' : '9px'} border={'0.6px solid #282828'}>Admin</Typography>
      </Box>


            <IconButton onClick={() => setIsOpen(false)}><RxCross2 /></IconButton>
          </Box>

          {/* ---navlinks---- */}
          <Box width={'100%'} pt={'1.4rem'} >
            <Box sx={style1} onClick={() => { navigate('/dashboard'), setIsOpen(false) }} bgcolor={path == 'dashboard' && '#F2F3FF'} borderLeft={path == 'dashboard' && `3px solid ${color.primary}`} ><RiHomeSmile2Line style={{ marginRight: '1rem', fontSize: '1.6rem' }} /><span>Dashboard</span></Box>
            <Box sx={style1} onClick={() => { navigate('/appointments'), setIsOpen(false) }} bgcolor={path == 'appointments' && '#F2F3FF'} borderLeft={path == 'appointments' && `3px solid ${color.primary}`}><SlCalender style={{ marginRight: '1rem', fontSize: '1.6rem' }} /><span>Appointments</span></Box>
            <Box sx={style1} onClick={() => { navigate('/adddoctor'), setIsOpen(false) }} bgcolor={path == 'adddoctor' && '#F2F3FF'} borderRight={path == 'adddoctor' && `3px solid ${color.primary}`}><RiAddBoxLine style={{ marginRight: '1rem', fontSize: '1.6rem' }} /><span>Add Doctor</span></Box>
            <Box sx={style1} onClick={() => { navigate('/alldoctors'), setIsOpen(false) }} bgcolor={path == 'alldoctors' && '#F2F3FF'} borderRight={path == 'alldoctors' && `3px solid ${color.primary}`}><LuUsers style={{ marginRight: '1rem', fontSize: '1.6rem' }} /><span>Doctors List</span></Box>
            <Button variant='contained' color='error' onClick={handleLogout} sx={{ borderRadius: '20px', width: isLargerThan350 ? '20rem' : '95%', mt: '1rem', ml: isLargerThan350 ? '1rem' : '0.5rem' }} >Logout</Button>
          </Box>
        </Box>
      }


    </Box>
  )
}

export default Navbar