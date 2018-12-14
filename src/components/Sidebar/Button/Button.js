import React from 'react';
import classNames from 'classnames/bind';
import { MdDeleteForever } from 'react-icons/md';
import styles from './Button.scss';

let cx = classNames.bind(styles);

export class Button extends React.Component {
    state = {
        isHovering: false
    }

    mouseEnterHandler = () => {
        this.setState({
            isHovering: true
        })
    }

    mouseLeaveHandler = () => {
        this.setState({
            isHovering: false
        })
    }    

    render() {        
        return (
            <div 
                className={styles.wrap} 
                onMouseEnter={this.mouseEnterHandler}
                onMouseLeave={this.mouseLeaveHandler}
            >
                <button                         
                    className={cx('remove', {active: this.state.isHovering})}
                    title='Delete current map'
                ><MdDeleteForever /></button>
                <button
                    className={styles.item} 
                    onClick={() =>{this.props.setCurrentMapHandler(id)}}
                >{this.props.id}</button>
            </div>
        )
    }
}