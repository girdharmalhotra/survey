import React from 'react';
import { Provider } from 'react-redux';
import * as enzyme from 'enzyme';
import { store } from 'store';

import Survey from './index';

describe('<Survey />',function(){

  let $comp = enzyme.mount(
    <Provider store={ store }>
      <Survey />
    </Provider>
  );

  test('renders without throwing',function(){
    expect($comp.exists()).toBe(true);
  });

});
