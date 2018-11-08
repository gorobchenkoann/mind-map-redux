import React from 'react';
import { IconContext } from 'react-icons';
import { FaExpand } from 'react-icons/fa';
import { Header, Button } from '../';

import styles from './Node.scss';

const Controller = ({id, position, mouseOn}) => {
    return (        
        <div 
            style={{
                visibility: mouseOn ? 'visible' : 'hidden'
            }}
            id={`${id}-${position}`} 
            data-element='controller' 
            className={`${styles.controller} ${styles[position]}`}
        ></div>
    )
}

export class Node extends React.Component {    
    state = {
        mouseOn: false,
        showEditor: true,
    }
    resize = {
        isResizing: false,
        id: null,
        startW: null,
        startH: null,
        startX: null,
        startY: null
    } 

    mouseEnterHandler = () => {
        this.setState({
            mouseOn: true
        })
    }

    mouseLeaveHandler = () => {
        this.setState({
            mouseOn: false
        })
    }

    btnClickHandler = (e) => {
        if (this.state.showEditor) {
            // for adaptive controllers
            e.target.closest('div').parentElement.style.minHeight = 0;
        }
        this.setState({
            showEditor: !this.state.showEditor
        })
    }

    makeId() {
        return Math.random().toString(36).substr(2, 9);
    };

    render() {
        let { id, x, y, title } = this.props;
        return (     
            <div  
                id={id}                            
                className={styles.node}
                style={{
                    top: y,
                    left: x                                      
                }}        
                onDoubleClick={(e) => {e.stopPropagation()}}   
                onMouseEnter={this.mouseEnterHandler}
                onMouseLeave={this.mouseLeaveHandler}        
            >      
                <Controller id={id} position='top' mouseOn={this.state.mouseOn}/>
                <Controller id={id} position='bottom' mouseOn={this.state.mouseOn}/>
                <Controller id={id} position='left' mouseOn={this.state.mouseOn}/>
                <Controller id={id} position='right' mouseOn={this.state.mouseOn}/>

                <Header 
                    title={this.props.title}
                    className={styles.header} 
                >          
                    <Button 
                        onClick={this.btnClickHandler} 
                        className={styles.button} 
                        showEditor={this.state.showEditor}
                    />
                </Header>                
                
                {this.state.showEditor && 
                <>
                    {this.props.children}

                    <button
                    data-element='resize'
                    className={styles.button}
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        cursor: 'nwse-resize'
                    }}
                    >                        
                        <IconContext.Provider value={{ color: '#e987d9'}}>
                            <FaExpand />
                        </IconContext.Provider>
                    </button>
                </>
                }                
            </div>
        )
    }    
}