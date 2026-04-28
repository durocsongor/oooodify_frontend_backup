import { useEffect, useState } from "react"
import { whoami, logout } from "../api"
import { useNavigate } from "react-router-dom"
import Card from "../components/Card";

import { Link } from "react-router-dom";
import "../css/Home.css";


export default function Home() {
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')
    const navigate = useNavigate();
    const [musics, setMusics] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await whoami()
            if (data.error) {
                return setErrorUser(data.error)
            }
            return setUser(data)
        }
        load()
    }, [])

    useEffect(() => {
        async function fetchMusics() {
            try {
                const res = await fetch("/user/musics");
                const data = await res.json();
                if (data && data.length > 0) {
                }
                setMusics(data);
            } catch (err) {
                console.error("Hiba a zenék betöltésekor:", err);
            }
        }
        fetchMusics();
    }, []);

    async function onLogout() {
        const data = await logout()
        if (data.error) {
            return setErrorUser(data.error)
        }
        setUser(null)
        navigate('/')
    }

    const isLoggedIn = !!user;
    const isAdmin = user?.role === "admin";

    return (
        <div>
            <div className="container-fluid px-4">
                {isLoggedIn ? (
                    <div className="asd">
                        <div className="header">
                            <div className="logo">
                                OOOO<span className="focim_zold">DIFY</span>
                            </div>

                            <div className="header-buttons">
                                <Link to="/like" className="header-btn">
                                    Kedvencek
                                </Link>
                                <button className="header-btn" onClick={onLogout}>
                                    Kijelentkezés
                                </button>
                                {isAdmin && (
                                    <Link to="/admin" className="admin_panel">
                                        Admin panel
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="fooldalresz">
                            <h2>Felkapott zenék</h2>
                            <div className="cards">
                                {musics.map((song) => (
                                    <Card
                                        key={song.songID}
                                        songObj={song}
                                        name={song.name}
                                        title={song.title}
                                        image={`${song.musicImg}`}
                                        song={`${song.song}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="home-wrapper">
                        <div className="header">
                            <div className="logo">
                                OOOO<span className="focim_zold">DIFY</span>
                            </div>

                            <div className="header-buttons">
                                <Link to="/login">
                                    <button className="header-btn">Bejelentkezés</button>
                                </Link>
                            </div>
                        </div>

                        <div className="signup-banner">
                            <p>
                                <strong>
                                    Belehallgatás az OOOO
                                    <span className="focim_zold">DIFY</span>-ba
                                </strong>
                                <br />
                                Regisztrálj, és máris korlátlan hozzáférésed lesz
                            </p>

                            <Link to="/register">
                                <button>Ingyenes regisztráció</button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>


        </div>
    )
}