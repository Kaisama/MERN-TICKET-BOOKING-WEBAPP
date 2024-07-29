import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem'
import { Link } from 'react-router-dom'
import { getAllMovies } from '../Api-Helpers/api-helpers'

const Homepage = () => {
    const [movies, setMovies] = useState([]);
    useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data.movies))
        .catch((err)=> console.log(err));
    },[])
  return (
    <>
    <Box width={"100%"} height={"100%"} margin="auto" marginTop={2}>
        <Box margin={"auto"} width={"80%"} height={"40vh"} padding={2}>
            <img src='https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg'
            width={"100%"} height={"100%"}
            />
        </Box>
            <Box padding={5} margin={"auto"} >
                <Typography variant='h4' textAlign={"center"}>Latest Release</Typography>
            </Box>
            <Box display={"flex"} width={"80%"} justifyContent={"center"} flexWrap={"wrap"}>
                    { movies && movies.map((movie,index)=><MovieItem id={movie.id} title={movie.title} releaseDate={movie.releaseDate} posterUrl={movie.posterUrl} key={index}/>)}
                    console.log(movies);
            </Box>
            <Box display={'flex'} padding={'5'} margin={'auto'}>
                <Button LinkComponent={Link} to='/movies' variant='outlined' sx={{margin:"auto",color:"#2b2d42"}}>View All Movie</Button>

            </Box>
    </Box>
    </>
  )
}

export default Homepage