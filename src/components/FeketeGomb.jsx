// FeketeGomb.jsx
export default function FeketeGomb({ szin, value, onChange, placeholder, type, text, onClick }) {
    // Ha van text és onClick, gombként működik
    if (text && onClick) {
        return (
            <button className={szin} onClick={onClick}>
                {text}
            </button>
        );
    }

    // Ha nincs text, inputként működik
    return (
        <input
            type={type || "text"}       // alapértelmezett text
            className={szin}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
        />
    );
}