import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { loginModalCheck, showModalPopup } from '../Redux/reducers/Login_model_reducers';
import Form from 'react-bootstrap/Form';
import usePostMethod from './../ApiCalls/PostMethod';
import { ToastError, ToastSuccess } from './ToastModels';
function LoginModalpopup() {
  const {PostDataApi,response,loading,error}=usePostMethod();
  const [user,setUser]=useState({
    email:"",
    password:"",
    userName:""
  });
  const {email,password,userName}=user;
  const handleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  const formDatas=[
    {
      id:1,
      name:"userName",
      value:userName,
      label:"UserName",
      type:"text"
      
    },
    {
      id:2,
      name:"email",
      value:email,
      label:"Email",
      type:"email"
    },
  
    {
      id:3,
      name:"password",
      value:password,
      label:"Password",
      type:"password"
    }
  ]
    const dispatch=useDispatch();
    const state=useSelector((state)=>state?.Login)
  const [show, setShow] = useState(null);
  const handleClose = () => {setShow(false)
    dispatch(loginModalCheck(false));
  };
  const handleShow = () => setShow(true);
useEffect(()=>{
if(state?.loginModal)
{
    setShow(state?.loginModal)
}
},[state,response])
const registerModal=()=>{
  dispatch(showModalPopup(true));
}
const loginModal=()=>{
  dispatch(showModalPopup(false));
}
const loginUser=()=>{

}
const registerUser=()=>{
  const data=user;
  PostDataApi("/auth/register","",data);
    handleClose();
    ToastSuccess(response?.message);
}
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{state?.modalShow?"Register User":"Login User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state?.modalShow?<>
          {formDatas?.map((item,index)=>{
            return(
              <div>
           
<Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{item?.label}</Form.Label>
        <Form.Control type={item?.type} placeholder={`Please Enter ${item?.label}`} 
         name={item?.name}
         value={item?.value}
         onChange={handleChange}
        />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
              </div>
            )
          })}
          
          </>:<>
          {formDatas?.slice(1,3)?.map((item,index)=>{
            return(
              <div>
<Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{item?.label}</Form.Label>
        <Form.Control type={item?.type} placeholder={`Please Enter ${item?.label}`} 
        name={item?.name}
        value={item?.value}
        onChange={handleChange}
        />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
              </div>
            )
          })}
          </>}
         <div>
<div className='text-end fw-bold fs-6 cursor' onClick={!state?.modalShow?registerModal:loginModal}>
  {!state?.modalShow?"Are You New User Register Now":"Already Exit User Login Please"}
</div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={state?.modalShow?registerUser:loginUser}>{state?.modalShow?"Register":"Login"}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModalpopup;