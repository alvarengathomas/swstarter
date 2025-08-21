import { Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import PersonPage from './pages/PersonPage'
import FilmPage from './pages/FilmPage'
import StatisticsPage from './pages/StatisticsPage'
import Header from './components/shared/Header'

function App() {
  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#ededed' }}>
      <Header />
      <main className="max-w-5xl mx-auto px-6">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/person/:id" element={<PersonPage />} />
          <Route path="/film/:id" element={<FilmPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App