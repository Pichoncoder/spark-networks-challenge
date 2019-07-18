import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TestRenderer, { create } from 'react-test-renderer';
import FilterRange from './filter-range.component';
import { shallow } from 'enzyme';

describe('<FilterRange /> spec', () => {
  it('Snapshot:renders the component', () => {
    const props ={ handleRange: () => true, text: 'Age', filter:"", value: [], min:18 , max:99 } ;

      const container = TestRenderer.create(<FilterRange {...props}></FilterRange>);
      expect(container).toMatchSnapshot();
  });
});