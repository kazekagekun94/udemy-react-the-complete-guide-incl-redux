import React, { Component, Fragment } from 'react';
// import './Person.css'
import classes from './Person.module.css'
import withClass from '../../../hoc/withClass'
import PropTypes from "prop-types"
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props)
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated)
    }
    render() {
        return (
            <Fragment>
                {
                    this.context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>
                }
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input
                    ref={this.inputElementRef}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name}>
                </input>
            </Fragment>
        );
    }

}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass(Person, classes.Person)