// Movies Component: Fetching and mapping movies data
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { getAllMovies } from '../../Api-Helpers/api-helpers';
import MovieItem from './MovieItem';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        console.log('Fetched Movies Data:', data.movies);
        setMovies(data.movies);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography 
        margin={"auto"} 
        variant='h4' 
        padding={2} 
        textAlign={"center"} 
        bgcolor={"#900C3F"} 
        color={"white"} 
        width={"40%"}
      >
        All Movies
      </Typography>
      <Box 
        width={'100%'} 
        margin={'auto'} 
        display={'flex'} 
        justifyContent={'start'} 
        flexWrap={'wrap'}
      >
        
        {movies.map((movie) => (
          <MovieItem 
            key={movie._id} 
            id={movie._id}
            posterUrl={movie.posterUrl} 
            releaseDate={movie.releaseDate} 
            title={movie.title} 
          />
        ))}
      </Box>
    </Box>
  );
};

export default Movies;
