import React,{useState} from 'react';

import InstanceBaseUrl from '../Config/AxiosConfig';
function GetMethod() {
    const [response,setResponse]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const GetDataApi=async(url,paramsid)=>{
        const urls=paramsid?`${url}/${paramsid}`:url;
        setLoading(true);
        try {
            const apiResponse=await InstanceBaseUrl.get(urls);
            if(apiResponse)
            {
                setResponse(apiResponse?.data);
            setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setError(error?.response?.data?.message);
        }finally
        {
            setLoading(false);
        }
    }
  return {GetDataApi,response,loading,error};
}

export default GetMethod