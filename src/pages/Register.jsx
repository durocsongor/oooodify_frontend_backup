import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../css/Register.css';
import FeketeGomb from '../components/FeketeGomb';
import { register } from '../api';

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [hiba, setHiba] = useState('');
    const [uzenet, setUzenet] = useState('');

    async function onReg() {
        setHiba('');
        setUzenet('');

        if (!email || !psw) {
            return setHiba('Minden mezőt tölts ki!');
        }

        try {
            const data = await register(email, psw);
            if (data.error) {
                return setHiba(data.error);
            }
            setUzenet(data.message);
            setTimeout(() => navigate('/login'), 800);
        } catch (err) {
            return setHiba("Hiba a csatlakozás során!");
        }
    }

    return (
        <div className="home-wrapper">
            <div className="tarolo">
                <h1 className="focim">
                    OOOO<span className="focim_zold">dify</span>
                </h1>

                <div className="regText">Regisztrálj a zenehallgatás elindításához</div>

                <div className="regEmail">Email cím</div>
                <div className="input">
                    <FeketeGomb
                        szin="input-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@domain.com"
                    />
                </div>

                <div className="regPassword">Jelszó</div>
                <div className="input">
                    <FeketeGomb
                        szin="input-psw"
                        type="password"
                        value={psw}
                        onChange={(e) => setPsw(e.target.value)}
                        placeholder="•••••••••"
                    />
                </div>

                <div className="reg">
                    <FeketeGomb
                        szin="btn btn-dark px-4"
                        text="Regisztráció"
                        onClick={onReg}
                    />
                </div>

                {hiba && <p className="error-message">{hiba}</p>}
                {uzenet && <p className="success-message">{uzenet}</p>}

                <div className="loginContainer">
                    <p className="loginText">Már van fiókod?</p>
                    <a href="/login" className="loginLink">Bejelentkezés</a>
                </div>
            </div>
        </div>
    );
}