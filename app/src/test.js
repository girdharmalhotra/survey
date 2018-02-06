import React from 'react';
import * as enzyme from 'enzyme';

import App from './App';
import reducers from 'reducers';

describe('<App />',function(){

  let $comp = enzyme.shallow(<App />);

  test('renders without throwing',function(){
    expect($comp.exists()).toBe(true);
  });

});

describe('reducers',function(){

  test('exports a function',function(){
    expect( typeof reducers ).toBe('function');
  });

});
