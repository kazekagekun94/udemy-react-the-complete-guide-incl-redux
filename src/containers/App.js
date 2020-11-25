// import { render } from 'react-dom';
import React from 'react';
import { Component } from 'react';
import Persons from '../components/Persons/Persons'
import classes from './App.module.css'
import Cockpit from '../components/Cockpit/Cockpit'
import withClass from '../hoc/withClass'
import Aux from '../hoc/Aux'
import AuthContext from '../context/auth-context'

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor')
  }
  state = {
    persons: [
      { id: "asdf", name: 'Max', age: 28 },
      { id: "asdfg", name: 'Max', age: 29 },
      { id: "asdfgh", name: 'Staphanie', age: 26 },
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props)
    return state
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount')

  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate')
    return true
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate')

  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })
  }

  togglePersonHandler = () => {
    this.setState({ showPersons: !this.state.showPersons })
  }

  toggleCockpitHandler = () => {
    this.setState({ showCockpit: !this.state.showCockpit })
  }

  loginHandler = () => {
    this.setState({ authenticated: true })
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

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    })
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
      <Aux>
        <button onClick={this.toggleCockpitHandler} >Toggle Cockpit</button>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}
        >
          {this.state.showCockpit ? <Cockpit
            showPersons={this.state.showPersons}
            appTitle={this.props.appTitle}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonHandler}
            login={this.loginHandler}
          /> : null}
          {persons}
        </AuthContext.Provider>
      </Aux>

    );
  }


}

export default withClass(App, classes.App);
