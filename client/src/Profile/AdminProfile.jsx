import React, { useEffect, useState } from 'react';
import { getAdminById } from '../Api-Helpers/api-helpers';
import { Box, List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAdminById()
      .then((res) => {
        if (res && res.admin) {
          setAdmin(res.admin);
        } else {
          setError("Failed to fetch admin data");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred while fetching admin data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!admin) return <Typography>No admin data found</Typography>;

  return (
    <Box width={'100%'} display={'flex'}>
      <Box 
        width={'30%'} 
        flexDirection={'column'} 
        justifyContent={'center'} 
        alignItems={'center'}
      >
        <AccountCircleIcon sx={{ fontSize: "10rem" }} />
        <Typography 
          margin={1}
          padding={1} 
          width={'auto'} 
          textAlign={'center'} 
          borderRadius={6} 
          border={'1px solid #ccc'}
        >
          Email: {admin.email}
        </Typography>
      </Box>
      {admin.addedMovies && admin.addedMovies.length > 0 && (
        <Box width={'70%'} display={'flex'} flexDirection={'column'}>
          <Typography variant='h3' fontFamily={'verdana'} textAlign={'center'} padding={2}>
            Added Movies
          </Typography>
          <Box margin={'auto'} display={'flex'} flexDirection={'column'} width={'80%'}>
            <List>
              {admin.addedMovies.map((movie, index) => (
                <ListItem key={index} divider={true} sx={{bgcolor:"#00d386",color:"white",textAlign:"center",margin:1}}>
                  <ListItemText sx={{margin:1,width:"auto", textAlign:"left" }}>
                    Movie : {movie.title}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default AdminProfile;