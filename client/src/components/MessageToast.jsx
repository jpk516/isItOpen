import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useState } from 'react';

function MessageToast({ title, message, bg, show}) {
  const [showToast, setShowToast] = useState(show ?? true);
  const toggleShowToast = () => setShowToast(!showToast);

  return (
    <ToastContainer position='top-end' className='m-3'>
      <Toast bg={bg ?? 'light'} onClose={toggleShowToast} show={showToast} >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{title ?? 'Alert'}</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default MessageToast;