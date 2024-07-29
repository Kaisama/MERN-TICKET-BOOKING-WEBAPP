import axios from 'axios'

export const getAllMovies=async()=>{
  const res= axios.get("http://localhost:8080/movie")
  .catch((err)=>console.log(err));

  if(res.status!==200){
    return console.log("No Data");
  }
  const data=await res.data;
  return data;
}