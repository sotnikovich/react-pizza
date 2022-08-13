import { useCallback, useEffect, useRef } from "react";
import Pizza from "../components/Pizza";
import Sort, { sortList } from "../components/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import Categories from "../components/Categories";
import { Pagination } from "../components/Pagination";
import { useSelector } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setFilters,
  setPageCount,
} from "../redux/slices/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import {
  fetchPizzas,
  SearchPizzaParams,
  selectPizzaData,
} from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  };

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setPageCount(number));
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          sort: sort || sortList[0],
          currentPage: Number(params.currentPage),
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить питсы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : items.map((obj: any) => <Pizza {...obj} key={obj.id} />)}
        </div>
      )}
      <Pagination value={currentPage} onPageChange={onChangePage} />
    </>
  );
};
