import React from 'react';
import { connect } from 'react-redux';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { MdFormatListBulleted, MdFormatListNumbered, MdAttachment } from 'react-icons/md';
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

    setListBlock = () => {
        let isList = this.editorRef.value.blocks.some(block => block.type === 'list_item');
        if (isList) {
            this.editorRef.setBlocks('paragraph');
        } else {
            this.editorRef.setBlocks('list_item');
        }        
    }

    setOrderedListBlock = () => {
        let isList = this.editorRef.value.blocks.some(block => block.type === 'ordered_list_item');
        if (isList) {
            this.editorRef.setBlocks('paragraph');
        } else {
            this.editorRef.setBlocks('ordered_list_item');
        }        
    }

    setLinkBlock = () => {

    }

    removeNode = e => {
        let id = e.target.parentNode.parentNode.getAttribute('id');
        this.props.dispatch(removeNode(id));
    }

    editorChangeHandler = (e, id) => {
        this.props.dispatch(editNodeText(id, e.value))
    }

    keyDownHandler = (e, editor, next) => {
        if (e.ctrlKey) {
            switch (e.keyCode) {
                case 66:
                    this.setBoldMark();
                    break;
                case 73:
                    this.setItalicMark();
                    break;
                case 85:
                    e.preventDefault();
                    this.setUnderlineMark();
                    break;
                case 83:
                    e.preventDefault();
                    this.setStrikeMark();
                    break;
            }
        }
        next();
    }
    
    // TODO: fix numbers in ordered list

    render() {
        let { value, nodeId } = this.props;
        return (
            <>
            <div className={styles.toolbar}>
                <button onClick={this.setBoldMark} title='Bold (ctrl+b)'><b>B</b></button>
                <button onClick={this.setItalicMark} title='Italic (ctrl+i)'><i>I</i></button>
                <button onClick={this.setUnderlineMark} title='Undeline (ctrl+u)'><u>U</u></button>
                <button onClick={this.setStrikeMark} title='Strikethrough (ctrl+s)'><s>S</s></button>

                <button onClick={this.setListBlock}><MdFormatListBulleted /></button>
                <button onClick={this.setOrderedListBlock}><MdFormatListNumbered /></button>
                <button onClick={this.setLinkBlock}><MdAttachment /></button>

                <a tabIndex='0' onClick={this.removeNode} title='Delete node'>x</a>
            </div>
            <Editor 
                ref={(el) => {this.editorRef = el}}
                className={styles.editor} 
                value={Value.fromJSON(value)}   
                onKeyDown={this.keyDownHandler}   
                onChange={e => this.editorChangeHandler(e, nodeId)}
                renderMark={this.renderMark} 
                renderNode={this.renderNode}             
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

    renderNode = (props, editor, next) => {
        switch (props.node.type) {
            case 'list_item':
                return <ul {...props.attributes}><li>{props.children}</li></ul>
            case 'ordered_list_item':
                return <ol {...props.attributes}><li>{props.children}</li></ol>
            default:
                return next()
        }
    }
    
}

export const TextEditor = connect()(TextEditorComponent)
