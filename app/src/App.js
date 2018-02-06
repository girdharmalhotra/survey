'use strict';

/*
** Main App Component to render the whole app.
** This component includes the Routes defined in Routes.js
*/

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Survey from 'views/Survey';
import 'theme';

const app = (
  <Provider store={ store }>
    <Survey />
  </Provider>
);

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (app);
  }
}

export default App;
