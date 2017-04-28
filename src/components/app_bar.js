import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Value} from 'material-ui';
import { Link } from 'react-router';


/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

const styles = {
    stylesTab: {
        marginRight: '25px'
    }
};

class NavBar extends Component {



    render() {
        return(
            <AppBar
                title="College Finder"
                showMenuIconButton={false}
                iconElementRight={
                    <Tabs>
                        <Tab style={styles.stylesTab} className="navBarLink" label="Home" containerElement={<Link to="/home"/>}/>
                        <Tab style={styles.stylesTab} className="navBarLink" label="About" containerElement={<Link to="/about"/>}/>
                    </Tabs>
                }
            />
        );
    }
}

export default NavBar;

