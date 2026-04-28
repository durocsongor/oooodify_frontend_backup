export default function SongInfo({ id, name, title, songDelete, onModify }) {
    return (
        <tr>
            <td data-label="songID">{id}</td>
            <td data-label="Cím"><span className="song-name-badge">{name}</span></td>
            <td data-label="Előadó">{title}</td>
            <td data-label="Művelet">
                <button className="admin_confirm" onClick={() => songDelete(id)}>Törlés</button>
                <button className="edit-btn" onClick={onModify}>Szerkesztés</button>
            </td>
        </tr>
    );
}