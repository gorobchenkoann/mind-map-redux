import React from 'react';
import Plain from 'slate-plain-serializer';
import { Editor } from 'slate-react';
import { Node, Line } from '..';
import { connect } from 'react-redux';
import { createNode } from '../../actions';

import styles from './App.scss';

class AppCompoment extends React.Component {
    doubleClickHandler = e => {
        let id = Math.random().toString(36).substr(2, 9);
        let x = e.clientX - 140;
        let y = e.clientY - 70;
        let text = Plain.deserialize('');

        this.props.createNode(id, text, x, y);
    }
    render() {
        return(
        <div 
            className={styles.container}
            onDoubleClick={this.doubleClickHandler}
        >
            {Object.entries(this.props.nodes).map(([id, node]) => (
                <Node x={node.x} y={node.y} key={id} id={id}>
                    <Editor 
                        className={styles.editor} 
                        value={node.text}                         
                    />
                </Node>
            ))}           
        </div>
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
        createNode: (id, text, x, y) => dispatch(createNode(id, text, x, y))
    }
  }
  

export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppCompoment)

// import styles from './App.scss';

// export class App extends React.Component {
//     state = {
//         nodes: {},
//         lines: {},        
//         currentLine: null,
//     }  
//     resize = {
//         isResizing: false,
//         id: null,
//         startW: null,
//         startH: null,
//         startX: null,
//         startY: null
//     } 
//     currentNode = null;

//     makeId() {
//         return Math.random().toString(36).substr(2, 9);
//     };

//     createNode(e) {
//         let id = this.makeId();
//         let x = e.clientX - 140;
//         let y = e.clientY - 70;
//         let text = Plain.deserialize("");
 
    //     this.setState({
    //         nodes: {
    //             ...this.state.nodes,
    //             [id]: {
    //                 title: 'Node',
    //                 text: text,
    //                 x: x,
    //                 y: y                  
    //             }
    //         }
    //     }) 
    // };

//     doubleClickHandler = e => {
//         this.createNode(e);
//     };

//     mouseDownHandler = e => {
//         // drag node
//         if (e.target.getAttribute('data-element') === 'header') {
//             this.currentNode = e.target.parentElement.getAttribute('id');
//         }
//         // draw line
//         if (e.target.getAttribute('data-element') === 'controller') {
//             let id = this.makeId();
//             let from = e.target.getAttribute('id');
//             let to = e.target.getAttribute('id');
//             this.setState({
//                 lines: {
//                     ...this.state.lines,
//                     [id]: {
//                         from: from,
//                         to: to
//                     }
//                 },
//                 currentLine: {
//                     id: id,
//                     x1: e.clientX,
//                     y1: e.clientY,
//                     x2: e.clientX,
//                     y2: e.clientY
//                 }
//             })
//         }
//         if (e.target.closest('button') && e.target.closest('button').getAttribute('data-element') === 'resize') {
//             // e.target returns svg (react-icons)
//             let id = e.target.closest('button').parentElement.getAttribute('id');
//             let node = document.getElementById(id).getBoundingClientRect();
//             let startX = e.clientX;
//             let startY = e.clientY;
            
//             this.resize = {
//                 isResizing: true,
//                 id: id,
//                 startW: node.width,
//                 startH: node.height,
//                 startX: startX,
//                 startY: startY
//             }
//         }
//     };

//     mouseMoveHandler = e  => {
//         if (this.state.currentLine) {
//             this.setState({
//                 currentLine: { ...this.state.currentLine,
//                     x2: e.clientX,
//                     y2: e.clientY
//                 }
//             })
//         } else if (this.currentNode) {
//             let currentCoords = {
//                 x: e.clientX - 140, // 140 - half of element's width
//                 y: e.clientY - 20 // 20 - half of element's header height
//             } 
//             let nodes = {
//                 ...this.state.nodes, 
//                 [this.currentNode]: {
//                     ...this.state.nodes[this.currentNode],
//                     x: currentCoords.x,
//                     y: currentCoords.y
//                 }
//             }
//             this.setState({ nodes })
//         }
//         if (this.resize.isResizing) {
//             let node = document.getElementById(this.resize.id);
//             let newWidth = this.resize.startW + (e.clientX - this.resize.startX);
//             let newHeight = this.resize.startH + (e.clientY - this.resize.startY);

//             if (newWidth >= 220 && newHeight >= 120) {
//                 node.style.width = `${newWidth}px`;
//                 node.style.minHeight = `${newHeight}px`;
//             }            
//         }
//     };

//     mouseUpHandler = e => {  
//         if (this.state.currentLine) {
//             if (e.target.getAttribute('data-element') === 'controller') { 
//                 let to = e.target.id;         
//                 let lines = {
//                     ...this.state.lines,
//                     [this.state.currentLine.id]: {
//                         ...this.state.lines[this.state.currentLine.id],
//                         to: to
//                     }
//                 }      
//                 this.setState({ lines });               
//             }                     
//             this.setState({
//                 currentLine: null
//             })
//         }
//         if (this.currentNode) {
//             this.currentNode = null;
//         }       
//         if (this.resize) {
//             this.resize = {}                
//         }        
//         console.log(this.resize)
//     };

//     editorChangeHandler = ({value}, id) => {
//         let nodes = {
//             ...this.state.nodes, 
//             [id]: {
//                 ...this.state.nodes[id],
//                 text: value
//             }
//         }
//         this.setState({ nodes })
//     };

//     render() {
//         return (  
//             <div 
//                 data-element='container'
//                 className={styles.container}
//                 onDoubleClick={this.doubleClickHandler}
//                 onMouseDown={this.mouseDownHandler}
//                 onMouseMove={this.mouseMoveHandler}
//                 onMouseUp={this.mouseUpHandler}
//             >
//                 <svg className={styles.svg}>
//                     {this.state.currentLine && 
//                         <path stroke='#896899' strokeWidth={2}
//                             d={`M ${this.state.currentLine.x1} 
//                             ${this.state.currentLine.y1} 
//                             L ${this.state.currentLine.x2} 
//                             ${this.state.currentLine.y2} `}
//                         ></path>
//                     }
//                     {Object.entries(this.state.lines).map(([id, line]) => 
//                         <Line from={line.from} to={line.to} id={id} key={id}/>                    
//                     )}
//                 </svg>
//                 {Object.entries(this.state.nodes).map(([id, node]) => (
//                     <Node x={node.x} y={node.y} key={id} id={id} title={node.title}>
//                         <Editor 
//                             className={styles.editor} 
//                             value={node.text} 
//                             onChange={(editor) => this.editorChangeHandler(editor, id)} 
//                         />
//                     </Node>
//                 ))}                
//             </div>   
//         )
//     }
// }