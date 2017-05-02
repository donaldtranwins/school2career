import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Value, ToolbarGroup, FlatButton} from 'material-ui';
import { Link } from 'react-router';


const styles = {
    stylesTab: {
        marginRight: '25px',
        color: 'white'
    }
};


class NavBar extends Component {

    render() {
        return(
            <AppBar
                title="College Finder"
                showMenuIconButton={false}>
                <Tabs>
                    <Tab style={styles.stylesTab} className="navBarLink" label="&nbsp;Home&nbsp;" containerElement={<Link to="/home"/>}/>
                    <Tab style={styles.stylesTab} className="navBarLink" label="&nbsp;About&nbsp;" containerElement={<Link to="/about"/>}/>
                </Tabs>
            </AppBar>
        );
    }
}

export default NavBar;
