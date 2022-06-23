import { useEffect, useState } from "react";
import Pizza from "../components/Pizza";
import Sort from "../components/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import Categories from "../components/Categories";
import { Pagination } from "../components/Pagination";
import { useContext } from "react";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sort.sortProperty.replace("-", "");
  const categories = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://62a3372021232ff9b21b698d.mockapi.io/items?page=${currentPage}&limit=4&${categories}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => <Pizza key={obj.id} {...obj} />)}
      </div>
      <Pagination onPageChange={(number) => setCurrentPage(number)} />
    </>
  );
};
