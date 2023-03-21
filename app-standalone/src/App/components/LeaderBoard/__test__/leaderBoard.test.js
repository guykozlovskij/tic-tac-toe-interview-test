import React from 'react';
import { shallow } from 'enzyme';

import LeaderBoard from '../index';

describe('LeaderBoard', () => {
  it('renders component ', () => {
    const wrapper = shallow(<LeaderBoard leaderBoard={[{roundWinner: 'X'}]}/>);
    expect(wrapper.find('h3').text()).toEqual('Leader Board');
  });
});