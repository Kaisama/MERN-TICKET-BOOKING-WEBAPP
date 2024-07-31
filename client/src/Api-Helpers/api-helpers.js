import axios, { Axios } from 'axios'

export const getAllMovies=async()=>{
  const res= await axios.get("/movie")
  .catch((err)=>console.log(err));

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