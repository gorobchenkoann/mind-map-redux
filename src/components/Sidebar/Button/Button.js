import React from 'react';
import { connect } from 'react-redux';
import { clearWorkspace, removeCurrentMap, removeNode } from '../../../redux/actions';
import classNames from 'classnames/bind';
import { MdDeleteForever } from 'react-icons/md';
import styles from './Button.scss';

let cx = classNames.bind(styles);

class ButtonComponent extends React.Component {
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
    
    removeClickHandler = (id) => {
        let userConfirm = window.confirm('Delete current map?');
        if (userConfirm) {
            Object.entries(this.props.nodes).map(([nodeId, node]) => {
                if (this.props.maps[id].nodes.includes(nodeId)) {
                    this.props.dispatch(removeNode(null, nodeId));
                }
            }) 
            // remove nodes of current maps, then:
            this.props.dispatch(removeCurrentMap(id))            
            this.props.dispatch(clearWorkspace())
        }
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
                    onClick={()=>this.removeClickHandler(this.props.id)}
                    title='Delete current map'
                ><MdDeleteForever /></button>
                <button
                    className={styles.item} 
                    onClick={() =>{this.props.setCurrentMapHandler(this.props.id)}}
                >{this.props.id}</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        nodes: state.nodes,
        lines: state.lines,
        maps: state.maps
    }
}

export const Button = connect(mapStateToProps, null)(ButtonComponent)