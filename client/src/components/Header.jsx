import React, {useState, useEffect } from 'react'
import {AppBar, Autocomplete, Box, Tab, Tabs, TextField, Toolbar} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import { getAllMovies } from '../Api-Helpers/api-helpers'
import { Link } from 'react-router-dom'

const Header = () => {
    const [value, setValue] = useState(0);
    const [movies, setMovies] = useState([]);
    useEffect(()=>{
        getAllMovies()
        .then((data)=>setMovies(data.movies))
        .catch((err)=>console.log(err))
    },[])
  return (
    <>
    <AppBar position='sticky' sx={{bgcolor:"#2b2d42"}}>
        <Toolbar>   
            <Link to='/'>
            <Box width={'20%'} color={'white'}><MovieIcon/></Box>  
            </Link>
            <Box width={'30%'} margin={'auto'}>
                <Autocomplete
                freeSolo
                options={movies && movies.map((option)=>option)}
                renderInput={(params)=>
                    (<TextField sx={{input :{color:"white"}}} variant='standard'{...params} label='Search' />)}
                />                
            </Box>
            <Box display={'flex'}>
                    <Tabs indicatorColor='secondary' textColor='inherit' value={value}
                     onChange={(e,val)=>setValue(val)}>
                     
                        <Tab LinkComponent={Link} to='/movies'label='Movies' value={0} />
                        <Tab LinkComponent={Link} to='/admin' label='Admin' value={1}/>
                        <Tab LinkComponent={Link} to='/auth' label='Auth' value={2}/>
                    </Tabs>
            </Box>

        </Toolbar>
    </AppBar>
    </>
  )
}

export default Header