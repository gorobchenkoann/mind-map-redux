import React from 'react';
import { Sidebar, Node, Line } from '..';
import { connect } from 'react-redux';
import { createNode, dragNode, resizeNode, createLine} from '../../actions';

import styles from './App.scss';

class AppCompoment extends React.Component { 
    currentNode = null;
    currentMap = null;
    resize = {
        isResizing: false,
        id: null,
        startW: null,
        startH: null,
        startX: null,
        startY: null
    } 
    line = null;

    startResize = e => {
        let node = e.target.closest('div').getBoundingClientRect();
        this.resize = {
            id: e.target.closest('div').getAttribute('id'),
            isResizing: true,
            startW: node.width,
            startH: node.height,
            startX: e.clientX,
            startY: e.clientY
        }
    }

    doResize = e => {
        if (this.resize.isResizing) {
            let node = document.getElementById(this.resize.id);
            let newWidth = this.resize.startW + (e.clientX - this.resize.startX);
            let newHeight = this.resize.startH + (e.clientY - this.resize.startY);

            if (newWidth >= 220 && newHeight >= 160) {
                node.style.width = `${newWidth}px`;
                node.style.minHeight  = `${newHeight}px`;
            }

            this.props.resizeNode(this.resize.id, newWidth, newHeight)
        }
    }

    stopResize = () => {
        this.resize = {}
    }

    mouseDownHandler = e => {
        console.log(e.target)
        let target = e.target.getAttribute('data-element');
        if (target === 'controller') {
            let from = e.target.getAttribute('id');
            this.line = {
                from: from
            }
        } else if (target === 'resize') {
            this.startResize(e);
        } else {
            let id = e.target.parentNode.getAttribute('id');
            this.currentNode = id;
        }     
    }
    mouseMoveHandler = e => {
        if (this.currentNode) {
            let x = e.clientX - 140;
            let y = e.clientY - 70;
            this.props.dragNode(this.currentNode, x, y)
        }
        if (this.resize.isResizing) {
            this.doResize(e);            
        }
    }
    mouseUpHandler = e => {
        this.currentNode = null;
        if (this.resize.isResizing) {
            this.stopResize();
        }
        if (this.line && e.target.getAttribute('data-element') === 'controller') {
            let to = e.target.getAttribute('id');
            this.props.createLine(this.line.from, to);

            this.line = null;
        }
    }    

    render() { 
        return(
            <div className={styles.container} onMouseDown={e => {e.preventDefault()}}> 
                <Sidebar />                  
                <div 
                    className={styles.workspace}
                    onDoubleClick={e => this.props.createNode(e.clientX, e.clientY)}
                    onMouseDown={this.mouseDownHandler}
                    onMouseMove={this.mouseMoveHandler}
                    onMouseUp={this.mouseUpHandler}
                >                
                    <svg className={styles.svg}>
                        {Object.entries(this.props.lines).map(([id, line]) => 
                            <Line from={line.from} to={line.to} id={id} key={id}/>                    
                        )}
                    </svg>
                    {Object.entries(this.props.nodes).map(([id, node]) => (
                        <Node key={id} id={id} {...node} />
                    ))}                               
                </div>
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

const mapDispatchToProps = dispatch => {
    return {
        createNode: (x, y) => dispatch(createNode(x, y)),
        dragNode: (id, x, y) => dispatch(dragNode(id, x, y)),
        resizeNode: (id, width, height) => dispatch(resizeNode(id, width, height)),
        createLine: (from, to) => dispatch(createLine(from, to))
    }
}  

export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppCompoment)
