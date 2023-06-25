import React, { useState } from 'react';
import './button.css';

const Button = (props) => {
    let [hover, setHover] = useState(false);
    let fill = hover === false ? props.fill : props.hoverFill;
    let color =
        hover === false
            ? props.color || 'black'
            : props.hoverColor || props.color || 'black';
    let border =
        hover === false ? props.border || 'none' : props.hoverBorder || 'none';
    let text = hover === false ? props.text : props.hoverText || props.text;

    const toggleHover = () => {
        setHover(!hover);
    };

    return (
        <button
            className="button-comp"
            style={{
                backgroundColor: fill,
                color: color,
                padding: `${props.py}px ${props.px}px`,
                margin: `${props.my}px 0`,
                border: border,
                fontSize: `${props.fontSize}px` || '18px',
                width: '100%',
               

                
            }}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            onClick={props.clickFn}
            type={props.type || 'button'}
        >
            {text}
        </button>
    );
};

export default Button;