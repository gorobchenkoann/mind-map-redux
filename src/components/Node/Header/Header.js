import React from 'react';

import styles from './Header.scss';

export class Header extends React.Component {
    changeHandler = (id, e) => {
        this.props.editNodeTitle(id, e.value);
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
