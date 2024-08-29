import axios from 'axios';
axios.interceptors.request.use(function (config) {
    if(config.url=="/image/create")
    {
        config.url = "http://localhost:8001/api" + config.url;
        config.headers = {
            ...config.headers,
            'Content-Type': 'multipart/form-data',
          };
    }
    else{
        config.url ="http://localhost:8001/api" + config.url;
        config.headers = {
            ...config.headers,
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`
          };
    }
    config.withCredentials = true;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
 
    return Promise.reject(error);
  });
var InstanceBaseUrl=axios
export default InstanceBaseUrl;