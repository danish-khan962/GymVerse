import "./App.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import News from "./pages/News"
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Fitness from "./pages/Fitness";
import Aibot from "./pages/Aibot";
import ExerciseDetail from "./pages/ExerciseDetail";
import Bmi from "./pages/Bmi";
import Games from "./pages/Games";
import Memory from "./components/games/memory";
import Catch from "./components/games/Catch";
import Tracker from "./pages/Tracker";
import "./index.css"
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { useAuthStore } from "./context/store";
import AdminDashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Profile from './pages/admin/Profile'
import { ChakraProvider } from '@chakra-ui/react'
import Footer from "./components/footer";



function App() {
  const { isLoaded, user } = useUser()
  const { setUser } = useAuthStore()
  return (
    <div>


      <Routes>
        <Route path="/" element={<ChakraProvider><Home /></ChakraProvider>} />
        <Route path="/news" element={<ChakraProvider>
          <News />
        </ChakraProvider>} />
        <Route path="/Contact" element={<ChakraProvider>
          <Contact />
        </ChakraProvider>} />
        <Route path="/Fitness" element={<Fitness />} />
       
        <Route path="/Bmi" element={<ChakraProvider>
          <Bmi />
        </ChakraProvider>} />
        <Route path="/Fitness/exercise/:id" element={
          <ExerciseDetail />
        } />
        <Route path="/Aibot" element={<ChakraProvider>
          <Aibot />
        </ChakraProvider>} />
        <Route path="/Games" element={<ChakraProvider>
          <Games />
        </ChakraProvider>} />
        <Route path="/Memory" element={<ChakraProvider>
          <Memory />
        </ChakraProvider>} />
        <Route path="/Catch" element={<ChakraProvider>
          <Catch />
        </ChakraProvider>} />
        <Route path="/Tracker/*" element={<ChakraProvider>
          <ProtectedRoute><Tracker /></ProtectedRoute>
        </ChakraProvider>} />
        <Route path="/login" element={!user ? <ChakraProvider>
          <Login />
        </ChakraProvider> : ""} />
        <Route path="/admin-dashboard/*" element={<ChakraProvider>
          <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
        </ChakraProvider>} />
        <Route path="/profile/*" element={user ? <ChakraProvider>
          <Profile />
        </ChakraProvider> : <Navigate to={'/'} />} />
      </Routes>
    </div>

  );
}

export default App;
