import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Value } from 'material-ui';
import { Link } from 'react-router';

const styles = {
    stylesTab: {
        color: 'white',
        padding: '0 14px',
        fontWeight: 400
    },
    title: {
        cursor: 'pointer',
    }
};

class NavBar extends Component {
    //combination of th is and the function allow us to change routing so we can go to a specific page on a tap.
    static contextTypes = {
        router: PropTypes.object
    };

    handleTouchTap() {
        this.context.router.push('/');
    }
    //creates the navBar on screen, using material UI's <AppBar> and <Tabs> the title is clickable and will
    //route to the landing page and, the others using <Link> allowing them to route to specific pages.
    render() {
        return(
            <AppBar
                title={<span onClick={() => this.handleTouchTap()} style={styles.title}>School2Career</span>}
                showMenuIconButton={false}
                className="appBar"
                >
                <Tabs>
                    <Tab style={styles.stylesTab} className="navBarLink" label="&nbsp;Search&nbsp;" containerElement={<Link to="/school_search"/>}/>
                    <Tab style={styles.stylesTab} className="navBarLink" label="&nbsp;About&nbsp;" containerElement={<Link to="/about"/>}/>
                </Tabs>
            </AppBar>
        );
    }
}

export default NavBar;
