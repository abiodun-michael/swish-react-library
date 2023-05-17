import './App.css'
import { HttpProvider } from 'swish-react-library'
import Example from './Example'

function App() {
  return (
    <HttpProvider config={{ baseURL: 'https://dev-api.deliveryos.com/api/' }}>
      <Example />
    </HttpProvider>
  )
}

export default App
