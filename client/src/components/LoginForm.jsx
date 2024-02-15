import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import AccountService from '../services/account-service';
import { useNavigate } from "react-router-dom";

function LoginForm({ authenticated, onAuthChange }) {
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({userName: '', password: ''});
    const [loginMessage, setLoginMessage] = useState('');

    const handleSubmit = () => {
        AccountService.authenticate(loginDetails.userName, loginDetails.password)
            .then(response => {
                if (response.data.success) {
                    onAuthChange(true);
                    navigate("/");
                } else {
                    setLoginMessage(response.data.message)
                }
            })
            .catch(error => {
                setLoginMessage(error);
            })
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username"
                    value={loginDetails.userName}
                    onChange={e => setLoginDetails({...loginDetails, userName: e.target.value})}
                 />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                    value={loginDetails.password}
                    onChange={e => setLoginDetails({...loginDetails, password: e.target.value})}
                 />
            </Form.Group>
            <Form.Group>
                <Button variant="primary"  onClick={handleSubmit}>
                    Submit
                </Button>
                { loginMessage.length > 0 && 
                    <Form.Text className="text-danger p-3">
                        {loginMessage}
                    </Form.Text>
                }
            </Form.Group>
        </Form>
    );
  }
  
  export default LoginForm;