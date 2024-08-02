import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetail, newBooking } from '../../Api-Helpers/api-helpers';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';

const Booking = () => {
    const [movie, setMovie] = useState()
    const[inputs,setInputs]=useState({seatNumber:"",date:""})
    const id=useParams().id;
    useEffect(()=>{
        getMovieDetail(id).then((res)=>setMovie(res.movie)).catch(err=>console.log(err))
    },[id])
const handleChange=(e)=>{
    setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
}

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newBooking({...inputs, movie: movie._id});
      console.log("Booking successful:", res);
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  return (
    <div>
        {movie && 
        <Fragment>
            <Typography padding={3} fontFamily={"fantasy"} variant='h4' textAlign={"center"}>Book Tickets of Movie:{movie.title}</Typography>
            <Box display={'flex'} justifyContent={'center'}>
                <Box display={'flex'} justifyContent={'column'} flexDirection={'column'} paddingTop={3} width={'50%'} marginRight={'auto'}>
                    <img src={movie.posterUrl} alt={movie.title}  width={'80%'} height={"300px"}/>
                    <Box width={'80%'} marginTop={3} padding={2}>
                        <Typography paddingTop={2}>{movie.description}</Typography>
                        <Typography fontWeight={'bold'} marginTop={1}>
                           Actors:- {movie.actors.map((actor)=>" "+ actor + " ")}
                        </Typography>
                        <Typography fontWeight={'bold'} marginTop={1}>
                            Release Date :- {new Date(movie.releaseDate).toDateString()}
                        </Typography>
                    </Box>
                </Box>
                <Box width={'50%'} paddingTop={3}>
                    <form onSubmit={handleSubmit}>
                        <Box padding={5} margin={'auto'} display={'flex'} flexDirection={'column'}>
                            <FormLabel>Seat Number</FormLabel>
                            <TextField value={inputs.seatNumber} onChange={handleChange} name='seatNumber' type={'number'} margin='normal'  variant='standard'/>
                            <FormLabel>Booking Date:-</FormLabel>
                            <TextField value={inputs.date} onChange={handleChange} name='date' type='date' margin='normal' variant='standard'/>
                            <Button type='submit' sx={{mt:3}}>Book Now</Button>
                        </Box>
                    </form>

                </Box>
            </Box>
       </Fragment>}
    </div>
  )
}

export default Booking