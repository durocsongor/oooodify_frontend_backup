const ADMIN_URL = '/admin';
const BACKEND_URL = '/user';
const IMAGE_URL = '/song-images'

export async function getSongImg(song_id) {
    try {
        const res = await fetch(`${IMAGE_URL}/${song_id}`)
        if (!res.ok) {
            console.error('Hiba a kép lekérésekor:', res.status)
            return null
        }
        const data = await res.json()
        return data
    } catch (err) {
        return null
    }
}

export async function register(email, psw) {
    const res = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, psw }),
    });

    const data = await res.json();
    return data;
}

export async function login(email, psw) {
    const res = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, psw }),
    });

    const data = await res.json();
    return data;
}

export async function whoami() {
    const res = await fetch(`${BACKEND_URL}/whoami`, {
        method: "GET",
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        return { error: data?.error };
    }

    return data;
}

export async function logout() {
    const res = await fetch(`${BACKEND_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        return { error: data?.error };
    }

    return data;
}

export async function deleteuser(userID) {
    const res = await fetch(`${ADMIN_URL}/deleteusers/${userID}`, {
        method: 'DELETE'
    })
}

export async function deletesongs(songID) {
    const res = await fetch(`${ADMIN_URL}/deletesongs/${songID}`, {
        method: 'DELETE'
    })
}

export async function getLikedSongs() {
    const res = await fetch(`${BACKEND_URL}/liked-songs`, {
        method: "GET",
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        return { error: data?.error };
    }

    return data;
}

export async function toggleLikeSong(songID) {
    const res = await fetch(`${BACKEND_URL}/like/${songID}`, {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("Like toggle error:", data?.error);
        return { error: data?.error };
    }

    return data;
}