import { useState } from 'react';
import InstanceBaseUrl from '../Config/AxiosConfig';
function usePostMethod() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const PostDataApi = async (url, paramsid, data) => {
    const fullUrl = paramsid ? `${url}/${paramsid}` : url;
    setLoading(true);
    setError(null); 
    try {
      const apiResponse = await InstanceBaseUrl.post(fullUrl, data);

      console.log(apiResponse?.data,'apiResponse')
      setResponse(apiResponse?.data);
    } catch (err) {
      setError(err?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return { PostDataApi,response,loading,error};
}

export default usePostMethod;
