import React from 'react';
import { connect } from 'react-redux';
import { clearWorkspace, clearAll, saveWorkspace, editWorkspace, setCurrentMap, filterVisible } from '../../redux/actions';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { createId } from '../../utils/createId';
import { MdNoteAdd, MdDeleteForever, MdSave } from 'react-icons/md';
import styles from './Sidebar.scss';

class SidebarComponent extends React.Component {   
    saveHandler = () => {           
        let id = createId();  
        // if there's something to save
        if (!isObjectEmpty(this.props.nodes)) {
            if (!this.currentMap) {
                this.currentMap = id;  
            } 

            let nodes = Object.entries(this.props.nodes)
                .filter(([id, node]) => node.visible === true)
                .reduce((prev, [id]) => {return [...prev, id]}, [])
            let lsMaps = JSON.parse(localStorage.getItem('maps'));                
                localStorage.setItem('maps', 
                    JSON.stringify({...lsMaps, 
                        [this.currentMap]: nodes
                    }));                
            let lsNodes = JSON.parse(localStorage.getItem('nodes'));           
                localStorage.setItem('nodes', 
                    JSON.stringify({...lsNodes, ...this.props.nodes})
                );                         

            this.props.saveWorkspace(this.currentMap, nodes, this.props.lines);            
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
        this.currentMap = id;
        let currentMapNodes = this.props.maps[id];
        this.props.clearWorkspace();
        this.props.filterVisible(currentMapNodes);
    }

    render() {
        return (
            <div className={styles.sidebar}>
                <div className={styles.buttonWrap}>
                    <button
                        className={styles.button}
                        onClick={this.newHandler}
                        title='New map'
                    ><MdNoteAdd /></button>
                    <button                        
                        className={styles.button}
                        onClick={this.saveHandler}
                        title='Save map'
                    ><MdSave /></button>
                    <button                         
                        onClick={this.clearHandler}
                        data-element='clear' 
                        className={styles.button}
                        title='Delete ALL maps'
                    ><MdDeleteForever /></button>
                </div>
                
                {Object.entries(this.props.maps).map(([id, item], index) => 
                    <button key={index} className={styles.item} onClick={() =>{this.setCurrentMapHandler(id)}}>{id}</button>
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
        editWorkspace: (id, nodes, lines) => dispatch(editWorkspace(id, nodes, lines)),
        setCurrentMap: (id) => dispatch(setCurrentMap(id)),
        filterVisible: (nodes) => dispatch(filterVisible(nodes))
    }
}  

export const Sidebar = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarComponent)
