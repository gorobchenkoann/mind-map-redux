import React from 'react';
import { Controller, Button, Header } from './';

import { connect } from 'react-redux';
import { dragNode } from '../../actions';

import styles from './Node.scss';
import buttonStyles from './Button/Button.scss';

export class Node extends React.Component {    
    state = {
        mouseOn: false,
        showEditor: true,
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

    btnClickHandler = e => {
        if (this.state.showEditor) {
            // for adaptive controllers
            e.target.closest('div').parentElement.style.minHeight = 0;
        }
        this.setState({
            showEditor: !this.state.showEditor
        })
    }

    render() {
        let { id, position, sizes, title } = this.props;
        return ( 
            <div  
                id={id}                            
                className={styles.node}
                style={{
                    width: '280px',
                    minHeight: '160px',
                    top: position.y,
                    left: position.x                                                                            
                }}        
                onDoubleClick={(e) => {e.stopPropagation()}} 
                onMouseEnter={this.mouseEnterHandler}
                onMouseLeave={this.mouseLeaveHandler}        
            >      
                <Controller id={id} position='top' mouseOn={this.state.mouseOn}/>
                <Controller id={id} position='bottom' mouseOn={this.state.mouseOn}/>
                <Controller id={id} position='left' mouseOn={this.state.mouseOn}/>
                <Controller id={id} position='right' mouseOn={this.state.mouseOn}/>

                <Header id={id} title={title}>          
                    <Button 
                        onClick={this.btnClickHandler} 
                        showEditor={this.state.showEditor}
                    >
                    {this.state.showEditor ? 
                        <span className={styles.span}>-</span> :
                        <span className={styles.span}>+</span>
                    }
                    </Button>
                </Header>                
                
                {this.state.showEditor && 
                <>
                    {this.props.children}

                    <button
                    data-element='resize'
                    className={`${buttonStyles.button} ${styles.resize}`}
                    >
                    </button>
                </>
                }                
            </div>
        )
    }    
}
