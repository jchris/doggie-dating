import { Routes, Route, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "jazz-react";

// Components
import { Header } from "./components/Header";

// Pages
import SplashPage from "./pages/SplashPage";
import HomePage from "./pages/HomePage";
import DogProfilePage from "./pages/DogProfilePage";
import CreateEditDogPage from "./pages/CreateEditDogPage";
import ConnectionsPage from "./pages/ConnectionsPage";

// Authenticated route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useIsAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <div className="min-h-screen bg-[#FDFBEE] bg-opacity-30">
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          
          <Route path="/dog/:dogId" element={<DogProfilePage />} />
          
          <Route path="/dog/new" element={
            <ProtectedRoute>
              <CreateEditDogPage />
            </ProtectedRoute>
          } />
          
          <Route path="/dog/:dogId/edit" element={
            <ProtectedRoute>
              <CreateEditDogPage />
            </ProtectedRoute>
          } />
          
          <Route path="/dog/:dogId/connections" element={
            <ProtectedRoute>
              <ConnectionsPage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
