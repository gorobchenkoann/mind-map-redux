import React from 'react';
import { connect } from 'react-redux';

import { Sidebar, Node, Line } from '..';
import { createNode, dragNode, resizeNode, createLine, clearWorkspace } from '../../redux/actions';

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
    state = {
        scale: {
            value: this.scale.value
        }        
    }
    componentDidMount() {
        this.props.clearWorkspace();
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
        else if (target === 'header') {            
            let id = e.target.parentNode.getAttribute('id');
            this.currentNode = id;           
        }
        if (e.target.parentNode.getAttribute('data-element') === 'workspace') {
            e.preventDefault();
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
                    y: e.clientY - workspaceInner.y - 45 / 2 // header's height
                }  
            } else {
                coords = {
                    x: e.clientX / sc - workspaceInner.x / sc - node.width / 2,
                    y: e.clientY / sc - workspaceInner.y / sc - 45 / 2 // header's height
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
            this.props.dragNode(this.currentNode, coords.x, coords.y); 
        }
        if (this.line) {
            e.preventDefault();
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

    zoom = (arg) => {
        let workspace = document.querySelector('[data-element="map"');
        let { value, sign } = this.scale;

        if (arg === 'in') {
            value += 5;
            sign = 1;
        } else if (arg === 'out') {
            value -= 5;
            sign = -1;
        }   

        this.scale = {
            value: value,
            sign: sign
        }
        this.setState({
            scale: {
                value: value
            }
        })

        workspace.style.transform = `scale(${this.scale.value / 100})`;
    }

    wheelHandler = e => {  
        let isWorkspace = e.target.getAttribute('data-element') === 'workspace';
        let isParentMap = e.target.parentNode.getAttribute('data-element') === 'map'; // for SVG element
        if (isWorkspace || isParentMap) {
            let { value } = this.scale;

            if (value => 70 && value <= 130) {
                if (e.deltaY < 0 && value !== 130) {
                    this.zoom('in');
                    
                } else if (e.deltaY > 0 && value !== 70) {
                    this.zoom('out');               
                }
            }      
        }            
    }

    zoomClickHandler = (arg) => {
        let { value } = this.scale;
        if (value => 70 && value <= 130) {
            if (arg === 'in' && value !== 130) {
                this.zoom('in');
            } else if (arg === 'out' && value !== 70) {
                this.zoom('out'); 
            }
        }
    }

    render() {        
        return(            
            <div className={styles.container}>             
                <Sidebar /> 
                <div className={styles.scalePanel}>
                    <span>{this.state.scale.value}%</span>
                    <button onClick={() => this.zoomClickHandler('in')}>+</button>
                    <button onClick={() => this.zoomClickHandler('out')}>-</button>
                </div>    
                                 
                <div 
                    data-element='workspace'
                    className={styles.workspace}
                    onDoubleClick={this.doubleClickHandler}
                    onMouseDown={this.mouseDownHandler}
                    onMouseMove={this.mouseMoveHandler}
                    onMouseUp={this.mouseUpHandler}
                    onWheel={this.wheelHandler}                    
                >                  
    
                <div 
                    data-element='map' 
                    className={styles.map}
                >

                    <svg className={styles.svg}>
                        {Object.entries(this.props.lines).map(([id, line]) => (
                            line.visible ?
                            <Line from={line.source} to={line.target} id={id} key={id} />  
                            : null                  
                        ))}
                    </svg> 
                    {Object.entries(this.props.nodes).map(([id, node]) => (
                        node.visible ? <Node key={id} id={id} {...node}/> : null                            
                    ))}

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
        clearWorkspace: () => dispatch(clearWorkspace()),
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
