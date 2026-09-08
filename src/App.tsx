import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './components/Header'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
