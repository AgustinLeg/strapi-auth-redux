import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/ui/Navbar'
import { Home } from './pages/home/Home'
import { Profile } from './pages/profile/Profile'
import { NotFound } from './pages/404/NotFound'
import { ProtectedRoute } from './utils/ProtectedRoute'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Rutas publicas */}
        <Route path="/" element={<Home />} />

        {/* Rutas privadas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Profile />} />
          <Route path="/products" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
