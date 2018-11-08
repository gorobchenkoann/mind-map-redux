import React from 'react';

import styles from './Header.scss';

export class Header extends React.Component {
    state = {
        title: 'Node'
    }

    inputChangeHandler = e => {
        this.setState({
            title: e.target.value
        })
    }

    render() {
        return (
            <div
                data-element='header'
                className={this.props.className}
            >
                <input 
                    className={styles.input}
                    type='text' 
                    value={this.state.title}
                    onChange={this.inputChangeHandler} 
                ></input>                
                {this.props.children}
            </div>
        )
    }
}