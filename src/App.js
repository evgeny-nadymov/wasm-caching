import React from 'react';
import logo from './logo.svg';
import TdClient from 'tdweb/dist/tdweb';
import './App.css';

class App extends React.Component{

    handleInstantiateFibonacchi = async event => {
        event.preventDefault();

        const fetchPromise = fetch('fibonacci.wasm');
        const { instance } = await WebAssembly.instantiateStreaming(fetchPromise);
        const result = instance.exports.fibonacci(42);
        console.log(result);
    };

    handleInstantiateTdlib = async event => {
        event.preventDefault();

        const fetchPromise = fetch('ef5b7375afcb3e32ba4066a0003c699c.wasm');
        const module = await WebAssembly.compileStreaming(fetchPromise);
        console.log(module);

        // let options = {
        //     logVerbosityLevel: 1,
        //     jsLogVerbosityLevel: 3,
        //     mode: 'wasm',
        //     prefix: 'tdlib',
        //     readOnly: false,
        //     isBackground: false,
        //     useDatabase: false
        // };
        //
        // this.client = new TdClient(options);
        // this.client.onUpdate = update => {
        //
        // };
    };

    generateBigWasm = async event => {
        // event.preventDefault();

//         let str = '';
//         for (let i = 0; i < 1000; i++) {
//             str += `
//
// WASM_EXPORT
// int fibonacci${i}(int n) {
//   int i, t, a = 0, b = 1;
//   for (i = 0; i < n; i++) {
//     t = a + b;
//     a = b;
//     b = t;
//   }
//   return b;
// }`;
//         }
//         console.log(str);
    };

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <button onClick={this.handleInstantiateTdlib}>instantiate tdlib</button>
                    <button onClick={this.handleInstantiateFibonacchi}>instantiate fib</button>
                </header>
            </div>
        );
    }
}

export default App;
