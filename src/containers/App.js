// import { render } from 'react-dom';
import React from 'react';
import { Component } from 'react';
import Persons from '../components/Persons/Persons'
import classes from './App.module.css'
import Cockpit from '../components/Cockpit/Cockpit'

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor')
  }
  state = {
    persons: [
      { id: "asdf", name: 'Max', age: 28 },
      { id: "asdfg", name: 'Max', age: 29 },
      { id: "asdfgh", name: 'Staphanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props)
    return state
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount')

  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })
  }

  togglePersonHandler = () => {
    this.setState({ showPersons: !this.state.showPersons })
  }

  nameChangeHandler = (event, id) => {
    // console.log('Was Clicked~')
    // this.state.persons[0].name = 'Maximilian'
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    })

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState({ persons: persons })
  }

  render() {
    console.log('[App.js] render')

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
        ></Persons>
      )

    }

    return (
      <div className={classes.App}>
        <Cockpit
          showPersons={this.state.showPersons}
          appTitle={this.props.appTitle}
          persons={this.state.persons}
          clicked={this.togglePersonHandler}
        />
        {persons}
      </div>

    );
  }


}

export default App;
