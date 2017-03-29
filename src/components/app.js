import React from 'react';
import styles from './app.css';
import logo from './imgs/logo.svg';

const App = () => (
    <div>
        <div className={styles.app}>
            <img src={logo} className={styles.rotate}/>
            <h1>Welcome to React!</h1>
        </div>
    </div>
);

export default App;
