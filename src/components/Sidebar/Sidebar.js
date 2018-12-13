import React from 'react';
import { connect } from 'react-redux';
import { clearWorkspace, clearAll, saveWorkspace, editWorkspace, setCurrentMap, filterVisible } from '../../redux/actions';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { createId } from '../../utils/createId';
import { MdNoteAdd, MdDeleteForever, MdSave } from 'react-icons/md';
import styles from './Sidebar.scss';

class SidebarComponent extends React.Component {   
    saveMap = () => {           
        let id = createId();  
        // if there's something to save
        if (!isObjectEmpty(this.props.nodes)) {
            if (!this.currentMap) {
                this.currentMap = id;  
            } 

            let nodes = Object.entries(this.props.nodes)
                .filter(([id, node]) => node.visible === true)
                .reduce((prev, [id]) => {return [...prev, id]}, [])
            let lines = Object.entries(this.props.lines)
                .filter(([id, line]) => line.visible === true)
                .reduce((prev, [id]) => {return [...prev, id]}, [])
            this.props.saveWorkspace(this.currentMap, nodes, lines); 

            let lsMaps = JSON.parse(localStorage.getItem('maps'));                
                localStorage.setItem('maps', 
                    JSON.stringify({...lsMaps, 
                        [this.currentMap]: {
                            nodes: nodes,
                            lines: lines
                        }
                    }));                
            let lsNodes = JSON.parse(localStorage.getItem('nodes'));           
                localStorage.setItem('nodes', 
                    JSON.stringify({...lsNodes, ...this.props.nodes})
                );    
            let lsLines = JSON.parse(localStorage.getItem('lines'));
                localStorage.setItem('lines',
                    JSON.stringify({...lsLines, ...this.props.lines})
                );  
                       
        } 
    }
    
    createNewMap = () => {
        this.currentMap = null;
        this.props.clearWorkspace();        
    }

    removeAllMaps = () => {        
        this.currentMap = null;
        this.props.clearAll();
        localStorage.clear();
    }

    setCurrentMapHandler = (id) => {
        this.currentMap = id;
        let currentMapNodes = this.props.maps[id].nodes;
        let currentMapLines = this.props.maps[id].lines;
        this.props.clearWorkspace();
        this.props.filterVisible('nodes', currentMapNodes);
        this.props.filterVisible('lines', currentMapLines);
    }

    render() {
        return (
            <div className={styles.sidebar}>
                <div className={styles.buttonWrap}>
                    <button
                        className={styles.button}
                        onClick={this.createNewMap}
                        title='New map'
                    ><MdNoteAdd /></button>
                    <button                        
                        className={styles.button}
                        onClick={this.saveMap}
                        title='Save map'
                    ><MdSave /></button>
                    <button                         
                        onClick={this.removeAllMaps}
                        data-element='clear' 
                        className={styles.button}
                        title='Delete ALL maps'
                    ><MdDeleteForever /></button>
                </div>
                
                {Object.entries(this.props.maps).map(([id, item], index) => 
                    <div className={styles.itemsWrap} key={index} >
                    <button                         
                        className={styles.remove} 
                        title='Delete current map'
                    ><MdDeleteForever /></button>
                    <button
                        className={styles.item} 
                        onClick={() =>{this.setCurrentMapHandler(id)}}
                    >{id}</button>
                    </div>
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
        filterVisible: (itemType, items) => dispatch(filterVisible(itemType, items))
    }
}  

export const Sidebar = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarComponent)
