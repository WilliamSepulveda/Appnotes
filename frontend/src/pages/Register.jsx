import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent form default behavior

        // Validación básica
        if (!userName || !email || !password) {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Si la creación fue exitosa, redirigir al usuario
                alert('Cuenta creada exitosamente. Por favor, inicia sesión.');
                navigate('/Login');
            } else {
                // Manejar errores devueltos por el servidor
                setErrorMessage(data.message || 'Error al crear la cuenta.');
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            setErrorMessage('Error durante la creación de la cuenta.');
        }
    };

    return (
        <>
            <header>
                <div className="header__logo">
                    {/* <img src={Star} alt="" /> */}
                </div>
            </header>
            <main>
                <section className="section__form">
                    <h1>Create account</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <form onSubmit={handleSignUp} className="login">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="Your username" 
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required 
                        />
                        
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                        
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                        
                        <span>
                            I accept the terms and privacy policy
                        </span>
                        
                        <input type="submit" className="submit-button" value="Sign up" />
                    </form>
                </section>
            </main>
            <footer>
               <p>Your have an account? 
                    <Link to="/Login"><b>Sign in</b></Link>
                </p>  
            </footer>
        </>
    );
};

export default SignUp;