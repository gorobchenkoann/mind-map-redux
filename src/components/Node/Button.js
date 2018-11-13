import React from 'react';

export class Button extends React.Component {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                className={this.props.className}
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