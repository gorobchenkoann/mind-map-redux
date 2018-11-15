import React from 'react';

import styles from './Controller.scss';

let positionArr = ['top', 'bottom', 'left', 'right'];

export const Controllers = ({controllerId, mouseOn}) => {
    return (   
        <> 
        {positionArr.map((position, index) => 
            <div 
            key={index}
            id={`${controllerId}-${position}`} 
            data-element='controller' 
            style={{
                visibility: mouseOn ? 'visible' : 'hidden'
            }}            
            className={`${styles.controller} ${styles[position]}`}
            ></div>
        )}        
        </>
    )
}