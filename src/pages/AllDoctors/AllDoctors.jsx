// import { Typography } from '@mui/joy';
import { Box, Checkbox, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { color } from '../../utils/utils';
import axios from 'axios';
// const dotenv= require('dotenv')
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL;

const AllDoctors = () => {
    const [doctorsArr, setDoctorArr]= useState([])


    useEffect(()=>{
       async function fetchDoctors(){
        const response= await axios.get('http://localhost:8080/doctor/getdoctors');
        // console.log(response)
        setDoctorArr(response.data.data)
        }
        fetchDoctors()
    },[]);

    const handleAvailability= async(isAvailable, id)=>{
        try {
            const response= await axios.patch(`http://localhost:8080/doctor/update/${id}`, isAvailable);
            console.log(response)
            setDoctorArr(response.data.data)
        // alert(response.data.message);
        } catch (error) {
            alert(error.message)
            console.log(error.message)
        }
        
    }



  return (
      <Box width={'80%'} pl={'1.4rem'} pt={'1.5rem'} display={'flex'} flexWrap={'wrap'} justifyContent={'flex-start'} >
                
               {
                doctorsArr &&
                doctorsArr.map((elem, index)=>(
                    <Box key={index} width={'23%'} height={'20rem'} border={'1.5px solid #C9D8FF'} overflow={'hidden'} borderRadius={'9px'} mr={'auto'} marginBottom={'1.5rem'} sx={{ "&:hover": { cursor: 'pointer'}}} >
                    <Box bgcolor={'#DCFDFD'} height={'70%'} display={'flex'} alignItems={'end'} justifyContent={'center'}  sx={{transition: '0.5s',  "&:hover": {bgcolor: color.primary, transition: '0.5s', cursor: 'pointer'}}}>
                        <img src={`${BACKEND_URL}${elem.image}`} height={'100%'} alt="" />
                    </Box>

                    <Box p={'0rem 1rem'} height={'29%'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    
                    <Typography fontSize={'1.2rem'}>{elem.name}</Typography>
                    <Typography fontSize={'sm'}>{elem.speciality}</Typography>
                    <Typography sx={{color: elem.isAvailable?'#22C55E': '#FF4848'}} display={'flex'} alignItems={'center'}> 
                        <Checkbox defaultChecked={elem.isAvailable? true: false} onChange={()=> handleAvailability({isAvailable: !elem.isAvailable}, elem._id)}  size='small' color='success'/>
                            <Typography>{elem.isAvailable? 'Available': 'Unavailable'}</Typography> </Typography>

                    </Box>

                </Box>
                ))
               }

               {
                !doctorsArr && <Typography>No Doctor Found..</Typography>
               }
                
                {/* ---------------- */}
            </Box>
  )
}

export default AllDoctors 