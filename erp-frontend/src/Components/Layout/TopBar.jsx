import style from "./TopBar.module.css"
export default function TopBar(){
    return(
        <header className={style.TopBar}>
            <span className={style.title}>Bienvenidos</span>
            <div className={style.right}>
                <span className={style.avatar}>JD</span>
            </div>
        </header>
    )
}