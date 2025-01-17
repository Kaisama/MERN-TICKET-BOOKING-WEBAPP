import React, { useState, useEffect } from 'react';
import { AppBar, Autocomplete, Box, Tab, Tabs, TextField, Toolbar } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import { getAllMovies } from '../Api-Helpers/api-helpers';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../redux/store';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdminLoggedIn = useSelector((state) => state.admin?.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user?.isLoggedIn);
  const [value, setValue] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (event, val) => {
    console.log("Selected value:", val);
    const movie = movies.find((m) => m.title === val);
    console.log("Found movie:", movie);
    if (movie) {
      if (isUserLoggedIn) {
        navigate(`/booking/${movie._id}`);
      }
    }
  };

  return (
    <AppBar position='sticky' sx={{ bgcolor: '#2b2d42' }}>
      <Toolbar>
        <Link to='/'>
          <Box width={'20%'} color={'white'}>
            <MovieIcon />
          </Box>
        </Link>
        <Box width={'30%'} margin={'auto'}>
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: 'white' } }}
                variant='standard'
                {...params}
                label='Search'
              />
            )}
          />
        </Box>
        <Box display={'flex'}>
          <Tabs
            value={value}
            indicatorColor='secondary'
            textColor='inherit'
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to='/movies' label='Movies' />
            {!isAdminLoggedIn && !isUserLoggedIn && [
              
                <Tab key='admin' LinkComponent={Link} to='/admin' label='Admin' />,
                <Tab key='auth' LinkComponent={Link} to='/auth' label='Auth' />
              
            ]}
            {isUserLoggedIn && !isAdminLoggedIn && [
              
                <Tab key='profile' LinkComponent={Link} to='/user' label='Profile' />,
                <Tab key='logout' LinkComponent={Link} to='/' onClick={() => logout(false)} label='Logout' />
            
            ]}
            {isAdminLoggedIn && 
              [
                <Tab key='add' LinkComponent={Link} to='/add' label='Add Movie' />,
                <Tab key='profile-admin' LinkComponent={Link} to='/profile-admin' label='Profile' />,
                <Tab key='logout-admin' LinkComponent={Link} to='/' onClick={() => logout(true)} label='Logout' />
              
            ]}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
