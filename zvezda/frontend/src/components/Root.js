import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from '../store/store';
import { App } from './App';

export const Root = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider> 
    )
}

const appDiv = document.getElementById('app')
const root = createRoot(appDiv)
root.render(<Root />)