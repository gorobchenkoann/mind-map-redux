import React from 'react';
import { connect } from 'react-redux';
import { editNodeTitle } from '../../actions';
import styles from './Header.scss';

export const HeaderCompoment = ({ id, title, children, editNodeTitle }) => {
    return (
        <div
            data-element='header'
            className={styles.header}
        >
            <input 
                className={styles.input}
                type='text' 
                value={title}
                onChange={(e) => editNodeTitle(id, e.target.value)}
            ></input>                
            {children}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        editNodeTitle: (id, title) => dispatch(editNodeTitle(id, title))
    }
}

export const Header = connect(
    null,
    mapDispatchToProps
)(HeaderCompoment)
