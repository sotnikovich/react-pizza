import "./scss/app.scss";
import Cart from "./pages/Cart";
import { Home } from "./pages/Home";
import { NotFound } from "./components/NotFound";
import { Routes, Route } from "react-router-dom";
import { FullPizza } from "./pages/FullPizza";
import MainLayout from "./components/layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
