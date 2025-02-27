import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
        <div className={styles.robot}></div>
        <div className={styles.loading}></div>
        <h1>Line Bot</h1>
        <div>Try to build a line bot</div>
    </div>
  );
}
