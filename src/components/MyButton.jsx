export default function MyButton({ onClick, title }) {
    return (
        <div onClick={onClick} className="reg">
            <button className="button">{title}</button>
        </div>
    )
}