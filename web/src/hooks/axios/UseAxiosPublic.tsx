import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_APIKEY_ENDPOINT,
});
const useAxiosPublic = () => {
  const handleResErr = async (err: { response: { status: unknown } }) => {
    const status = err.response?.status;
    if (status === 401 || status === 403 || status === 500) {
      return;
    }
    return Promise.reject(err);
  };
  axiosPublic.interceptors.response.use((res) => res, handleResErr);
  return axiosPublic;
};

export default useAxiosPublic;
