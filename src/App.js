import React from 'react';
import logo from './logo.svg';
import TdClient from 'tdweb/dist/tdweb';
import './App.css';

class App extends React.Component{

    handleCompileTdlib = async event => {
        event.preventDefault();

        console.log('compileStreaming start');
        const t0 = performance.now();
        const fetchPromise = fetch('ef5b7375afcb3e32ba4066a0003c699c.wasm');
        const module = await WebAssembly.compileStreaming(fetchPromise);
        console.log('compileStreaming finish time=' + (performance.now() - t0));
    };

    handleInstantiateTdlib = async event => {
        event.preventDefault();

        console.log('start tdlib');
        let options = {
            logVerbosityLevel: 1,
            jsLogVerbosityLevel: 3,
            mode: 'wasm',
            prefix: 'tdlib',
            readOnly: false,
            isBackground: false,
            useDatabase: false
        };

        this.client = new TdClient(options);
        this.client.onUpdate = update => {

        };
    };

    handleInstantiateFibonacchi = async event => {
        event.preventDefault();

        console.log('instantiateStreaming start');
        const t0 = performance.now();
        const fetchPromise = fetch('fibonacci.wasm');
        const { instance } = await WebAssembly.instantiateStreaming(fetchPromise);
        console.log('instantiateStreaming finish time=' + (performance.now() - t0));
        const result = instance.exports.fibonacci(42);
        console.log(result);
    };

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <button onClick={this.handleCompileTdlib}>compile tdlib</button>
                    <button onClick={this.handleInstantiateTdlib}>instantiate tdlib</button>
                    <button onClick={this.handleInstantiateFibonacchi}>instantiate fib</button>
                </header>
            </div>
        );
    }
}

export default App;
