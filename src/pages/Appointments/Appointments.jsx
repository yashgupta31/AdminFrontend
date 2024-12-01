import { Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDone } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { cancelAppointment, confirmAppointment, getAppointments } from '../../Redux/Actions/appointmentActions';
import { useDispatch, useSelector } from 'react-redux';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Appointments = () => {
  const [allAppointments, setAllAppointments] = useState([])
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments)
  console.log(appointments)
  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.get(`${BACKEND_URL}/appointment/all-appointments`)
        setAllAppointments(response.data.appointments)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchAppointments()
  }, [])

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



  return (
    <Box bgcolor={'red'} width={'82%'} pl={'1.5rem'} pt={'1.5rem'}>
      <Typography fontSize={'1.3rem'}>All Appointments</Typography>

      <Table sx={{ width: '100%', bgcolor: 'green' }} aria-label="simple table">
        <TableHead sx={{ bgcolor: 'aqua' }}>
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
        <TableBody sx={{ bgcolor: 'pink' }}>
          {appointments.map((elem, index) => (
            <TableRow sx={{ bgcolor: 'blue' }} key={index} >
              <TableCell align='left'>{index + 1}</TableCell>
              <TableCell align="left" sx={{ bgcolor: 'orange', width: '25%' }}>
                <Box display={'flex'} width={'100%'} bgcolor={'green'} height={'2rem'} alignItems={'center'}>
                  <img style={{ height: '100%' }} src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png" alt="" />
                  <Typography ml={'1rem'} width={'100%'} bgcolor={'yellow'} sx={{
                    whiteSpace: 'nowrap',
                    overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' }
                  }}>{elem.patientId.name}</Typography>
                </Box>
              </TableCell>
              <TableCell align="left" sx={{ bgcolor: 'red' }}>23</TableCell>
              <TableCell align="left" sx={{
                bgcolor: 'red', fontSize: '0.9rem', whiteSpace: 'nowrap',
                overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' }
              }}>{`${elem.date} / ${elem.time}`}</TableCell>
              <TableCell align="left" sx={{ bgcolor: 'red', width: '25%' }}>

                <Box display={'flex'} bgcolor={'green'} width={'100%'} height={'2rem'} alignItems={'center'}>
                  <img style={{ height: '100%' }} src={`${BACKEND_URL}${elem.doctorId.image}`} alt="" />
                  <Typography ml={'1rem'} sx={{ whiteSpace: 'nowrap', overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>{elem.doctorId.name}</Typography>
                </Box>
              </TableCell>
              <TableCell align="left">{elem.fees}$</TableCell>
              <TableCell align="center">

                {
                  (elem.status == 'Confirmed' || elem.status == 'Completed' || elem.status == 'Cancelled') ?
                    <Typography bgcolor={elem.status == 'Confirmed' && '#c8e6c9' || elem.status == 'Cancelled' && '#ffebee'} color={elem.status == 'Confirmed' && 'green' || elem.status == 'Cancelled' && '#f44336'} borderRadius={'5px'} fontSize={'0.9rem'} p={'0.2rem 1rem'}>{elem.status}</Typography> :
                    <Box bgcolor={'yellow'} display={'flex'}>
                      <IconButton><RxCross1 onClick={() => handleCancel(elem._id)} style={{ color: 'red' }} /></IconButton>
                      <IconButton><MdDone onClick={() => handleConfirm(elem._id)} style={{ color: 'green' }} /></IconButton>
                    </Box>
                }
                {/* {
                  elem.status == 'Confirmed' ? <Typography>{elem.status}</Typography> :
                    elem.status == 'Cancelled' ? <Typography>{elem.status}</Typography> :
                      elem.status == 'Completed' ? <Typography>{elem.status}</Typography> :
                        <Box bgcolor={'yellow'} display={'flex'}>
                          <IconButton><RxCross1 onClick={() => handleCancel(elem._id)} style={{ color: 'red' }} /></IconButton>
                          <IconButton><MdDone onClick={() => handleConfirm(elem._id)} style={{ color: 'green' }} /></IconButton>
                        </Box>
                } */}

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </Box>
  )
}

export default Appointments