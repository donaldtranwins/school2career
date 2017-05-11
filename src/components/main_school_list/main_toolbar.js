import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

export default class ToolbarExamplesSimple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                </ToolbarGroup>
                <ToolbarGroup>
                <FontIcon className="muidocs-icon-custom-sort" />
                <RaisedButton label="Map" primary={true} />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
