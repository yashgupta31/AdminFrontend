import { Box, Button, MenuItem, Select, TextField, Typography, useMediaQuery } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { color } from '../../utils/utils';

const AddDoctor = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        fees: "",
        speciality: 'General physician',
        experience: 1,
        address: "",
        about: ""
    })
    const [profile, setProfile] = useState(null);
    const [previewImg, setPreviewImg]= useState('https://tse2.mm.bing.net/th?id=OIP.Ii03msaYXDSUkYoYwHIm0QAAAA&pid=Api&P=0&h=220')

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange=(e)=>{
        setProfile(e.target.files[0])
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader(); // Create a FileReader instance
            reader.onloadend = () => {
                setPreviewImg(reader.result); // Set the image preview to the FileReader's result
            };
            reader.readAsDataURL(file); // Read the file as a Data URL
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // Object.keys(form).forEach((key) => {
        //     formData.append(key, form[key])
        // })
        // formData.append('image', profile)

        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            formData.append(key, form[key]);
        });
        formData.append("image", profile);

        try {
            const response = await axios.post('http://localhost:8080/doctor/add', formData);
            // console.log(response)
            alert('Doctor Added successfully')
            setForm({
                name: "",
                email: "",
                password: "",
                fees: "",
                speciality: 'General physician',
                experience: 1,
                address: "",
                about: ""
            })

            setProfile(null)
            setPreviewImg('https://tse2.mm.bing.net/th?id=OIP.Ii03msaYXDSUkYoYwHIm0QAAAA&pid=Api&P=0&h=220')
        } catch (error) {
            console.log(error.message)
            alert('Fail to add Doctor')
        }
    }

    // ----screen size----
    const isLargerThan1100= useMediaQuery('(min-width: 1100px)');
    const isLargerThan900= useMediaQuery('(min-width: 900px)');
    const isLargerThan500= useMediaQuery('(min-width: 500px)');
    const isLargerThan600= useMediaQuery('(min-width: 600px)');

    return (
        <Box width={'100%'} pl={isLargerThan600?'1.4rem': '0.5rem'} mt={isLargerThan600?'1.7rem': '0.7rem'}>
            <Typography fontSize={'1.1rem'} >Add Doctor</Typography>
            <Box component={'form'} width={isLargerThan1100?'70%': '98%'} height={'81vh'} onSubmit={handleSubmit} border={'1px solid lightgrey'} borderRadius={'6px'} overflow={'auto'} p={isLargerThan500?'1.4rem': '0.7rem'} mt={'1rem'}>

                <Box display={'flex'} alignItems={'center'} mb={'1rem'}>
                    {/* <input onChange={(e) => setProfile(e.target.files[0])} type="file" /> */}
                    <Box bgcolor={color.primary} borderRadius={'50%'} height={'3rem'} width={'3rem'} position={'relative'} overflow={'hidden'} display={'flex'} justifyContent={'center'} alignItems={'center'} >

                        <input onChange={handleFileChange} type="file" style={{ backgroundColor: 'red', height: '100%', width: '100%', opacity: '0%', position: 'absolute' }}  />
                        <img style={{ width: '100%'}}  src={previewImg} alt=""  />
                    </Box>
                    <Typography ml={'1rem'} fontSize={isLargerThan500?'1rem': '0.9rem'}>Upload doctor profile</Typography>
                </Box>

                <Box display={'flex'} flexDirection={isLargerThan500?'row': 'column'} width={'100%'} justifyContent={'space-between'}>
                    {/* -------Form left----------- */}
                    <Box display={'flex'} flexDirection={'column'} width={isLargerThan500?'47%': '100%'} >
                        <Box width={'100%'} mb={'1rem'} >
                            <Typography mb={'0.2rem'} color='grey' fontSize={isLargerThan500? '1rem': '0.9rem'}>Your Name</Typography>
                            <TextField
                                id="demo-helper-text-misaligned"
                                name="name"
                                placeholder='Name'
                                size='small'
                                sx={{ width: '100%' }}
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </Box>

                        <Box width={'100%'} mb={'1rem'} >
                            <Typography mb={'0.2rem'} color='grey' fontSize={isLargerThan500? '1rem': '0.9rem'}>Doctor Email</Typography>
                            <TextField
                                id="demo-helper-text-misaligned"
                                name="email"
                                type='email'
                                placeholder='Email'
                                size='small'
                                sx={{ width: '100%' }}
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </Box>

                        <Box width={'100%'} mb={'1rem'} >
                            <Typography mb={'0.2rem'} color='grey' fontSize={isLargerThan500? '1rem': '0.9rem'}>Set Password</Typography>
                            <TextField
                                id="demo-helper-text-misaligned"
                                name="password"
                                type='password'
                                placeholder='Password'
                                size='small'
                                sx={{ width: '100%' }}
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </Box>

                        <Box width={'100%'} mb={'1rem'} >
                            <Typography mb={'0.2rem'} color='grey' fontSize={isLargerThan500? '1rem': '0.9rem'}>Experience</Typography>
                            <Select
                                defaultValue={1}
                                name="experience"
                                sx={{ width: '100%' }}
                                size='small'
                                value={form.experience || 1}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value={1}>1 Year</MenuItem>
                                <MenuItem value={2}>2 Year</MenuItem>
                                <MenuItem value={3}>3 Year</MenuItem>
                                <MenuItem value={4}>4 Year</MenuItem>
                                <MenuItem value={5}>5 Year</MenuItem>
                                <MenuItem value={6}>6 Year</MenuItem>
                            </Select>
                        </Box>

                        <Box width={'100%'} mb={'1rem'} >
                            <Typography mb={'0.2rem'} color='grey' fontSize={isLargerThan500? '1rem': '0.9rem'}>Fees</Typography>
                            <TextField
                                id="demo-helper-text-misaligned"
                                name="fees"
                                type='number'
                                placeholder='Doctor Fees'
                                size='small'
                                sx={{ width: '100%' }}
                                value={form.fees}
                                onChange={handleChange}
                                required
                            />
                        </Box>
                    </Box>

                    {/* ------right form------ */}
                    <Box width={isLargerThan500?'49%': '100%'} display={'flex'} flexDirection={'column'}>
                        <Box width={'100%'} mb={'1rem'} >
                            <Typography mb={'0.2rem'} color='grey' fontSize={isLargerThan500? '1rem': '0.9rem'}>Speciality</Typography>
                            <Select
                                defaultValue={'General physician'}
                                name='speciality'
                                sx={{ width: '100%' }}
                                size='small'
                                value={form.speciality || 'General physician'}
                                onChange={handleChange}
                                required
                                
                            >
                                <MenuItem value={'General physician'}>General physician</MenuItem>
                                <MenuItem value={'Gynecologis'}>Gynecologist</MenuItem>
                                <MenuItem value={'Darmatologist'}>Darmatologist</MenuItem>
                                <MenuItem value={'Pediatricians'}>Pediatricians</MenuItem>
                                <MenuItem value={'Neurologist'}>Neurologist</MenuItem>
                                <MenuItem value={'Gastroenterologist'}>Gastroenterologist</MenuItem>
                            </Select>
                        </Box>

                        <Box width={'100%'} mb={'1rem'} >
                            <Typography mb={'0.2rem'} color='grey' fontSize={isLargerThan500? '1rem': '0.9rem'}>Address</Typography>
                            <TextField
                                id="demo-helper-text-misaligned"
                                name='address'
                                placeholder='Address'
                                size='small'
                                sx={{ width: '100%' }}
                                value={form.address}
                                onChange={handleChange}
                                required
                            />
                        </Box>
                    </Box>
                    {/* ------------------------ */}
                </Box>

                <Box width={'100%'} mt={'1rem'}>
                    <Typography mb={'0.2rem'} color='grey' fontSize={isLargerThan500? '1rem': '0.9rem'}>About Doctor</Typography>
                    {/* <TextField
                                id="demo-helper-text-misaligned"
                                placeholder='Doctor Fees'
                                size='small'
                                sx={{ width: '100%' }}
                                rows={7}
                            /> */}
                    <TextField
                        id="outlined-multiline-static"
                        name='about'
                        sx={{ width: '100%' }}
                        multiline
                        rows={4}
                        placeholder='Write about doctor..'
                        value={form.about}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <Button type='submit' variant='contained' sx={{ width: isLargerThan500?'50%': '100%', borderRadius: '22px', p: isLargerThan500?'0.7rem 3.5rem': '0.5rem 3.5rem', mt: '1.6rem', mb: '1rem' }}>Add Doctor</Button>

            </Box>

        </Box>
    )
}

export default AddDoctor


// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import axios from "axios";

// const AddDoctor = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     fees: "",
//     specialization: "",
//     experience: "",
//     location: "",
//     about: "",
//   });
//   const [profile, setProfile] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setProfile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.keys(form).forEach((key) => {
//       formData.append(key, form[key]);
//     });
//     formData.append("image", profile);

//     try {
//         const response = await axios.post('http://localhost:8080/doctor/add', formData);
//       alert('form submitted');
//     //   console.log(response)
//     } catch (error) {
//       console.error(error);
//       alert("Failed to add doctor");
//     }
//   };

//   return (
//     <Box width={"100%"} pl={"1rem"} mt={"1rem"}>
//       <Typography fontSize={"1.2rem"}>Add Doctor</Typography>
//       <Box
//         component={"form"}
//         width={"70%"}
//         p={"1.4rem"}
//         mt={"1rem"}
//         onSubmit={handleSubmit}
//       >
//         <Box display={"flex"} alignItems={"center"} mb={"1rem"}>
//           <input type="file" onChange={handleFileChange} />
//           <Typography ml={"1rem"}>Upload doctor profile</Typography>
//         </Box>

//         <TextField
//           label="Name"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           type="password"
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Fees"
//           name="fees"
//           value={form.fees}
//           onChange={handleChange}
//           type="number"
//           fullWidth
//           margin="normal"
//         />
//         <Select
//           label="Specialization"
//           name="specialization"
//           value={form.specialization}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         >
//           <MenuItem value={"Cardiology"}>Cardiology</MenuItem>
//           <MenuItem value={"Neurology"}>Neurology</MenuItem>
//           <MenuItem value={"Orthopedics"}>Orthopedics</MenuItem>
//         </Select>
//         <TextField
//           label="Experience"
//           name="experience"
//           value={form.experience}
//           onChange={handleChange}
//           type="number"
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Location"
//           name="location"
//           value={form.location}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="About"
//           name="about"
//           value={form.about}
//           onChange={handleChange}
//           multiline
//           rows={4}
//           fullWidth
//           margin="normal"
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Add Doctor
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default AddDoctor;
