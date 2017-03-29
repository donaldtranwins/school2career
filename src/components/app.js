import React from 'react';
import styles from './app.css';
import logo from './imgs/logo.svg';

const App = () => (
    <dvi>
        <div className={styles.app}>
            <img src={logo} className={styles.rotate}/>
            <h1>Welcome to React!</h1>
        </div>
    </dvi>
);

export default App;