import { render, act } from '@testing-library/react'
import { screen } from '@testing-library/dom'

import { App } from './App'

describe('App', () => {
  it('renders the App component', async () => {
    await act(async () => {
      render(<App />)
    })

    expect(screen.getByText(/Entries Tree/i)).toBeInTheDocument()
  })
})
