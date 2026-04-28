import React, { useRef, useState, useEffect } from "react";
import "../css/Home.css";
import { useMusic } from "../context/MusicContext";

export default function Card({ name, title, image, song, songObj }) {
    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);

    const { playSong, likedSongs, toggleLike } = useMusic();


    const isLiked = likedSongs.includes(String(songObj.songID));

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            playSong(audioRef.current);
        }
    };

    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;

        const handleEnded = () => setIsPlaying(false);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        return () => {
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
        };
    }, []);

    return (
        <div className="card">
            <div className="cover">
                <img src={image} alt={title} />
                <button onClick={togglePlay} className="play">
                    {isPlaying ? "❚❚" : "▶"}
                </button>
                <button onClick={() => toggleLike(String(songObj.songID))} className={`like-btn ${isLiked ? 'liked' : ''}`}>
                    {isLiked ? '❤️' : '♡'}
                </button>
            </div>

            <h3>{name}</h3>
            <p>{title}</p>

            <audio ref={audioRef} src={song} />
        </div>
    );
}