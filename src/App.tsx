// Routing
import { Route, Routes } from "react-router-dom";
// Bootstrap
import { Container } from "react-bootstrap";
// Context
import { ShoppingCardProvider } from "./context/ShoppingCartContext";
// Pages
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
// Components
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <ShoppingCardProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/store"
            element={<Store />}
          />
          <Route
            path="/about"
            element={<About />}
          />
        </Routes>
      </Container>
    </ShoppingCardProvider>
  );
}
