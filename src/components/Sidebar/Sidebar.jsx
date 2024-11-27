import { Box, Button } from '@mui/material'
import React from 'react'
import { RiAddBoxLine, RiHomeSmile2Line } from 'react-icons/ri'
import { NavLink, useLocation } from 'react-router-dom'
import { color } from '../../utils/utils'
import { SlCalender } from 'react-icons/sl'
import { LuUsers } from 'react-icons/lu'

const style1 = { width: '100%', height: '3rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'start', color: '#515151', pl: '2.6rem' }

const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[1];
    return (
        <Box width={'19%'} height={'91vh'} borderRight={'1px solid lightgrey'}>
        <Box width={'100%'} pt={'1.4rem'}>
            
            <NavLink to={'/dashboard'} style={{textDecoration: 'none'}}><Box sx={style1} bgcolor={path == 'dashboard' && '#F2F3FF'} borderRight={path == 'dashboard' && `3px solid ${color.primary}`}><RiHomeSmile2Line style={{ marginRight: '1rem', fontSize: '1.6rem' }} /><span>Dashboard</span></Box></NavLink>
            <NavLink to={'/appointments'} style={{textDecoration: 'none'}}><Box sx={style1} bgcolor={path == 'appointments' && '#F2F3FF'}  borderRight={path == 'appointments' && `3px solid ${color.primary}`}><SlCalender style={{ marginRight: '1rem', fontSize: '1.6rem' }} />Appointments</Box></NavLink>
            <NavLink to={'/adddoctor'} style={{textDecoration: 'none'}}><Box sx={style1} bgcolor={path == 'adddoctor' && '#F2F3FF'}  borderRight={path == 'adddoctor' && `3px solid ${color.primary}`}><RiAddBoxLine style={{ marginRight: '1rem', fontSize: '1.6rem' }} />Add Doctor</Box></NavLink>
            <NavLink to={'/alldoctors'} style={{textDecoration: 'none'}}><Box sx={style1} bgcolor={path == 'alldoctors' && '#F2F3FF'} borderRight={path == 'alldoctors' && `3px solid ${color.primary}`}><LuUsers style={{ marginRight: '1rem', fontSize: '1.6rem' }} />Doctors List</Box></NavLink>
        </Box>
        </Box>
    )
}

export default Sidebar