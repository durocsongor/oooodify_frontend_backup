import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FeketeGomb from '../components/FeketeGomb';
import '../css/Login.css';
import { login } from '../api';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [hiba, setHiba] = useState('');
    const [uzenet, setUzenet] = useState('');

    async function onLog() {
        setHiba('');
        setUzenet('');

        if (!email || !psw) {
            return setHiba('Kérlek töltsd ki az E-mailt és a jelszót!');
        }

        try {
            const data = await login(email, psw);
            if (data.error) {
                return setHiba(data.error);
            }
            setUzenet(data.message);
            setTimeout(() => navigate('/'), 600);
        } catch (err) {
            return setHiba("Hiba a csatlakozás során!");
        }
    }

    return (
        <div className="home-wrapper">
            <div className="login_tarlo">
                <div className="login_focim">
                    OOOO<span className="focim_zold">dify</span>
                </div>

                <p className="logEmail">E-mail-cím</p>
                <div className="input">
                    <FeketeGomb
                        szin="input-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@domain.com"
                    />
                </div>

                <p className="logPsw">Jelszó</p>
                <div className="input">
                    <FeketeGomb
                        szin="input-psw"
                        type="password"
                        value={psw}
                        onChange={(e) => setPsw(e.target.value)}
                        placeholder="•••••••••"
                    />
                </div>

                <div className="log">
                    <FeketeGomb
                        szin="btn btn-dark px-4"
                        text="Bejelentkezés"
                        onClick={onLog}
                    />
                </div>

                {hiba && <p className="error-message">{hiba}</p>}
                {uzenet && <p className="success-message">{uzenet}</p>}

                <div className="login_Container">
                    <p className="login_Text">Még nincs fiókod?</p>
                    <a href="/register" className="login_Link">Regisztráció</a>
                </div>
            </div>
        </div>
    );
}