import styles from './InfoCard.module.css'

const InfoCard = ({title , number}) => {
    return(
        <div className={styles.Container}>
            <h2 className={styles.H2}>{title}</h2>
            <p className={styles.P}>{number}</p>
        </div>
    )
}

export default InfoCard ;