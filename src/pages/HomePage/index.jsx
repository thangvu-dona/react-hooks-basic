import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import queryString from "query-string";
import PostFilterForm from "./components/PostFilterForm";
import Clock from "./components/Clock";
import BetterClock from "./components/BetterClock";
import MagicBox from "./components/MagicBox";

function HomePage() {
  const [todoList, setTodoList] = useState(() => {
    const initTodoList = [
      { id: 1, title: "I love Easy Frontend! 😍" },
      { id: 2, title: "We love Easy Frontend! 🥰" },
      { id: 3, title: "They love Easy Frontend! 🐱‍🏍" },
    ];

    return initTodoList;
  });

  const [postList, setPostList] = useState([]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  // State for filters
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    // ...other filters(_searchTearm, sort,...)
  });

  function handlePageChange(newPage) {
    // Call API to re-fetch data with newPage
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  useEffect(() => {
    async function fetchPostList() {
      try {
        const queryParams = queryString.stringify(filters); // --> '_limit=10&_page=1'
        const requestUrl = `https://js-post-api.herokuapp.com/api/posts?${queryParams}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log("responseJSON", responseJSON);

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch post list");
      }
    }

    console.log("POST list effect");
    fetchPostList();
  }, [filters]);

  useEffect(() => {
    console.log("TODO list effect");
  });

  function handleTodoClick(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };

    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handleFiltersChange(newFilters) {
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }

  const [showClock, setShowClock] = useState(true);

  return (
    <div className="app">
      <h1>React Hooks - Post List | Clock | Magic Color Box</h1>

      <MagicBox />
      <BetterClock />
      {showClock && <Clock />}
      <button
        onClick={() => setShowClock(false)}
        style={{ marginBottom: "20px" }}
      >
        Hide Clock
      </button>

      <PostFilterForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
    </div>
  );
}

export default HomePage;
