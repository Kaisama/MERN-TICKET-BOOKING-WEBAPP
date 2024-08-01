import React, { Fragment, useEffect, useState } from 'react';
import { getUserBooking } from '../Api-Helpers/api-helpers';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(()=>{
    getUserBooking().then((res)=>setBookings(res.bookings)).catch(err=>console.log(err))
  },[])   

  console.log("check",bookings);

  return (
    
    <Box width={'100%'} display={'flex'}>
      {bookings.length > 0 && (
        <Fragment>
          <Box 
            width={'30%'} 
            flexDirection={'column'} 
            justifyContent={'center'} 
            alignItems={'center'}
          >
            <AccountCircleIcon sx={{ fontSize: "10rem" }} />
            <Typography 
              padding={1} 
              width={'auto'} 
              textAlign={'center'} 
              borderRadius={6} 
              border={'1px solid #ccc'}
            >
              Name: {bookings[0].user.name}
            </Typography>
            <Typography 
              margin={1}
              padding={1} 
              width={'auto'} 
              textAlign={'center'} 
              borderRadius={6} 
              border={'1px solid #ccc'}
            >
              Email: {bookings[0].user.email}
            </Typography>
          </Box>
          <Box width={'70%'} display={'flex'} flexDirection={'column'}>
              <Typography variant='h3' fontFamily={'verdana'} textAlign={'center'} padding={2}>
                Bookings
              </Typography>
              <Box margin={'auto'} display={'flex'} flexDirection={'column'} width={'80%'}>
                <List>
                  {bookings.map((booking)=>(
                    <ListItem key={booking._id} divider={true} sx={{bgcolor:"#00d386",color:"white",textAlign:"center",margin:1}}>
                      <ListItemText  sx={{margin:1,width:"auto", textAlign:"left" }}>
                        Movie : {booking.movie.title}
                        {console.log("Booking data:", bookings)}
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
          </Box>
        </Fragment>
      )}
    </Box>
  );
}

export default UserProfile;
