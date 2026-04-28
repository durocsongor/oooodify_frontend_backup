import { createContext, useContext, useState, useEffect } from "react";
import { getLikedSongs, toggleLikeSong } from "../api";

const MusicContext = createContext();

export function MusicProvider({ children }) {
    const [currentAudio, setCurrentAudio] = useState(null);
    const [likedSongs, setLikedSongs] = useState([]);

    const fetchLikedSongs = async () => {
        //console.log("Fetching liked songs...");
        const data = await getLikedSongs();
        //console.log("Liked songs response:", data);
        if (data.error) {
            console.error("Error fetching liked songs:", data.error);
        } else if (Array.isArray(data)) {
            const likedIds = data.map(id => String(id));
            //console.log("Liked IDs set:", likedIds);
            setLikedSongs(likedIds);
        } else {
            console.warn("Unexpected data format:", data);
        }
    };

    useEffect(() => {
        fetchLikedSongs();
    }, []);

    const playSong = (audioRef) => {
        if (currentAudio && currentAudio !== audioRef) {
            currentAudio.pause();
        }
        setCurrentAudio(audioRef);
        audioRef.play();
    };

    const stopCurrent = () => {
        if (currentAudio) {
            currentAudio.pause();
            setCurrentAudio(null);
        }
    };

    const toggleLike = async (songID) => {
        //console.log("Toggling like for:", songID);
        const data = await toggleLikeSong(songID);
        //console.log("Toggle response:", data);
        if (data.error) {
            console.error("Toggle error:", data.error);
        } else {
            //console.log("Refreshing liked songs list...");
            await fetchLikedSongs();
        }
    };

    return (
        <MusicContext.Provider value={{ playSong, stopCurrent, currentAudio, likedSongs, toggleLike }}>
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic() {
    return useContext(MusicContext);
}