import { Box, Button, Checkbox, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addMovie } from '../../Api-Helpers/api-helpers'
const labelProps={
    mt:1,mb:1
}
const AddMovie = () => {
    const [inputs, setInputs] = useState(
       { title:"",
        description:"",
        posterUrl:"",
        releaseDate:"",
        featured:false,
        }
    )
    const[actors,setActors]=useState([]);
    const[actor,setActor]=useState("");

    const handleChange = (e) => {
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs,actors);
        console.log("Form submitted");
        addMovie({
            ...inputs,
            actors: actors
        }).then((res) => {
            console.log("all data", res);
        }).catch(err => {
            console.error("API call failed:", err);
        });
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <Box width={'50%'} padding={10} margin={'auto'} display={'flex'} flexDirection={'column'} boxShadow={'10px 10px 20px #ccc'}>
                <Typography textAlign={'center'} variant='h5' fontFamily={'verdana'}>Add New Movie</Typography>
                <FormLabel sx={labelProps} >Title</FormLabel>
                <TextField value={inputs.title} onChange={handleChange}  name='title' variant='standard' margin='normal'/>
                <FormLabel sx={labelProps} >Description</FormLabel>
                <TextField value={inputs.description} onChange={handleChange}  name='description' variant='standard' margin='normal'/>
                <FormLabel sx={labelProps} >Poster Url</FormLabel>
                <TextField value={inputs.posterUrl} onChange={handleChange} name='posterUrl' variant='standard' margin='normal'/>
                <FormLabel sx={labelProps} >Release Date</FormLabel>
                <TextField type='date' value={inputs.releaseDate} onChange={handleChange} name='releaseDate' variant='standard' margin='normal'/>
                <FormLabel sx={labelProps} >Actors</FormLabel>
                <Box display={'flex'}>
                    <TextField value={actor} onChange={(e)=>setActor(e.target.value)} name="actor" variant='standard' margin='normal'/>
                    <Button onClick={()=>
                        {setActors([...actors,actor])
                         setActor("")
                        }}>Add Actor</Button>
                </Box>
                <FormLabel sx={labelProps} >Featured</FormLabel>
                <Checkbox name='featured' checked={inputs.featured} onClick={(e)=>setInputs((prev)=>({...prev,featured:e.target.checked}))} sx={{mr:"auto"}}/>
                <Button type='submit' variant='contained' sx={{width:'30%',margin:"auto",bgcolor:'#2b2d43',":hover":{
                    bgcolor:"#121217"
                }}}>Add New Movie</Button>
            </Box>
        </form>
    </div>
  )
}

export default AddMovie