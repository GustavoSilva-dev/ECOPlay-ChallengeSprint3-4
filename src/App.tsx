import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import ErrorPage from './pages/ErrorPage'
import QuemSomos from './pages/QuemSomos'
import Solucao from './pages/Solucao'
import Fluxograma from './pages/Fluxograma'
import Contato from './pages/Contato'
import FAQs from './pages/FAQs'
import Prototipo from './pages/Prototipo'
import ContatoDinamico from './pages/ContatoDinamico'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sobre" element={<Sobre />}></Route>
        <Route path="/quem-somos" element={<QuemSomos />}></Route>
        <Route path="/solucao" element={<Solucao />}></Route>
        <Route path="/fluxograma" element={<Fluxograma />}></Route>
        <Route path="/contato" element={<Contato />}></Route>
        <Route path="/quem-somos/:id" element={<ContatoDinamico />}></Route>
        <Route path="/faq" element={<FAQs />}></Route>
        <Route path="/prototipo" element={<Prototipo />}></Route>
        <Route path="/*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
