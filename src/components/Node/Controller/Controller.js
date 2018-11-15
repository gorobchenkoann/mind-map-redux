import React from 'react';

import styles from './Controller.scss';

export const Controller = ({id, position, mouseOn}) => {
    return (        
        <div 
            style={{
                visibility: mouseOn ? 'visible' : 'hidden'
            }}
            id={`${id}-${position}`} 
            data-element='controller' 
            className={`${styles.controller} ${styles[position]}`}
        ></div>
    )
}