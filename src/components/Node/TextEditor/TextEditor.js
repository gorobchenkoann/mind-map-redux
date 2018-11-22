import React from 'react';
import { connect } from 'react-redux';
import { Editor } from 'slate-react';
import { editNodeText } from '../../../actions';

import styles from './TextEditor.scss';


export class TextEditorComponent extends React.Component {
    render() {
        let { value, nodeId, editNodeText } = this.props;
        return (
            <>
            <Editor 
                className={styles.editor} 
                value={value}   
                onChange={(e) => editNodeText(nodeId, e.value)}                   
            />
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editNodeText: (id, text) => dispatch(editNodeText(id, text))
    }
}

export const TextEditor = connect(
    null,
    mapDispatchToProps
)(TextEditorComponent)
