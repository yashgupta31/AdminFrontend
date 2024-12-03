import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDone } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { cancelAppointment, confirmAppointment, getAppointments } from '../../Redux/Actions/appointmentActions';
import { useDispatch, useSelector } from 'react-redux';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Appointments = () => {
  // const [allAppointments, setAllAppointments] = useState([])
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments)
  console.log(appointments)
  // useEffect(() => {
  //   async function fetchAppointments() {
  //     try {
  //       const response = await axios.get(`${BACKEND_URL}/appointment/all-appointments`)
  //       setAllAppointments(response.data.appointments)
  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //   }
  //   fetchAppointments()
  // }, [])

  useEffect(() => {
    dispatch(getAppointments())
  }, [dispatch])

  // Sends the appointment ID to the Redux action.
  // The Redux action then sends a PATCH request to update the status of the appointment to 'Confirmed'/ 'Cancelled.
  const handleConfirm = (id) => {
    dispatch(confirmAppointment(id))
  }

  const handleCancel = (id) => {
    dispatch(cancelAppointment(id))
  }


  const isLargerThan600 = useMediaQuery('(min-width: 600px)');
  const isLargerThan1050 = useMediaQuery('(min-width: 1050px)');


  return (
    <Box width={isLargerThan1050 ? '78%' : isLargerThan600 ? '84%' : '100%'} height={'90vh'} overflow={'scroll'} marginLeft={isLargerThan600 && '1.3rem'} mt={isLargerThan600 ? '1.5rem' : '0rem'} p={!isLargerThan600 && '1rem'}>
      <Typography fontSize={isLargerThan600 ? '1.3rem' : '1.1rem'} mb={isLargerThan600 ? '1.1rem' : '0.6rem'}>All Appointments</Typography>
      <TableContainer component={Paper}>
  {/* Horizontally scrollable container */}
  <Box sx={{ overflowX: 'auto', width: '100%' }}>
    <Table stickyHeader aria-label="sticky table">
      {/* Sticky TableHead */}
      <TableHead>
        <TableRow>
          <TableCell>Sr.No</TableCell>
          <TableCell>Patient</TableCell>
          <TableCell align="left">Age</TableCell>
          <TableCell align="left">Date & Time</TableCell>
          <TableCell align="left">Doctor</TableCell>
          <TableCell align="left">Fees</TableCell>
          <TableCell align="left">Action</TableCell>
        </TableRow>
      </TableHead>
    {/* </Table> */}

    {/* Vertically scrollable TableBody */}
    {/* <Box sx={{ maxHeight: '70vh', overflowY: 'auto' }}> */}
      {/* <Table> */}
        <TableBody>
          {appointments.map((elem, index) => (
            <TableRow key={index}>
              <TableCell align='left'>{index + 1}</TableCell>
              <TableCell align="left">
                <Box display={'flex'} width={'100%'} height={'2rem'} alignItems={'center'}>
                  <img
                    style={{ height: '100%' }}
                    src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
                    alt=""
                  />
                  <Typography
                    ml={'1rem'}
                    sx={{
                      whiteSpace: 'nowrap',
                      overflowX: 'auto',
                      '&::-webkit-scrollbar': { display: 'none' },
                    }}
                  >
                    {elem.patientId.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="left">23</TableCell>
              <TableCell align="left">{`${elem.date} / ${elem.time}`}</TableCell>
              <TableCell align="left">
                <Box display={'flex'} width={'100%'} height={'2rem'} alignItems={'center'}>
                  <img
                    style={{ height: '100%' }}
                    src={`${BACKEND_URL}${elem.doctorId.image}`}
                    alt=""
                  />
                  <Typography
                    ml={'1rem'}
                    sx={{
                      whiteSpace: 'nowrap',
                      overflowX: 'auto',
                      '&::-webkit-scrollbar': { display: 'none' },
                    }}
                  >
                    {elem.doctorId.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="left">{elem.fees}$</TableCell>
              <TableCell align="center">
                {(elem.status === 'Confirmed' || elem.status === 'Completed' || elem.status === 'Cancelled') ? (
                  <Typography
                    bgcolor={
                      (elem.status === 'Confirmed' && '#c8e6c9') ||
                      (elem.status === 'Cancelled' && '#ffebee') ||
                      (elem.status === 'Completed' && '#90caf9')
                    }
                    color={
                      (elem.status === 'Confirmed' && 'green') ||
                      (elem.status === 'Cancelled' && '#f44336') ||
                      (elem.status === 'Completed' && '#0d47a1')
                    }
                    borderRadius={'5px'}
                    fontSize={'0.9rem'}
                    p={'0.2rem 1rem'}
                  >
                    {elem.status}
                  </Typography>
                ) : (
                  <Box display={'flex'}>
                    <IconButton>
                      <RxCross1 onClick={() => handleCancel(elem._id)} style={{ color: 'red' }} />
                    </IconButton>
                    <IconButton>
                      <MdDone onClick={() => handleConfirm(elem._id)} style={{ color: 'green' }} />
                    </IconButton>
                  </Box>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    {/* </Box> */}
  </Box>
</TableContainer>


    </Box>
  )
}

export default Appointments