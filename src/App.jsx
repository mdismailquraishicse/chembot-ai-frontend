import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Register from './pages/Register'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="container">
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
                }
            />
        
        <Route
          path="/quiz"
          element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
                }
            />

        <Route
          path="/register"
          element={
            <Register />
                }
            />

      </Routes>
    </div>
  )
}

export default App
