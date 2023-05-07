import styles from '../PrefCreate.module.css'

const Head = ({cap, setCap, scarf, setScarf}) => {
    return ( 
        <div className={styles.head}>Head: 
        <div>
            <div>
                <label htmlFor="cap">Cap</label>
                <input type="checkbox" id="cap" name="cap" checked={cap} value={cap} onChange={()=>setCap(prev => !prev)}/>
            </div>
            <div>
                <label htmlFor="neckWarmer">Scarf</label>
                <input type="checkbox" id="neckWarmer" checked={scarf} name="neckWarmer" value={scarf} onChange={()=>setScarf(prev => !prev)}/>
            </div>
        </div>
    </div>
     );
}
 
export default Head;