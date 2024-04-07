import RegisterForm from '../components/RegisterForm'

function Register({ authenticated, onAuthChange }) {
    return (
        <>
            <RegisterForm authenticated={authenticated} onAuthChange={onAuthChange} />
        </>
    );
}

export default Register;