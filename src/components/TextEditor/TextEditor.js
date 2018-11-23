import React from 'react';
import { Editor } from 'slate-react';

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

export class TextEditor extends React.Component {
    editorRef = React.createRef();

    setBoldMark = () => {
        this.editorRef.current.toggleMark('bold');
    }

    setItalicMark = () => {
        this.editorRef.current.toggleMark('italic');
    }

    setUnderlineMark = () => {
        this.editorRef.current.toggleMark('underline');
    }

    setStrikeMark = () => {
        this.editorRef.current.toggleMark('strike');
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

    render() {
        let { value, onChange } = this.props;
        return (
            <>
            <div className={styles.header}>
                <button onClick={this.setBoldMark}><b>B</b></button>
                <button onClick={this.setItalicMark}><i>I</i></button>
                <button onClick={this.setUnderlineMark}><u>U</u></button>
                <button onClick={this.setStrikeMark}><s>S</s></button>
            </div>
            <Editor 
                ref={this.editorRef}
                className={styles.editor} 
                value={value}   
                onChange={onChange}  
                // onKeyDown={this.onKeyDown}   
                renderMark={this.renderMark}              
            />
            </>
        )
    }
}
