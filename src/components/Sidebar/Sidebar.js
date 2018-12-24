import React from 'react';
import { connect } from 'react-redux';
import { clearWorkspace, saveWorkspace, editWorkspace, setCurrentMap, filterVisible, removeNode } from '../../redux/actions';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { createId } from '../../utils/createId';
import { Button } from './Button/Button';
import { MdNoteAdd, MdDeleteForever, MdSave } from 'react-icons/md';
import styles from './Sidebar.scss';

class SidebarComponent extends React.Component {   
    saveMap = () => {           
        let mapId = createId();  
        // if there's something to save
        if (!isObjectEmpty(this.props.nodes)) { 
            let nodes = Object.entries(this.props.nodes)
                .filter(([id, node]) => node.visible === true)
                .reduce((prev, [id]) => {return [...prev, id]}, [])
            let lines = Object.entries(this.props.lines)
                .filter(([id, line]) => line.visible === true)
                .reduce((prev, [id]) => {return [...prev, id]}, [])

            this.props.setCurrentMap(mapId);
            this.props.saveWorkspace(mapId, nodes, lines);                        
        } 
    }
    
    createNewMap = () => {
        if (!this.props.currentMap && !isObjectEmpty(this.props.nodes)) {
            let userConfirm = window.confirm('The current map will be deleted');
            if (userConfirm) {
                Object.entries(this.props.nodes).map(([id, node]) => {
                    if (node.visible === true) {
                        this.props.removeNode(null, id)
                    }
                });  
                this.props.clearWorkspace();                            
            }
        } else if (this.props.currentMap && !isObjectEmpty(this.props.nodes)) {
            Object.entries(this.props.nodes).map(([id, node]) => {
                // remove unsaved nodes from state.nodes
                if (!this.props.maps[this.props.currentMap].nodes.includes(id) && node.visible) {
                    this.props.removeNode(null, id);
                }
            });
            this.props.clearWorkspace();             
        }       
    }

    setCurrentMapHandler = (id) => {
        let currentMapNodes = this.props.maps[id].nodes;
        let currentMapLines = this.props.maps[id].lines;        
        this.props.clearWorkspace();
        this.props.setCurrentMap(id); // important: setCurrentMap() must follow clearWorkspace(), otherwise there'll be an empty state
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
                </div>
                
                {Object.entries(this.props.maps).map(([id, item], index) => 
                    <Button setCurrentMapHandler={this.setCurrentMapHandler} id={id} key={index}/>
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
        saveWorkspace: (id, nodes, lines) => dispatch(saveWorkspace(id, nodes, lines)),
        editWorkspace: (id, nodes, lines) => dispatch(editWorkspace(id, nodes, lines)),
        setCurrentMap: (id) => dispatch(setCurrentMap(id)),
        filterVisible: (itemType, items) => dispatch(filterVisible(itemType, items)),
        removeNode: (currentMap, id) => dispatch(removeNode(currentMap, id))
    }
}  

export const Sidebar = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarComponent)
