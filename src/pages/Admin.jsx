import { useState, useEffect } from "react";
import '../css/Admin.css';
import UserInfo from '../components/UserInfo';
import SongInfo from "../components/SongInfo";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

import { deleteuser, deletesongs } from "../api";

export default function Admin() {

    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    const [users, setUsers] = useState([]);
    const [musics, setMusics] = useState([]);

    const [userHiba, setUserHiba] = useState('');
    const [userUzenet, setUserUzenet] = useState('');
    const [songHiba, setSongHiba] = useState('');
    const [songUzenet, setSongUzenet] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteType, setDeleteType] = useState(null);
    const [deleteID, setDeleteID] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [editSong, setEditSong] = useState(null);

    const [editEmail, setEditEmail] = useState('');
    const [editRole, setEditRole] = useState('');
    const [editName, setEditName] = useState('');
    const [editTitle, setEditTitle] = useState('');

    // --- ÚJ ZENE FELTÖLTÉS ---
    const [showNewSongModal, setShowNewSongModal] = useState(false);
    const [newSongName, setNewSongName] = useState('');
    const [newSongTitle, setNewSongTitle] = useState('');
    const [newSongFile, setNewSongFile] = useState(null);
    const [newSongImage, setNewSongImage] = useState(null);

    // --- Fetch users ---
    useEffect(() => {
        fetch("/admin/users")
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => setUsers(data))
            .catch(err => console.error("Hiba a users fetch-nél:", err));
    }, []);

    // --- Fetch musics ---
    useEffect(() => {
        fetch("/admin/musics")
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (!Array.isArray(data)) throw new Error("Nem tömb az adat");
                setMusics(data);
            })
            .catch(err => {
                console.error("Hiba a musics fetch-nél:", err);
                setSongHiba("Nem sikerült lekérni a zenéket.");
                setMusics([]);
            });
    }, []);

    // --- Törlés ---
    function openDeleteModal(type, id) {
        setDeleteType(type);
        setDeleteID(id);
        setShowDeleteModal(true);
    }

    function closeDeleteModal() { setShowDeleteModal(false); }

    async function confirmDelete() {
        if (deleteType === "user") await deleteUser(deleteID);
        if (deleteType === "song") await deleteSong(deleteID);
        setShowDeleteModal(false);
    }

    async function deleteUser(userID) {
        setUserUzenet(''); setUserHiba('');
        try {
            await deleteuser(userID);
            setUsers(users.filter(u => u.userID !== userID));
            setUserUzenet("Felhasználó törölve!");
        } catch {
            setUserHiba("Hiba a törlés során!");
        }
    }

    async function deleteSong(songID) {
        setSongUzenet(''); setSongHiba('');
        try {
            await deletesongs(songID);
            setMusics(musics.filter(m => m.songID !== songID));
            setSongUzenet("Zene törölve!");
        } catch {
            setSongHiba("Hiba a törlés során!");
        }
    }

    // --- Edit ---
    function openEditUserModal(user) {
        setEditUser(user);
        setEditEmail(user.email);
        setEditRole(user.role);
        setEditSong(null);
        setShowEditModal(true);
    }

    function openEditSongModal(song) {
        setEditSong(song);
        setEditTitle(song.title);
        setEditName(song.name);
        setEditUser(null);
        setShowEditModal(true);
    }

    function closeEditModal() {
        setShowEditModal(false);
        setEditUser(null);
        setEditSong(null);
    }

    async function saveEditUser() {
        try {
            await fetch(`/admin/updateuser/${editUser.userID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: editEmail, role: editRole })
            });

            setUsers(users.map(u =>
                u.userID === editUser.userID
                    ? { ...u, email: editEmail, role: editRole }
                    : u
            ));

            closeEditModal();
            setUserUzenet("Felhasználó frissítve!");
        } catch {
            setUserHiba("Hiba a frissítés során!");
        }
    }

    async function saveEditSong() {
        try {
            await fetch(`/admin/updatesong/${editSong.songID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editName, title: editTitle })
            });

            setMusics(musics.map(m =>
                m.songID === editSong.songID
                    ? { ...m, name: editName, title: editTitle }
                    : m
            ));

            closeEditModal();
            setSongUzenet("Zene frissítve!");
        } catch {
            setSongHiba("Hiba a frissítés során!");
        }
    }

    // --- ÚJ ZENE FELTÖLTÉS ---
    function openNewSongUploadModal() {
        setShowNewSongModal(true);
        setNewSongName('');
        setNewSongTitle('');
        setNewSongFile(null);
    }

    async function uploadNewSong() {
        setSongUzenet('');
        setSongHiba('');
    
        if (!newSongName || !newSongTitle || !newSongFile || !newSongImage) {
            setSongHiba("Minden mező kötelező!");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('song', newSongFile);
            formData.append('img', newSongImage);
            formData.append('name', newSongName);
            formData.append('title', newSongTitle);
            // Ha akarsz, userID-t is
            formData.append("userID", users.length > 0 ? users[0].userID : 1);
            
            const res = await fetch("/admin/uploadsong", {
                method: "POST",
                body: formData
            });
    
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
            const data = await res.json();
            setMusics([...musics, data]);
    
            setSongUzenet("Zene feltöltve!");
            setShowNewSongModal(false);
    
        } catch (err) {
            console.error(err);
            setSongHiba("Hiba feltöltés során!");
        }
    }

    const handleSave = () => {
        if (editUser) saveEditUser();
        if (editSong) saveEditSong();
    };

    return (
        <div className="admin-container">

            <div className="admin_header">
                <Link to="/" className="admin_link_hehe">
                    <div className="logo">OOOO<span className="focim_zold">DIFY</span></div>
                </Link>

                <div className="admin-title">ADMIN</div>

                <button onClick={openNewSongUploadModal} className="admin_link_hehe">
                    <div className="logo">Muzsika feltöltés<span className="focim_zold"> +</span></div>
                </button>
            </div>

            {/* USERS */}
            <div className="section">
                <h2>Felhasználók kezelése</h2>
                <table>
                    <thead>
                        <tr className="hehehehehehe">
                            <th>ID</th>
                            <th>Email</th>
                            <th>Szerepkör</th>
                            <th>Művelet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <UserInfo
                                key={user.userID}
                                id={user.userID}
                                email={user.email}
                                role={user.role}
                                onDelete={() => openDeleteModal("user", user.userID)}
                                onEdit={() => openEditUserModal(user)}
                            />
                        ))}
                    </tbody>
                </table>
                {userHiba && <div className="error-message">{userHiba}</div>}
                {userUzenet && <div className="success-message">{userUzenet}</div>}
            </div>

            {/* SONGS */}
            <div className="section">
                <h2>Zenék kezelése</h2>
                <table>
                    <thead>
                        <tr className="hehehehehehe">
                            <th>songID</th>
                            <th>Cím</th>
                            <th>Előadó</th>
                            <th>Művelet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {musics.map(song => (
                            <SongInfo
                                key={song.songID}
                                id={song.songID}
                                name={song.name}
                                title={song.title}
                                songDelete={() => openDeleteModal("song", song.songID)}
                                onModify={() => openEditSongModal(song)}
                            />
                        ))}
                    </tbody>
                </table>
                {songHiba && <div className="error-message">{songHiba}</div>}
                {songUzenet && <div className="success-message">{songUzenet}</div>}
            </div>

            {/* DELETE MODAL */}
            {showDeleteModal && (
                <div className="admin_overlay">
                    <div className="admin_modal">
                        <h2>Bizti hogy törölni szeretnéd?</h2>
                        <div className="admin_buttons">
                            <button onClick={closeDeleteModal}>Mégse</button>
                            <button onClick={confirmDelete}>Törlés</button>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {showEditModal && (
                <div className="edit-modal-overlay">
                    <div className="edit-modal">

                        {editUser && <h2>Felhasználó szerkesztése</h2>}
                        {editSong && <h2>Zene szerkesztése</h2>}

                        {editUser && (
                            <>
                                <input
                                    type="email"
                                    value={editEmail}
                                    onChange={e => setEditEmail(e.target.value)}
                                />
                                <select value={editRole} onChange={e => setEditRole(e.target.value)}>
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                            </>
                        )}

                        {editSong && (
                            <>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={e => setEditName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={e => setEditTitle(e.target.value)}
                                />
                            </>
                        )}

                        <div className="edit-buttons">
                            <button className="edit-megse" onClick={closeEditModal}>Mégse</button>
                            <button className="edit-mentes" onClick={handleSave}>Mentés</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ÚJ ZENE MODAL */}
            {showNewSongModal && (
                <div className="edit-modal-overlay">
                    <div className="edit-modal">
                        <h2>Új zene feltöltése</h2>

                        <input
                            type="text"
                            placeholder="Cím"
                            value={newSongName}
                            onChange={(e) => setNewSongName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Előadó"
                            value={newSongTitle}
                            onChange={(e) => setNewSongTitle(e.target.value)}
                        />
                            <h2>Zene feltöltés</h2>
                        {/* TALLÓZÁS 👇 */}
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => setNewSongFile(e.target.files[0])}
                        />
                            <h2>Kép feltöltés</h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewSongImage(e.target.files[0])}
                        />

                        <div className="edit-buttons">
                            <button onClick={() => setShowNewSongModal(false)}>Mégse</button>
                            <button onClick={uploadNewSong}>Feltöltés</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}