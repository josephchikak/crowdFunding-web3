import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import {ChainId, ThirdwebProvider} from '@thirdweb-dev/react';
import App from './App';
import './index.css';
import {store} from './app/store';
import { Provider } from 'react-redux';
import { StateContextProvider } from './context';



const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
    <ThirdwebProvider desiredChainId={ChainId.Goerli}> 
        <Router>
            <Provider store={store}>
                <StateContextProvider>
                     <App />
                </StateContextProvider>
            </Provider>
        </Router>
    </ThirdwebProvider>
)