import styles from '../PrefCreate.module.css'

const Head = ({pref, setPref}) => {
    return ( 
        <div className={styles.head}>Head: 
            <div>
                <div>
                    <label htmlFor="cap">Cap</label>
                    <input type="checkbox" id="cap" name="cap" checked={pref.cap} value={pref.cap} onChange={()=>setPref({...pref, cap: !pref.cap})}/>
                </div>
                <div>
                    <label htmlFor="neckWarmer">Scarf</label>
                    <input type="checkbox" id="scarf" checked={pref.scarf} name="scarf" value={pref.scarf} onChange={()=>setPref({...pref, scarf: !pref.scarf})}/>
                </div>
            </div>
        </div>
     );
}
 
export default Head;