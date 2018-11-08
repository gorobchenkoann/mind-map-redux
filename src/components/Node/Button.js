import React from 'react';
import { IconContext } from 'react-icons';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

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
            {this.props.showEditor ? 
                <IconContext.Provider value={{ color: '#e987d9'}}>
                    <FaAngleUp />
                </IconContext.Provider> :
                <IconContext.Provider value={{ color: '#e987d9'}}>
                    <FaAngleDown />
                </IconContext.Provider>
            }
            </button>
        )
    }
}