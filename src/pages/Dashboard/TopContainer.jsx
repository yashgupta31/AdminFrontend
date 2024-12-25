import { Box, Typography, useMediaQuery } from '@mui/material';
import { color } from 'chart.js/helpers';
import React, { useEffect, useState } from 'react'
import doctorVector from '../../assets/Vector/doctor.png'
import patientVector from '../../assets/Vector/patient.png'
import availableDoctorVector from '../../assets/Vector/available-doctor.png'
import { useSelector } from 'react-redux';
import axios from 'axios';
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL;


const TopContainer = () => {
    const {appointments, todaysAppointments}= useSelector(state=> state.appointments);
    const [doctorArr, setDoctorArr]= useState([]);
    
    const currentDate= new Date().toLocaleDateString('en-CA');

    useEffect(()=>{
        // dispatch(getAppointments())
        // dispatch(getTodaysAppointments())

            async function fetchDoctors(){
             const response= await axios.get(`${BACKEND_URL}/doctor/get-available-doctors`);
             setDoctorArr(response.data.data)
             }
             fetchDoctors()
    }, [])

    const isLargerThan1000 = useMediaQuery('(min-width: 1000px)');
    const isLargerThan900 = useMediaQuery('(min-width: 900px)');
    const isLargerThan850 = useMediaQuery('(min-width: 850px)');
    const isLargerThan650 = useMediaQuery('(min-width: 650px)');
    const isLargerThan360 = useMediaQuery('(min-width: 360px)');
    return (
        <Box display={'flex'} flexWrap={'wrap'} gap={'0.5rem'} mb={'2rem'}>
            <Box width={isLargerThan900 ? '32%' : isLargerThan650 ? '48%' : '100%'} bgcolor={'white'} height={isLargerThan900 ? '8rem' : '7rem'} p={'1rem'} display={'flex'} alignItems={'center'} borderRadius={'8px'} boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}>
                <Box bgcolor={color.background} height={isLargerThan900 ? '6rem' : '4rem'} width={isLargerThan900 ? '6rem' : '4rem'} borderRadius={'50%'} overflow={'hidden'} display={'flex'} justifyContent={'center'} alignItems={'center'} p={'0.5rem'}>
                    <img src={doctorVector} alt="" style={{ height: '80%' }} />
                </Box>
                <Box width={'65%'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} pl={'1rem'}>
                    <Typography fontSize={'0.9rem'}>Total Patients</Typography>
                    <Typography fontSize={'1.4rem'}>{appointments.length}</Typography>
                    <Typography fontSize={'0.9rem'}>Till Today</Typography>
                </Box>
            </Box>
            <Box width={isLargerThan900 ? '32%' : isLargerThan650 ? '48%' : '100%'} bgcolor={'white'} height={isLargerThan900 ? '8rem' : '7rem'} p={'1rem'} display={'flex'} alignItems={'center'} borderRadius={'8px'} boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}>
                <Box bgcolor={color.background} height={isLargerThan900 ? '6rem' : '4rem'} width={isLargerThan900 ? '6rem' : '4rem'} borderRadius={'50%'} overflow={'hidden'} display={'flex'} justifyContent={'center'} alignItems={'end'}>
                    <img src={patientVector} style={{ height: '90%' }} alt="" />
                </Box>
                <Box width={'65%'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} pl={'1rem'}>
                    <Typography fontSize={'0.9rem'}>Today's Patients</Typography>
                    <Typography fontSize={'1.4rem'}>{appointments.filter(elem => elem.date == currentDate).length}</Typography>
                    <Typography fontSize={'0.9rem'}>{currentDate}</Typography>
                </Box>
            </Box>
            <Box width={isLargerThan900 ? '32%' : isLargerThan650 ? '48%' : '100%'} bgcolor={'white'} height={isLargerThan900 ? '8rem' : '7rem'} p={'1rem'} display={'flex'} alignItems={'center'} borderRadius={'8px'} boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}>
                <Box bgcolor={color.background} height={isLargerThan900 ? '6rem' : '4rem'} width={isLargerThan900 ? '6rem' : '4rem'} borderRadius={'50%'} overflow={'hidden'} display={'flex'} justifyContent={'center'} alignItems={'end'}>
                    <img src={availableDoctorVector} style={{ height: '90%' }} alt="" />
                </Box>
                <Box width={'65%'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} pl={'1rem'}>
                    <Typography fontSize={'0.9rem'}>Available Doctors</Typography>
                    <Typography fontSize={'1.4rem'}>{doctorArr.length}</Typography>
                    <Typography fontSize={'0.9rem'}>For Today</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default TopContainer