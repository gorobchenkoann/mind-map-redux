import React from 'react';
import { connect } from 'react-redux';
import { editNodeTitle } from '../../../redux/actions';

import styles from './Header.scss';

class HeaderComponent extends React.Component {
    changeHandler = (id, e) => {
        this.props.dispatch(editNodeTitle(id, e.target.value))
    }

    render() {
        let {id, title} = this.props;
        return (
            <div
                data-element='header'
                className={styles.header}
            >                
                <input 
                    className={styles.input}
                    type='text' 
                    value={title}
                    onChange={(e) => this.changeHandler(id, e)}
                ></input>                
                {this.props.children}
            </div>
        )
    }
}

export const Header = connect()(HeaderComponent)