import React from 'react';
import ReactDOM from 'react-dom';
import LoanCalculator from './components/loanCalculator'; 

const rootEl = document.getElementById('root');

const App = () => {
    return (
        <div>
            <LoanCalculator />
        </div>
        );
};

const renderApp = () => {
    ReactDOM.render(
        <App />, rootEl
    );
}

renderApp();

// This checks for local changes and automatically refreshes the browser (hot-reloading)
if (module.hot) {
    module.hot.accept('./components/App.jsx', () => renderApp());
}