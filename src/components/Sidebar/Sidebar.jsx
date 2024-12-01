import { Box, Button, useMediaQuery } from '@mui/material'
import React from 'react'
import { RiAddBoxLine, RiHomeSmile2Line } from 'react-icons/ri'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { color } from '../../utils/utils'
import { SlCalender } from 'react-icons/sl'
import { LuUsers } from 'react-icons/lu'

const style1 = { width: '100%', height: '3rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'start', color: '#515151', pl: '2.6rem', cursor: 'pointer' }

const Sidebar = () => {
    const navigate= useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/')[1];

    const isLargerThan1050= useMediaQuery('(min-width: 1050px)')
    return (
        <Box width={'auto'} height={'91vh'} borderRight={'1px solid lightgrey'}>
        <Box width={'100%'} pt={'1.4rem'}>
        <Box sx={style1} onClick={()=> navigate('/dashboard')} bgcolor={path == 'dashboard' && '#F2F3FF'} borderRight={path == 'dashboard' && `3px solid ${color.primary}`} ><RiHomeSmile2Line style={{ marginRight: '1rem', fontSize: '1.6rem' }} />{isLargerThan1050 && <span>Dashboard</span>}</Box>
        <Box sx={style1} onClick={()=> navigate('/appointments')} bgcolor={path == 'appointments' && '#F2F3FF'}  borderRight={path == 'appointments' && `3px solid ${color.primary}`}><SlCalender style={{ marginRight: '1rem', fontSize: '1.6rem' }} />{isLargerThan1050 && <span>Appointments</span>}</Box>
        <Box sx={style1} onClick={()=> navigate('/adddoctor')} bgcolor={path == 'adddoctor' && '#F2F3FF'}  borderRight={path == 'adddoctor' && `3px solid ${color.primary}`}><RiAddBoxLine style={{ marginRight: '1rem', fontSize: '1.6rem' }} />{isLargerThan1050 && <span>Add Doctor</span>}</Box>
        <Box sx={style1} onClick={()=> navigate('/alldoctors')} bgcolor={path == 'alldoctors' && '#F2F3FF'} borderRight={path == 'alldoctors' && `3px solid ${color.primary}`}><LuUsers style={{ marginRight: '1rem', fontSize: '1.6rem' }} />{isLargerThan1050 && <span>Doctors List</span>}</Box>
        </Box>
        </Box>
    )
}

export default Sidebar