import React from 'react';
var ReactDOM = require('react-dom');
import {createStore} from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';

/**
 * LogReducer is a function that takes a state and an action and returns a new state
 * @param {Object[], Object}
 * @return {Object[]}
 **/
var LogReducer = function (state = [], action) {
    console.log(" ");
    console.log(action.type,'called with state', state, 'and action', action);

    switch (action.type) {
        case 'ADD_LOG':
            return [
                ...state,
                action.object
            ]
        case 'REMOVE_LOG':
            return action.newState;

        default:
            return state;
    }
};

/**
 * store_0 is a redux store
 **/
var store_0 = createStore(LogReducer);

/**
 * createAddLogAction is a function that creates an ADD_LOG action
 * @param {Object}
 * @return {Object}
 **/
var createAddLogAction = function (log_entry) {
    return {
        type: 'ADD_LOG',
        object: log_entry
    };
};

/**
 * createRemoveLogAction is a function that creates an REMOVE_LOG action
 * @param {id}
 * @return {Object}
 **/
var createRemoveLogAction = function (id) {
    var index =0;
    var newLog = store_0.getState().slice();
    for(var i=0; i<newLog.length; i++) //find index of log_entry with input id
    {
      if(newLog[i].id == id)
      {
        index=i;
        break;
      }
    }
    newLog.splice(index, 1); //remoce object from log
    return {
        type: 'REMOVE_LOG',
        newState: newLog,
    };
};

/**
 * dispatchAdd dispatches the createAddLogAction
 * @param {Object}
 **/
var dispatchAdd = function (log_entry)
{
  store_0.dispatch(createAddLogAction(log_entry));
};

/**
 * dispatchRemove dispatches the createRemoveLogAction
 * @param {Object}
 **/
var dispatchRemove = function (id)
{
  store_0.dispatch(createRemoveLogAction(id));
};

/**
 * LogList is a React Component used to view the redux store_0
 **/
var LogList = React.createClass({

  /**
   * render is a function that renders JSX
   * @return {JSX}
   **/
  render: function() {
    var LogNodes = store_0.getState().map(function(Log) {
      return (
        <div id={Log.id} key={Log.id}>
          Timestamp={Log.Timestamp}<br/>
          EventType={Log.EventType}<br/>
          EventSeverity={Log.EventSeverity}<br/>
          Message={Log.Message}<br/>
          id={Log.id}<br/>
        </div>
      );
    });
    return (
      <div className="LogList">
        {LogNodes}
      </div>
    );
  }
});

/**
 * connect is a function that connects the redux store_0 to the LogList react viewer
 **/
LogList = connect(
  function mapStateToProps(state) {
    return { log_entries: state };
  },
  function mapDispatchToProps(dispatch) {
    return {
    addLog: log_entry => dispatchAdd(log_entry),
    removeLog: id => dispatchRemove(id)
  };
  }
)(LogList);

// var LogForm = React.createClass({
//   getInitialState: function() {
//     return {Timestamp: '', EventType: '', EventSeverity: '', Message: ''};
//   },
//   handleTimestampChange: function(e) {
//     var today = new Date();
//     this.setState({Timestamp: (today.toString)});
//   },
//   handleEventTypeChange: function(e) {
//     this.setState({EventType: e.target.value});
//   },
//   handleEventSeverityChange: function(e) {
//     this.setState({EventSeverity: e.target.value});
//   },
//   handleMessageChange: function(e) {
//     this.setState({Message: e.target.value});
//   },
//   handleSubmit: function(e) {
//     e.preventDefault();
//     var today = new Date();
//     var Timestamp = today.toString();
//     var EventType = this.state.EventType.trim();
//     var EventSeverity = this.state.EventSeverity.trim();
//     var Message = this.state.Message.trim();
//     if (!Timestamp || !EventType || !EventSeverity || !Message) {
//       return;
//     }
//     var Log = ({Timestamp: Timestamp, EventType: EventType, EventSeverity: EventSeverity, Message:Message});
//     Log.id = Date.now();
//     dispatchAdd(Log);
//     this.setState({Timestamp: '', EventType: '', EventSeverity: '', Message: ''});
//   },
//   render: function() {
//     return (
//       <form className='LogForm' onSubmit={this.handleSubmit}>
//         <input type='text' placeholder="EventType" value ={this.state.EventType} onChange={this.handleEventTypeChange}/>
//         <input type='text' placeholder="EventSeverity" value ={this.state.EventSeverity} onChange={this.handleEventSeverityChange}/>
//         <input type='text' placeholder="Message" value ={this.state.Message} onChange={this.handleMessageChange}/>
//         <input type="submit" value="Post"/>
//       </form>
//     );
//   }
// });

// var LogRemoveForm = React.createClass({
//   getInitialState: function(){
//     return {id: ''};
//   },
//   handleIDchange: function(e){
//     this.setState({id : e.target.value});
//   },
//   handleSubmit: function(e){
//     e.preventDefault();
//     var id = this.state.id.trim();
//     if (!id)
//     {
//       return;
//     }
//     dispatchRemove(id) //set state to newLogs
//     this.setState({id: ''});
//   },
//   render: function(){
//     return(
//       <form className='Remove' onSubmit={this.handleSubmit}>
//         <input type='text' placeholder="Log id" value ={this.state.id} onChange={this.handleIDchange}/>
//         <input type="submit" value="Remove"/>
//       </form>
//     )
//   }
// });

// add under <LogList> and uncomment forms to use forms:
// <LogForm/>
// <LogRemoveForm/>

/**
* Renders to HTML
**/
