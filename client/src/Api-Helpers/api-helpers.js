import axios from 'axios'

export const getAllMovies=async()=>{
  const res= await axios.get("/movie")
  .catch((err)=>console.log(err));
  console.log('API Response:', res.data);
  if(res.status!==200){
    return console.log("No Data");
  }
  const data=await res.data;
  return data;
}

export const sendUserAuthRequest = async (data, signup) => {
  try {
    const res = await axios.post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password
    });

    if (res.status === 200 || res.status === 201) {
      console.log("Response status:", res.status);
      console.log("Response data:", res.data);
      return res.data;
    } else {
      throw new Error(`Error occurred: ${res.status}`);
    }
  } catch (err) {
    console.error("Authentication request failed:", err);
    throw err;
  }
};

export const sendAdminAuthRequest = async (data) => {
  try {
    const res = await axios.post("/admin/login", {
      email: data.email,
      password: data.password,
    });

    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      console.log("Error Occurred");
      throw new Error("Authentication failed");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getMovieDetail=async(id)=>{
 const res= await axios.get(`/movie/${id}`).catch(err=>console.log(err));
 if(res.status!==200){
  return console.log("Error Occur");
 }
 return res.data;
}

export const newBooking = async (data) => {
  try {
    const res = await axios.post('/booking', {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId")
    });

    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error("Unexpected response status: " + res.status);
    }
  } catch (err) {
    console.error("Error occurred during booking:", err);
    throw err; 
  }
};

export const getUserBooking = async () => {
  
    const id = localStorage.getItem("userId");
    const res = await axios.get(`/user/bookings/${id}`)
    .catch(err=>console.log(err))
    if (res.status !== 200) {
      return console.log("Error Occurred");
      
    }
    const resData=await res.data;
    return resData;
 
};


export const deleteBooking=async(id)=>{
  const res=axios.delete(`/booking/${id}`).catch(err=>console.log(err))
  if(res.status!==200){
    return console.log("Error Occur");
  }
  const resData= await res.data;
  return resData;
}

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  try {
    const res = await axios.get(`/user/${id}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch user details");
    }
    return res.data;
  } catch (err) {
    console.error("Error fetching user details:", err);
    throw err;
  }
};

export const addMovie = async (data) => {
  try {
      const res = await axios.post("/movie", {
          title: data.title,
          description: data.description,
          releaseDate: data.releaseDate,
          posterUrl: data.posterUrl,
          featured: data.featured,
          actors: data.actors,
          admin: localStorage.getItem("adminId"),
      }, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });

      console.log("API Response:", res); 

      if (res.status !== 200 && res.status !== 201) {
          console.log("Error Occur");
          return;
      }

      const resData = await res.data;
      return resData;
  } catch (err) {
      console.error("Error Occurred:", err);
      return;
  }
};
