import React from 'react';

export class Line extends React.Component {
    drawLine(from, to, key) {        
        let fromNode = document.getElementById(from).getBoundingClientRect();
        let toNode = document.getElementById(to).getBoundingClientRect();
        let coords = {
            x1: fromNode.left + 7,
            y1: fromNode.top + 7,
            x2: toNode.left + 7,
            y2: toNode.top + 7
        }
        let shift = {
            horizontal: (toNode.left - fromNode.left) / 2,
            vertical: (toNode.top - fromNode.top) / 2
        }
        let path = {
            horizontal: `M ${coords.x1} 
                ${coords.y1}
                L ${coords.x1 + shift.horizontal} 
                ${coords.y1}
                L ${coords.x1 + shift.horizontal} 
                ${coords.y2}
                L ${coords.x2}
                ${coords.y2} `,           
            vertical: `M ${coords.x1} 
                ${coords.y1}
                L ${coords.x1} 
                ${coords.y1 + shift.vertical}
                L ${coords.x2} 
                ${coords.y1 + shift.vertical}
                L ${coords.x2}
                ${coords.y2} `,
            verticalHorizontal: `M ${coords.x1} 
                ${coords.y1}
                L ${coords.x1} 
                ${coords.y1 + shift.vertical * 2}
                L ${coords.x2}
                ${coords.y2} `,
            horizontalVertical: `M ${coords.x1} 
                ${coords.y1}
                L ${coords.x1 + shift.horizontal * 2} 
                ${coords.y1}
                L ${coords.x2}
                ${coords.y2} `
        }
        let fromContr = from.split('-')[1];
        let toContr = to.split('-')[1];

        const directionDict = {
            left: 'horizontal',
            right: 'horizontal',
            top: 'vertical',
            bottom: 'vertical'
        }

        if (directionDict[fromContr] === directionDict[toContr]) {
            var d = directionDict[fromContr] === 'horizontal' ? path.horizontal : path.vertical;
        } else {
            var d = directionDict[fromContr] === 'horizontal' ? path.horizontalVertical : path.verticalHorizontal
        }

        return(
            <path key={key} stroke='#896899' strokeWidth={2} fill='transparent'
                d={d}
            >
            </path>
        ) 
    }

    render() {
        let { id, from, to } = this.props;
        return (    
            this.drawLine(from, to, id)
        )
    }    
}