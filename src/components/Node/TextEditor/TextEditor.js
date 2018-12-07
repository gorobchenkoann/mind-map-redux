import React from 'react';
import { connect } from 'react-redux';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { editNodeText, removeNode } from '../../../redux/actions';

import styles from './TextEditor.scss';

function BoldMark(props) {
    return <strong>{props.children}</strong>
}

function ItalicMark(props) {
    return <i>{props.children}</i>
}

function UnderlineMark(props) {
    return <u>{props.children}</u>
}

function StrikeMark(props) {
    return <s>{props.children}</s>
}

export class TextEditorComponent extends React.Component {
    setBoldMark = () => {
        this.editorRef.toggleMark('bold');
    }

    setItalicMark = () => {
        this.editorRef.toggleMark('italic');
    }

    setUnderlineMark = () => {
        this.editorRef.toggleMark('underline');
    }

    setStrikeMark = () => {
        this.editorRef.toggleMark('strike');
    }   

    removeNode = e => {
        let id = e.target.parentNode.parentNode.getAttribute('id');
        this.props.dispatch(removeNode(id));
    }

    editorChangeHandler = (e, id) => {
        this.props.dispatch(editNodeText(id, e.value))
    }
    

    render() {
        let { value, nodeId } = this.props;
        return (
            <>
            <div className={styles.toolbar}>
                <button onClick={this.setBoldMark}><b>B</b></button>
                <button onClick={this.setItalicMark}><i>I</i></button>
                <button onClick={this.setUnderlineMark}><u>U</u></button>
                <button onClick={this.setStrikeMark}><s>S</s></button>

                <a onClick={this.removeNode} title='Delete node'>x</a>
            </div>
            <Editor 
                ref={(el) => {this.editorRef = el}}
                className={styles.editor} 
                value={Value.fromJSON(value)}   
                // onChange={onChange}   
                onChange={e => this.editorChangeHandler(e, nodeId)}
                renderMark={this.renderMark}              
            />
            </>
        )
    }

    renderMark = (props, editor, next) => {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />
            case 'italic':
                return <ItalicMark {...props} />
            case 'underline':
                return <UnderlineMark {...props} />
            case 'strike':
                return <StrikeMark {...props} />
            default:
                return next();
        }
    }
}

export const TextEditor = connect()(TextEditorComponent)
