import "./scss/app.scss";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Pizza from "./components/Pizza";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Categories />
      <Pizza price={395} title={"Чизбургер-пицца"} />
    </div>
  );
}

export default App;
