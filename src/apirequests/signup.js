import axios from "axios";
export const userregisteration = async (url, data) => {
  const usersdetails = await axios.post(url, data, {
    withCredentials: true, // Include credentials in the request
  });
  return usersdetails;
};
