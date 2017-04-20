import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Value} from 'material-ui';
import { Link } from 'react-router';


/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

class NavBar extends Component {

    render() {
        return(
            <AppBar
                title="College Finder"
                showMenuIconButton={false}
                iconElementRight={
                    <Tabs>
                        <Tab label="Home" containerElement={<Link to="/home"/>}/>
                        <Tab label="About" containerElement={<Link to="/about"/>}/>
                    </Tabs>
                }
            />
        );
    }
}

export default NavBar;


// export default () => (
//     <nav className="navbar navbar-inverse bg-inverse">
//         <ul className="navbar-nav">
//             <li className="nav-item">
//                 <Link to="/" className="nav-link">Home</Link>
//             </li>
//             <li className="nav-item">
//                 <Link to="/new-todo" className="nav-link">Create New Todo</Link>
//             </li>
//         </ul>
//     </nav>
//
// )
