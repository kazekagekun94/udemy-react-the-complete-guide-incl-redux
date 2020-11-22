// import { render } from 'react-dom';
import React from 'react';
import { Component } from 'react';
import Person from './Person/Person'
import classes from './App.module.css'

class App extends Component {
  state = {
    persons: [
      { id: "asdf", name: 'Max', age: 28 },
      { id: "asdfg", name: 'Max', age: 29 },
      { id: "asdfgh", name: 'Staphanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
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
    const style = {
      background: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      backgroundColor: 'green',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;
    let btnClass = ''

    const assignedClasses = []
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red)
    }

    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold)
    }

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)}
            />
          })}
        </div>
      )

      btnClass = classes.Red
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(" ")}>This is really working!</p>
        <button className={btnClass} onClick={this.togglePersonHandler}>Toggle persons
        </button>
        {persons}
      </div>

    );
  }


}

export default App;
