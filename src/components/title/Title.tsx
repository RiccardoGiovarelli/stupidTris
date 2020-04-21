import React from 'react';
import './Title.scss';

function Title(props: any) {
    return (
        <div className="title__container">
            {props.text}
        </div>
    );
}

export default Title;
