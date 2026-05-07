import s from "./shared.module.css";
export default function ConfFormSubCategorias(){
    return(
        <div className={s.container}>
            <h2 className={s.pageTitle}>Subcategorías de artículos</h2>


            <div className={s.grid}>
                <div className={s.formulario}>
                    <fieldset className={s.fieldset}>
                        <h3 className={s.sectionTitle}>Información general</h3>
                        <div className={`${s.formRow} ${s.cols2}`}>

                            <div className={s.formGroup}>
                                <label className={s.label}>Categoria</label>
                                <select className={s.select}>

                                </select>

                                <label className={s.label}>Código</label>
                                <input className={s.input}></input>
                                
                                <label className={s.label}>Nombre Subcategoría</label>
                                <input className={s.input}></input>

                                <label className={s.label}>Estado</label>

                            </div>
                        </div>
                    </fieldset> 
                </div>
            </div>
        </div>
    )
}