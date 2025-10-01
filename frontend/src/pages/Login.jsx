import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Login.css'; 
import { API_URL } from "../apiConfig.js";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        // Validar formato de correo electrónico
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        // Validar el correo electrónico
        if (!validateEmail(email)) {
            setErrorMessage('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        // Validar la contraseña (puedes agregar más reglas aquí)
        if (password.length < 6) {
            setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                alert('no compartas tu clave')
                navigate('/notas'); // Redirigir después del inicio de sesión
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message); // Mostrar mensaje de error
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            setErrorMessage('Error durante el inicio de sesión.'); 
            alert('Error durante el inicio de sesión.');
        }
    };

    return (
        <>
            <header>
                <div className="header__logo">
                </div>
            </header>
            <main>
                <section className="section__form">
                    <h1>Log in</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <form className="login" onSubmit={handleLogin}>
                        <label htmlFor="email">Email address</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email" 
                            required 
                        />
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your password" 
                            required 
                        />
                        <span>Forgot password?</span>
                        <button type="submit" className="submit-button">Log in</button>
                    </form>
                </section>
                <section>
                    <div className="section__line">
                        <span>Or Login with</span>
                    </div>
                    <div className="section__social">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
<path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg></button>
                        
                    </div>
                </section>
            </main>
            <footer>
                <p>Don’t have an account? 
                    <Link to="/register"><b>Sign up</b></Link>
                </p>            
            </footer>
        </>
    );
};

export default Login;