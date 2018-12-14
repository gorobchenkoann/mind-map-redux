import React from 'react';
import { connect } from 'react-redux';

import { removeLine } from '../../redux/actions';
import styles from './Line.scss';

class LineComponent extends React.Component {
    getPosition(direction, node) {
        let dict = {
            'left': {
                x: node.position.x,
                y: node.position.y + node.sizes.height / 2
            },
            'right': {
                x: node.position.x + node.sizes.width,
                y: node.position.y + node.sizes.height / 2
            },
            'top': {
                x: node.position.x + node.sizes.width / 2,
                y: node.position.y
            },
            'bottom': {
                x: node.position.x + node.sizes.width / 2,
                y: node.position.y + node.sizes.height
            }
        }
        return dict[direction]
    }

    drawLine(from, to, id) {   
        let [sourceId, sourceDirecion] = from.split('-');
        let [targetId, targetDirection] = to.split('-');
        let sourceNode = this.props.nodes[sourceId];
        let targetNode = this.props.nodes[targetId];

        let sourcePosition = this.getPosition(sourceDirecion, sourceNode);
        let targetPosition = this.getPosition(targetDirection, targetNode);

        let shift = {
            x: (targetPosition.x - sourcePosition.x) / 2,
            y: (targetPosition.y - sourcePosition.y) / 2
        }

        let pathDict = {
            h: `M ${sourcePosition.x} ${sourcePosition.y} 
                C ${sourcePosition.x + shift.x} ${sourcePosition.y}
                ${sourcePosition.x + shift.x} ${targetPosition.y}
                ${targetPosition.x} ${targetPosition.y}`,
            v: `M ${sourcePosition.x} ${sourcePosition.y}
                C ${sourcePosition.x} ${sourcePosition.y + shift.y}
                ${targetPosition.x} ${sourcePosition.y + shift.y}
                ${targetPosition.x} ${targetPosition.y}`,
            hv: `M ${sourcePosition.x} ${sourcePosition.y}
                C ${targetPosition.x} ${sourcePosition.y}
                ${targetPosition.x} ${sourcePosition.y}
                ${targetPosition.x} ${targetPosition.y}`,
            vh: `M ${sourcePosition.x} ${sourcePosition.y}
                C ${sourcePosition.x} ${targetPosition.y}
                ${sourcePosition.x} ${targetPosition.y}
                ${targetPosition.x} ${targetPosition.y}`
        }

        let path = null;
        if (sourceDirecion === 'left' || sourceDirecion === 'right') {
            path = targetDirection === 'left' || targetDirection === 'right' 
                ? pathDict.h : pathDict.hv
        } else {
            path = targetDirection === 'top' || targetDirection === 'bottom'
            ? pathDict.v : pathDict.vh
        }

        return (
            <path 
                className={styles.path}
                onClick={() => this.lineClickHandler(id)}
                d={path}
            >
            </path>
        ) 
    }

    lineClickHandler = (id) => {
        this.props.removeLine(id);
    }

    render() {
        let { id, from, to } = this.props;
        return (    
            this.drawLine(from, to, id)
        )
    }    
}

const mapStateToProps = state => {
    return {
        nodes: state.nodes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeLine: (id) => dispatch(removeLine(id))
    }
}

export const Line = connect(
    mapStateToProps,
    mapDispatchToProps
)(LineComponent)