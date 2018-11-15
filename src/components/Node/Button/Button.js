import React from 'react';

import styles from './Button.scss';

export class Button extends React.Component {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                className={styles.button}
                style={{
                    alignSelf: 'center',
                    marginLeft: 'auto'
                }}
            >
            {this.props.children}
            </button>
        )
    }
}