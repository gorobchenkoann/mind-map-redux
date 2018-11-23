import React from 'react';
import { connect } from 'react-redux';
import { clearWorkspace, clearAll, saveWorkspace, setCurrentMap } from '../../actions';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { createId } from '../../utils/createId';
import styles from './Sidebar.scss';

class SidebarComponent extends React.Component {
    saveHandler = () => {           
        let id = createId();  
        if (!isObjectEmpty(this.props.nodes)) {
            if (!this.currentMap) {
                this.currentMap = id;
                this.props.saveWorkspace(this.currentMap, this.props.nodes, this.props.lines);
                console.log(this.props.maps)
                let ls = JSON.parse(localStorage.getItem('maps'));                
                localStorage.setItem('maps', 
                    JSON.stringify({...ls, 
                        [this.currentMap]: {
                            nodes: this.props.nodes,
                            lines: this.props.lines
                        }
                    })
                );
            } else {
                console.log('current map exists')
            } 
        } else {
            console.log('tut pusto')
        }   
    }

    
    newHandler = () => {
        this.currentMap = null;
        this.props.clearWorkspace();        
    }

    clearHandler = () => {        
        this.currentMap = null;
        this.props.clearAll();
        localStorage.clear();
    }

    setCurrentMapHandler = (id) => {
        this.props.setCurrentMap(id);
    }

    render() {
        return (
            <div className={styles.sidebar}>
                <button
                    className={styles.button}
                    onClick={this.newHandler}
                >New</button>
                <button                        
                    className={styles.button}
                    onClick={this.saveHandler}
                >Save</button>
                <button                         
                    onClick={this.clearHandler}
                    data-element='clear' 
                    className={styles.button}
                >Delete all</button>
                
                {Object.entries(this.props.maps).map(([id, item], index) => 
                    <button key={index} className={styles.button} onClick={() =>{this.setCurrentMapHandler(id)}}>{id}</button>
                )}

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
        clearAll: () => dispatch(clearAll()),
        saveWorkspace: (id, nodes, lines) => dispatch(saveWorkspace(id, nodes, lines)),
        setCurrentMap: (id) => dispatch(setCurrentMap(id))
    }
}  

export const Sidebar = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarComponent)
