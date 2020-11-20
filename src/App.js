import './App.css';
// import { render } from 'react-dom';
import React from 'react'
import { Component } from 'react';
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Max', age: 29 },
      { name: 'Staphanie', age: 26 }
    ],
    otherState: 'some other value'
  }

  switchNameHandler = (newName) => {
    // console.log('Was Clicked~')
    // this.state.persons[0].name = 'Maximilian'
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Max', age: 29 },
        { name: 'Staphanie', age: 27 }
      ]
    })
  }

  nameChangeHandler = (event) => {
    // console.log('Was Clicked~')
    // this.state.persons[0].name = 'Maximilian'
    this.setState({
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Staphanie', age: 27 }
      ]
    })
  }

  render() {
    const style = {
      background: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button
          style={style}
          onClick={() => this.switchNameHandler('Maximillian!!')}>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age} />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Max!')}
          changed={this.nameChangeHandler}
        >My Hobbies: Racing</Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age} />
      </div >
    );
    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does this work now?'));
  }


}

export default App;
