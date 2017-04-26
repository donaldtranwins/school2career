import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchOneSchool } from '../../actions/actions_index';

class School extends Component {

    componentWillMount() {
        this.props.searchOneSchool();
    }

    render() {
        let list;
        const data = this.props.schools;
        if(!data){
            list = () => { return <p>Loading...</p>};
        } else {
            return (
                <div>
                    <h2>TITLE</h2>
                </div>
            );
        };
        return(
            <div>
                <div id="schoolList" className="listContainer hidden">
                    <h2>Temp</h2>
                </div>
            </div>
        );
    }
            //
            // if (!todo) {
            //     return (<h3>Loading...</h3>);
            // }
            //
            // return(
            //     <div>
            //         <h2>{todo.title}</h2>
            //         <p>{todo.details}</p>
            //         <p className={todo.complete ? "text-success" : "text-danger"}>{todo.complete ? "To Do Item Complete" : "To Do Item Incomplete"}</p>
            //         <p>Created: {this.toTimeString(todo.created)}</p>
            //         <p>Complete: {todo.complete ? this.toTimeString(todo.completed) : "Not Complete"}</p>
            //         <hr/>
            //         <button onClick={() => {this.handleDelete(todo._id)}} className="btn btn-outline-danger">Delete To Do Item</button>
            //         <button onClick={()=> {this.handleToggle(todo._id)}} className="btn btn-outline-success" >{ todo.complete ? "Re-Open" : "Complete Task" }</button>
            //     </div>
            // );



}

function mapStateToProps(state) {
    console.log("state in map", state);
    return {
        schools: state.schools.single
    };
}

export default connect(mapStateToProps, { searchOneSchool })(School);