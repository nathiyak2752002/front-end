import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastError } from '../../middlewares/ToastModels';
import usePostMethod from '../../ApiCalls/PostMethod';
import { Loading } from '../../middlewares/Loader';
import { loginModalCheck } from '../../Redux/reducers/Login_model_reducers';
import { useDispatch } from 'react-redux';

function ModalPopup({getApi,state}) {
const dispatch=useDispatch();
  const { PostDataApi,loading, error } = usePostMethod(); 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState({
    name: "",
    description: "",
    image: "",
    imageUrl: ""
  });

  const { name, description, image, imageUrl } = user;
  const postUrl = [
    {
      id: 1,
      value: name,
      label: "Name",
      name: "name"
    },
    {
      id: 2,
      value: description,
      label: "Description",
      name: "description"
    }
  ];

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addChange = async () => {
    if (name && description && imageUrl) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", imageUrl[0]);
      await PostDataApi("/image/create", "", formData);
      if (!error) {
        handleClose();
        getApi();
      }
    } else {
      ToastError("Please Enter All Fields");
    }
  };

  const handleImage = (e) => {
    setUser({
      ...user,
      image: URL.createObjectURL(e.target.files[0]),
      imageUrl: e.target.files
    });
  };

  const handleShowLoginModel=()=>{
    dispatch(loginModalCheck(true))
  }

  return (
    <>
      <Button variant="primary" onClick={state?.tokenUser?handleShow:handleShowLoginModel}>
        + Add
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            {loading ? <Loading /> : null}
            {postUrl.map((item, index) => (
              <div key={index}>
                <Form.Group className="mb-3" controlId={`formBasic${item.name}`}>
                  <Form.Label>{item.label}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={`Please Enter ${item.label}`}
                    value={item.value}
                    name={item.name}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
              </div>
            ))}
            <div>
              {image ? <img src={image} alt="Selected" /> : null}
              <input type="file" accept="image/*" name="image" onChange={handleImage} />
            </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {loading ? (
            <Loading />
          ) : (
            <Button variant="primary" onClick={addChange}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPopup;
