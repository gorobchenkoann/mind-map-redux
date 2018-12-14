import React from 'react';
import { connect } from 'react-redux';

import { removeLine } from '../../redux/actions';
import styles from './Line.scss';

class LineComponent extends React.Component {
    drawLine(from, to, id) {   
        let sourceId = from.split('-')[0];
        let targetId = to.split('-')[0];
        let sourceNode = this.props.nodes[sourceId];
        let targetNode = this.props.nodes[targetId];

        let sourcePosition = {
            x: sourceNode.position.x + sourceNode.sizes.width / 2,
            y: sourceNode.position.y + sourceNode.sizes.height / 2
        }
        let targetPosition = {
            x: targetNode.position.x + targetNode.sizes.width / 2,
            y: targetNode.position.y + targetNode.sizes.height / 2
        }; 

        let shift = {
            x: (targetPosition.x - sourcePosition.x) / 2,
            y: (targetPosition.y - sourcePosition.y) / 2
        }

        let path = `M ${sourcePosition.x} ${sourcePosition.y}
            L ${sourcePosition.x + shift.x} ${sourcePosition.y}
            L ${targetPosition.x} ${targetPosition.y}`

        console.log(targetPosition.x, sourcePosition.x, targetPosition.x - sourcePosition.x)
        console.log(targetPosition.y - sourcePosition.y)
        // let parentCoordX = document.getElementById(from).parentElement.parentElement.getBoundingClientRect().left;  
        // let fromNode = document.getElementById(from).getBoundingClientRect();
        // let toNode = document.getElementById(to).getBoundingClientRect();
        // let coords = {
        //     x1: fromNode.left - parentCoordX + 7,
        //     y1: fromNode.top + 7,
        //     x2: toNode.left - parentCoordX + 7,
        //     y2: toNode.top + 7
        // }
        // let shift = {
        //     horizontal: (toNode.left - fromNode.left) / 2,
        //     vertical: (toNode.top - fromNode.top) / 2
        // }
        // let path = {
        //     horizontal: `M ${coords.x1} 
        //         ${coords.y1}
        //         L ${coords.x1 + shift.horizontal} 
        //         ${coords.y1}
        //         L ${coords.x1 + shift.horizontal} 
        //         ${coords.y2}
        //         L ${coords.x2}
        //         ${coords.y2} `,           
        //     vertical: `M ${coords.x1} 
        //         ${coords.y1}
        //         L ${coords.x1} 
        //         ${coords.y1 + shift.vertical}
        //         L ${coords.x2} 
        //         ${coords.y1 + shift.vertical}
        //         L ${coords.x2}
        //         ${coords.y2} `,
        //     verticalHorizontal: `M ${coords.x1} 
        //         ${coords.y1}
        //         L ${coords.x1} 
        //         ${coords.y1 + shift.vertical * 2}
        //         L ${coords.x2}
        //         ${coords.y2} `,
        //     horizontalVertical: `M ${coords.x1} 
        //         ${coords.y1}
        //         L ${coords.x1 + shift.horizontal * 2} 
        //         ${coords.y1}
        //         L ${coords.x2}
        //         ${coords.y2} `
        // }
        // let fromContr = from.split('-')[1];
        // let toContr = to.split('-')[1];

        // const directionDict = {
        //     left: 'horizontal',
        //     right: 'horizontal',
        //     top: 'vertical',
        //     bottom: 'vertical'
        // }

        // if (directionDict[fromContr] === directionDict[toContr]) {
        //     var d = directionDict[fromContr] === 'horizontal' ? path.horizontal : path.vertical;
        // } else {
        //     var d = directionDict[fromContr] === 'horizontal' ? path.horizontalVertical : path.verticalHorizontal
        // }      

        return (
            // <path key={key} stroke='#ff6f61' strokeWidth={2} fill='transparent'
            //     d={d}
            // >
            // </path>
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