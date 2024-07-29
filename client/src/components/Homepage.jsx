import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import MovieItem from './Movies/MovieItem'
import { Link } from 'react-router-dom'

const Homepage = () => {
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
                    {[1,2,3,4].map((item)=><MovieItem key={item}/>)}
            </Box>
            <Box display={'flex'} padding={'5'} margin={'auto'}>
                <Button LinkComponent={Link} to='/movies' variant='outlined' sx={{margin:"auto",color:"#2b2d42"}}>View All Movie</Button>

            </Box>
    </Box>
    </>
  )
}

export default Homepage