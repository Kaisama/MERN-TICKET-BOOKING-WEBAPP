import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography, emphasize } from '@mui/material'
import React from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const labelStyle={mt:1,mb:1}

const AuthForm = ({onSubmit,isAdmin}) => {
const [isSignUp, setIsSignUp] = useState(false);
const [input, setInput] = useState({
    name:"",email:"",password:""
})
const[close,setClose]=useState(true)

const handleChange=(e)=>{
    setInput((prev)=>({...prev,[e.target.name]:e.target.value}))
}

const handleSubmit=(e)=>{
    e.preventDefault();
    onSubmit({input, signup: isAdmin ? false: isSignUp});
}

  return (
    <Dialog open={close} >
        <Box sx={{ml:'auto',padding:1}}>
            <IconButton  onClick={()=>setClose(false)} LinkComponent={Link} to='/'>
                <CloseRoundedIcon />
            </IconButton>
        </Box>
        <Typography variant='h4' textAlign={'center'}>{isSignUp?"Sign Up":"Login"}</Typography>
        <form onSubmit={handleSubmit}>
            <Box padding={6} display={'flex'} justifyContent={'center'} flexDirection={'column'} width={400} margin={'auto'} alignContent={'center'}> 
                    { !isAdmin && isSignUp && <> {" "} 
                    <FormLabel sx={{labelStyle}}>Name</FormLabel>
                    <TextField value={input.name} onChange={handleChange} variant='standard' margin='normal' type={'text'} name='name'/>
                    </>}
                    <FormLabel sx={{labelStyle}}>Email</FormLabel>
                    <TextField value={input.email} onChange={handleChange} variant='standard' margin='normal' type={'email'} name='email'/>
                    <FormLabel sx={{labelStyle}}>Password</FormLabel>
                    <TextField value={input.password} onChange={handleChange} variant='standard' margin='normal' type={'password'} name='password'/>

                    <Button sx={{mt:2,borderRadius:100,bgcolor:"#2b2d42"}} type='submit'
                    fullWidth
                    variant='contained'
                    >{isSignUp ? "Sign Up":"Login"}</Button>

                { !isAdmin && <Button onClick={()=>setIsSignUp(!isSignUp)} sx={{mt:2,borderRadius:100}} 
                    fullWidth
                    >Switch To {isSignUp ? "Login" :"Sign Up"} </Button>}
            </Box>

        </form>
    </Dialog>
  )
}

export default AuthForm