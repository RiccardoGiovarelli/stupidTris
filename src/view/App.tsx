import React from 'react';
import './App.scss';

interface AppState {
}

export default class App extends React.Component<{}, AppState> {

    constructor(props: any) {
        super(props);
    }

    // React render
    public render() {
        return <>
            <div className="app__container">

            </div>
        </>
    }
}
