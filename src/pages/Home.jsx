import { useEffect, useState } from "react";
import Pizza from "../components/Pizza";
import Sort from "../components/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import Categories from "../components/Categories";
import { Pagination } from "../components/Pagination";

export const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sort: "rating",
  });
  const order = sortType.sort.includes("-") ? "asc" : "desc";
  const sortBy = sortType.sort.replace("-", "");
  const categories = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";
  const pizzas = items.map((obj) => <Pizza key={obj.id} {...obj} />);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://62a3372021232ff9b21b698d.mockapi.io/items?page=${currentPage}&limit=4${categories}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClick={(i) => setCategoryId(i)} />
        <Sort value={sortType} onSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : pizzas}
      </div>
      <Pagination onPageChange={(number) => setCurrentPage(number)} />
    </>
  );
};
