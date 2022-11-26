import styles from './Header.module.css';
import logo from '../../assets/Logo.svg';

export function Header() {
  return (
    <header className={styles.header}>
        <img className={styles.img} src={logo} alt='logo' />
    </header>
  )
}
