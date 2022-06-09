import "./scss/app.scss";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Pizza from "./components/Pizza";
import pizzas from "./pizzas.json";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content-top">
            <Categories />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((item) => (
              <Pizza
                key={item.id}
                title={item.title}
                price={item.price}
                url={item.imageUrl}
                sizes={item.sizes}
                types={item.types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
