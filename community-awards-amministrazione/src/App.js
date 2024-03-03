import React from 'react';
import { Provider } from 'react-redux';

import Routes from './routes/Routes';

import { store } from './redux/ConfigureStore';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App overflow-hidden">
        <Routes />
      </div>
    </Provider>
  );
};

export default App;
