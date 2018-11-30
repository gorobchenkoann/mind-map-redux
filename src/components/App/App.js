import React from 'react';
import { connect } from 'react-redux';

import { Sidebar, Node, Line } from '..';
import { createNode, dragNode, resizeNode, createLine } from '../../redux/actions';

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
    scale = {
        value: 100,
        sign: 1
    }

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
            let newWidth = this.resize.startW + (e.clientX - this.resize.startX);
            let newHeight = this.resize.startH + (e.clientY - this.resize.startY);
            this.props.resizeNode(this.resize.id, newWidth, newHeight);
        }
    }

    stopResize = () => {
        this.resize = {}
    }

    mouseDownHandler = e => {
        let target = e.target.getAttribute('data-element');
        if (target === 'controller') {
            let from = e.target.getAttribute('id');
            this.line = {
                from: from
            }
        } else if (target === 'resize') {
            this.startResize(e);
        } 
        else {
            if (e.target.parentNode.getAttribute('data-element') === 'workspace') {
                  e.preventDefault();
            }
            let id = e.target.parentNode.getAttribute('id');
            this.currentNode = id;            
        }     
    }

    mouseMoveHandler = e => {
        if (this.currentNode) {              
            let nodeElement = document.getElementById(this.currentNode);
            let node = nodeElement.getBoundingClientRect();
            let workspace = e.currentTarget.childNodes[0]; 
            let workspaceInner = workspace.getBoundingClientRect();
            let coords = {};

            let sc = this.scale.value / 100;
            if (this.scale.sign > 0) {
                coords = {
                    x: e.clientX  - workspaceInner.x - node.width / 2,
                    y: e.clientY - workspaceInner.y - node.height / 2
                }  
            } else {
                coords = {
                    x: e.clientX / sc - workspaceInner.x / sc - node.width / 2,
                    y: e.clientY / sc - workspaceInner.y / sc - node.height / 2
                }  
            }
            
            // if (coords.x + 280 > workspace.getBoundingClientRect().width) {
            //     workspace.style.width = workspace.getBoundingClientRect().width + 280 + 'px';
            // }
            
            // if (coords.x < 0) {
            //     coords.x = 0;
            // }       
            // if (coords.x + workspace.offsetLeft + node.width / 2 > workspace.width) {
            //     coords.x = workspace.width - node.width; 
            // }
            // if (coords.y < 0) {
            //     coords.y = 0;
            // }
            // if (coords.y + node.height > workspace.height) {
            //     coords.y = workspace.height - node.height;
            // }   
            this.props.dragNode(this.currentNode, coords.x, coords.y)            
        }
        if (this.resize.isResizing) {
            this.doResize(e);            
        }

        e.preventDefault(); // stop selection in Nodes
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

    doubleClickHandler = e => { 
        let shiftX = e.currentTarget.getBoundingClientRect().left; // 'left' of container
        let coords = {
            x: e.clientX - shiftX,
            y: e.clientY
        }
        this.props.createNode(coords.x, coords.y);
    }

    changeHandler = (id, e) => {
        this.props.editNodeText(id, e.value);
    }

    wheelHandler = e => {  
        let workspace = document.querySelector('[data-element="worklol"');
        let { value, sign} = this.scale;
        console.log(value, sign)
        if (value => 70 && value <= 130) {
            if (e.deltaY > 0 && value !== 130) {
                value += 5;
                sign = 1;
            } else if (e.deltaY < 0 && value !== 70) {
                value -= 5;
                sign = -1;
            }
        } 
        
        this.scale = {
            value: value,
            sign: sign
        }
        workspace.style.transform = `scale(${this.scale.value / 100})`;  
    }

    showCurrentMap = () => {
        let id = this.props.currentMap;
        let currentMap = this.props.maps[id]; 
        return (         
            Object.entries(currentMap['nodes']).map(([id, node]) => 
                <Node key={id} id={id} {...node} />
            )            
        )        
    }    

    render() {         
        return(            
            <div className={styles.container}>             
                <Sidebar />                  
                <div 
                    data-element='workspace'
                    className={styles.workspace}
                    onDoubleClick={this.doubleClickHandler}
                    onMouseDown={this.mouseDownHandler}
                    onMouseMove={this.mouseMoveHandler}
                    onMouseUp={this.mouseUpHandler}
                    onWheel={this.wheelHandler}                    
                >               
                <div data-element='worklol'>
                    {this.props.currentMap ? 
                        this.showCurrentMap() 
                        :
                        <>
                        <svg className={styles.svg}>
                            {Object.entries(this.props.lines).map(([id, line]) => 
                                <Line from={line.from} to={line.to} id={id} key={id}/>                    
                            )}
                        </svg> 
                        {Object.entries(this.props.nodes).map(([id, node]) => (
                            node.visible ? <Node key={id} id={id} {...node}/> : null                            
                        ))}
                        </>
                    }                    
                    </div>
                </div>
            </div>
        )
    }
}    

const mapStateToProps = state => {
    return {
        nodes: state.nodes,
        lines: state.lines,
        maps: state.maps,
        currentMap: state.currentMap
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
