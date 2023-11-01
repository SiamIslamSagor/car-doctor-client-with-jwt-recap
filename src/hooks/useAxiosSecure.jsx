import axios from "axios";
import { useEffect } from "react";
import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      res => {
        return res;
      },
      error => {
        console.log("ERROR TRACK IN THE INTERCEPTOR", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          console.log("log out the user");
          logout()
            .then(() => {
              navigate("/login");
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    );
  }, [logout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
