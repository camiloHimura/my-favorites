import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Row from './Row.jsx'

test('shows the children when the checkbox is checked', () => {
  const {queryByText, getByLabelText, getByText} = render(<Row><div>Test</div></Row>);

  console.log('queryByText("test")', queryByText("test"))
  expect(getByText(testMessage)).toBeInTheDocument()
})