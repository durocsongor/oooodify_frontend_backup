export default function UserInfo({ id, email, role, onDelete, onEdit }) {
    return (
        <tr>
            <td data-label="ID">{id}</td>
            <td data-label="Email">{email}</td>
            <td data-label="Szerepkör">
                <span className={`role-badge role-${role}`}>{role}</span>
            </td>
            <td data-label="Művelet">
                <button className="admin_confirm" onClick={() => onDelete(id)}>Törlés</button>
                <button className="edit-btn" onClick={onEdit}>Szerkesztés</button>
            </td>
        </tr>
    );
}