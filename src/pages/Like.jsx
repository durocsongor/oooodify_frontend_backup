import React, { useState, useEffect } from "react";
import { useMusic } from "../context/MusicContext";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import "../css/Home.css";

export default function Liked() {
    const { likedSongs } = useMusic();
    const [musics, setMusics] = useState([]);

    useEffect(() => {
        async function fetchMusics() {
            try {
                const res = await fetch("/user/musics");
                const data = await res.json();
                setMusics(data);
            } catch (err) {
                console.error("Hiba a zenék betöltésekor:", err);
            }
        }
        fetchMusics();
    }, []);

    const likedMusics = musics.filter(song => likedSongs.includes(String(song.songID)));

    return (
        <div className="container-fluid px-4">
            <div className="asd">
                <div className="header">
                <Link to="/" className="admin_link_hehe">
                    <div className="logo">OOOO<span className="focim_zold">DIFY</span></div>
                </Link>
                </div>

                <div className="fooldalresz">
                    <h2>Kedvelt zenéid</h2>
                    {likedMusics.length === 0 ? (
                        <p>Még nincs kedvelt zenéd.</p>
                    ) : (
                        <div className="cards">
                            {likedMusics.map((song) => (
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
                    )}
                </div>
            </div>
        </div>
    );
}