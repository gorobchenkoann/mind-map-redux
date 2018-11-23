import React from 'react';
import { connect } from 'react-redux';
import { editNodeTitle } from '../../../actions';
import styles from './Header.scss';

export class HeaderContainer extends React.Component {
    render() {
        return (
            <div
                data-element='header'
                className={styles.header}
            >
                {console.log(this.props.editNodeTitle)}
                <input 
                    className={styles.input}
                    type='text' 
                    value={this.props.title}
                    onChange={(e) => this.props.editNodeTitle(id, e.target.value)}
                ></input>                
                {this.props.children}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editNodeTitle: (id, title) => dispatch(editNodeTitle(id, title))
    }
}

export const Header = connect(
    null,
    mapDispatchToProps
)(HeaderContainer)
