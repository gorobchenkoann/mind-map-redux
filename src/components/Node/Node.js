import React from 'react';
import { Controllers, Header, TextEditor } from './';
import { MdDehaze } from 'react-icons/md';

import styles from './Node.scss';

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
        } else {
            e.target.closest('div').parentElement.style.minHeight = `${this.props.sizes.height}px`;
        }
        
        this.setState({
            showEditor: !this.state.showEditor
        })
    }

    render() {
        let { id, position, title, sizes, text } = this.props;

        return ( 
            <div  
                id={id}                            
                className={styles.node}
                style={{
                    width: sizes.width,
                    minHeight: sizes.height,
                    top: position.y,
                    left: position.x                                                                            
                }}        
                onDoubleClick={(e) => {e.stopPropagation()}} 
                onMouseEnter={this.mouseEnterHandler}
                onMouseLeave={this.mouseLeaveHandler}       
            >      
                <Controllers controllerId={id} mouseOn={this.state.mouseOn}/>

                <Header id={id} title={title}>          
                    <button 
                        className={styles.displayEditorBtn}
                        onClick={this.btnClickHandler} 
                        tabIndex='0'
                    >
                        <MdDehaze className={styles.displayEditorIcon}/>
                    </button>
                </Header>                
                
                {this.state.showEditor && 
                <>
                    <TextEditor 
                        data-element='text_editor'
                        value={text} 
                        nodeId={id}                        
                    />

                    <button
                        data-element='resize'
                        className={styles.resize}
                    >
                    </button>
                </>
                }                
            </div>
        )
    }    
}
