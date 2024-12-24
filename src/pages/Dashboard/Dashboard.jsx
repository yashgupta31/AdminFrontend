import { Box, Button, MenuItem, Select, Table, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material'
// import { PieChart } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'
import PieChartComponent from './PieChartComponent'
import { IoIosCall } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { getAppointments, getTodaysAppointments } from '../../Redux/Actions/appointmentActions'
import axios from 'axios'
import { FaUser } from 'react-icons/fa'
import { color } from '../../utils/utils'
import doctorVector from '../../assets/Vector/doctor.png'
import patientVector from '../../assets/Vector/patient.png'
import availableDoctorVector from '../../assets/Vector/available-doctor.png'

const BACKEND_URL= import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
    const dispatch= useDispatch()
    const {appointments, todaysAppointments}= useSelector(state=> state.appointments);
    const currentDate= new Date().toLocaleDateString('en-CA');
    const [overviewDuration, setOverViewDuration]= useState('overall')
    const [doctorArr, setDoctorArr]= useState([]);
    console.log(overviewDuration)
    console.log(currentDate)
    useEffect(()=>{
        dispatch(getAppointments())
        dispatch(getTodaysAppointments())

            async function fetchDoctors(){
             const response= await axios.get(`${BACKEND_URL}/doctor/get-available-doctors`);
             setDoctorArr(response.data.data)
             }
             fetchDoctors()
    }, [])

    useEffect(()=>{
        async function GetNextAppointment(){
            try {
                const response= await axios.get(`${BACKEND_URL}/appointment/next-appointment`);
                console.log(response)
            } catch (error) {
                console.log(error.message)
            }
        }

        GetNextAppointment()
    },[])
    console.log(appointments)
    console.log(todaysAppointments)

    const isLargerThan1000= useMediaQuery('(min-width: 1000px)');
    const isLargerThan900= useMediaQuery('(min-width: 900px)');
    const isLargerThan850= useMediaQuery('(min-width: 850px)');
    const isLargerThan650= useMediaQuery('(min-width: 650px)');
    const isLargerThan360= useMediaQuery('(min-width: 360px)');
    return (
        <Box width={'100%'} height={'90vh'} sx={{overflowY: 'scroll'}} bgcolor={color.background} p={isLargerThan360?'1rem': '0.3rem'}>
            {/* ---------Top container-------- */}
            <Box display={'flex'} flexWrap={'wrap'} gap={'0.5rem'} mb={'2rem'}>
                <Box width={isLargerThan900?'32%': isLargerThan650?'48%': '100%'} bgcolor={'white'} height={isLargerThan900?'8rem': '7rem'} p={'1rem'} display={'flex'} alignItems={'center'} borderRadius={'8px'} boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}>
                    <Box bgcolor={color.background} height={isLargerThan900?'6rem': '4rem'} width={isLargerThan900?'6rem': '4rem'} borderRadius={'50%'} overflow={'hidden'} display={'flex'} justifyContent={'center'} alignItems={'center'} p={'0.5rem'}>
                        <img src={doctorVector} alt="" style={{height: '80%'}} />
                    </Box>
                    <Box width={'65%'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} pl={'1rem'}>
                        <Typography fontSize={'0.9rem'}>Total Patients</Typography>
                        <Typography fontSize={'1.4rem'}>{appointments.length}</Typography>
                        <Typography fontSize={'0.9rem'}>Till Today</Typography>
                    </Box>
                </Box>
                <Box width={isLargerThan900?'32%': isLargerThan650?'48%': '100%'} bgcolor={'white'} height={isLargerThan900?'8rem': '7rem'} p={'1rem'} display={'flex'} alignItems={'center'} borderRadius={'8px'} boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}>
                    <Box bgcolor={color.background} height={isLargerThan900?'6rem': '4rem'} width={isLargerThan900?'6rem': '4rem'} borderRadius={'50%'} overflow={'hidden'} display={'flex'} justifyContent={'center'} alignItems={'end'}>
                        <img src={patientVector} style={{height: '90%'}} alt="" />
                    </Box>
                    <Box  width={'65%'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} pl={'1rem'}>
                        <Typography fontSize={'0.9rem'}>Today's Patients</Typography>
                        <Typography fontSize={'1.4rem'}>{appointments.filter(elem=> elem.date == currentDate ).length}</Typography>
                        <Typography fontSize={'0.9rem'}>{currentDate}</Typography>
                    </Box>
                </Box>
                <Box width={isLargerThan900?'32%': isLargerThan650?'48%': '100%'} bgcolor={'white'} height={isLargerThan900?'8rem': '7rem'} p={'1rem'} display={'flex'} alignItems={'center'} borderRadius={'8px'} boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}>
                    <Box bgcolor={color.background} height={isLargerThan900?'6rem': '4rem'} width={isLargerThan900?'6rem': '4rem'} borderRadius={'50%'}  overflow={'hidden'} display={'flex'} justifyContent={'center'} alignItems={'end'}>
                        <img src={availableDoctorVector} style={{height: '90%'}} alt="" />
                    </Box>
                    <Box width={'65%'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} pl={'1rem'}>
                        <Typography fontSize={'0.9rem'}>Available Doctors</Typography>
                        <Typography fontSize={'1.4rem'}>{doctorArr.length}</Typography>
                        <Typography fontSize={'0.9rem'}>For Today</Typography>
                    </Box>
                </Box>
            </Box>
            {/* ----Bottom Container----- */}

            <Box display={'flex'} flexWrap={'wrap'}  justifyContent={'space-evenly'} alignItems={'start'} minHeight={'26rem'} gap={2}>
                <Box width={isLargerThan850?'20rem': isLargerThan360?'80%': '100%'} height={'95%'} display={'flex'} flexDirection={'column'} alignItems={'center'} p={isLargerThan360?'1rem': '0.3rem'}>
                    <Typography mb={'1rem'}>Appointment Status Overview</Typography>
                    <Select size='small' sx={{mb: '1rem'}} value={overviewDuration} onChange={(e)=> setOverViewDuration(e.target.value)}>
                        <MenuItem value="today">Today</MenuItem>
                        <MenuItem value="overall">Overall</MenuItem>
                    </Select>
                    <PieChartComponent overviewDuration={overviewDuration} />
                    {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', bgcolor: 'green', width: '10rem' }}>
                    <Box display={'flex'} alignItems={'center'} mb= '0.5rem'> <Typography sx={{width: '1.3rem', height: '1.3rem', backgroundColor: '#4caf50', marginRight: '0.4rem'}}></Typography><Typography color='white'>Completed</Typography></Box>
                    <Box display={'flex'} alignItems={'center'} mb= '0.5rem'> <Typography sx={{width: '1.3rem', height: '1.3rem', backgroundColor: '#ff9800', marginRight: '0.4rem'}}></Typography><Typography color='white'>Pending</Typography></Box>
                    <Box display={'flex'} alignItems={'center'} mb= '0.5rem'> <Typography sx={{width: '1.3rem', height: '1.3rem', backgroundColor: '#f44336', marginRight: '0.4rem'}}></Typography><Typography color='white'>Cancelled</Typography></Box>
                </Box> */}
                </Box>

                {/* -------Todays all Patients---------- */}
                <Box height={'25rem'} bgcolor={'#ECEFFD'} width={isLargerThan850?'25rem': '100%'} p={isLargerThan650?'0.8rem': '0.2rem'} borderRadius={'5px'} boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}>
                    <Typography mb={'0.5rem'}>Today's Appointments</Typography>
                    <Box display={'flex'} justifyContent={'space-between'} mb={'0.4rem'} p={'0.5rem'}>
                        <Typography fontSize={'1.1rem'}>Patient</Typography>
                        <Typography fontSize={'1.1rem'}>Name</Typography>
                        <Typography fontSize={'1.1rem'}>Time</Typography>
                    </Box>
                    <Box  height={'18rem'} display={'flex'} flexDirection={'column'} sx={{overflowY: 'scroll'}}>
                        {/* ---each patient---- */}
                        {todaysAppointments.length>0 ?
                            (todaysAppointments.map((elem, ind) => (
                                <Box key={ind} display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={'0.4rem'} p={'0.5rem'}>
                                    <Box bgcolor={'grey'} width={'2.7rem'} height={'2.7rem'} display={'flex'} justifyContent={'center'} borderRadius={'50%'} overflow={'hidden'}>
                                        {
                                            elem.patientId.image? <img src={elem.patientId.image} style={{height: '100%'}} alt="" />:
                                            <img src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png" style={{height: '100%'}} alt="" />
                                        }
                                        
                                        
                                    </Box>
                                    <Typography >{elem.patientId.name}</Typography>
                                    <Typography bgcolor={'lightblue'} fontSize={isLargerThan360?'0.9rem': '0.7rem'} p={'0.3rem'} borderRadius={'4px'}>{elem.time}</Typography>
                                </Box>
                            ))
                        ):
                        <Typography m={'auto'}>No Appointments found</Typography>
                        }

                    </Box>
                </Box>

                {/*---------Next Patient Details--------*/}  
                {/* <Box bgcolor={'#ECEFFD'} width={isLargerThan360?'22rem': '100%'} height={isLargerThan360? '25rem': '23rem'} p={isLargerThan360?'1rem': '0.3rem'} borderRadius={'9px'}  boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}>
                    <Typography color='blue' mb={'1rem'}>Next Patient Details</Typography>
                    <Box height={'92%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'} p={isLargerThan360?'1rem': '0.2rem'}>
                        <Box bgcolor={'black'} width={'5rem'} height={'5rem'} borderRadius={'50%'}></Box>
                        <Typography fontSize={'1.1rem'}>Yash Gupta</Typography>
                        <Typography mr={'auto'} fontSize={'0.9rem'}>Id: yuau7s7asusyaiashab7ajshsh</Typography>
                        <Typography mr={'auto'} fontSize={'0.9rem'}>Email: yashsantoshgupta2019@gmail.com</Typography>
                       
                        <Box bgcolor={'yellow'} display={'flex'} justifyContent={'space-evenly'} width={'100%'} mb={'0.3rem'}>
                            <Box display={'flex'} flexDirection={'column'} width={'49%'} bgcolor={'#EFDFC6'} textAlign={'center'}>
                                <Typography>DOB</Typography>
                                <Typography color='#ff5252' fontSize={'0.9rem'}>31 January 2025</Typography>
                            </Box>

                            <Box display={'flex'} flexDirection={'column'} width={'49%'} textAlign={'center'} bgcolor={'#c5cae9'}>
                                <Typography>sex</Typography>
                                <Typography color='#3f51b5' fontSize={'0.9rem'}>Male</Typography>
                            </Box>
                        </Box>
                        
                        <Button variant='contained' sx={{mr: 'auto', width: '100%'}} startIcon={<IoIosCall />}>9527267375</Button>
                    </Box>
                </Box> */}



            </Box>

        </Box>
    )
}

export default Dashboard