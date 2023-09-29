import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectPage from "./pages/ProjectPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  async function localList() {
    const local__list = await localStorage.getItem("list");
    if (local__list) {
      const resultArray = JSON.parse(local__list);
      dispatch({ type: "UPDATE_LIST", payload: resultArray });
    }
  }
  useEffect(() => {
    localList();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<ProjectListPage />} />
      <Route path="/project/:id" element={<ProjectPage />} />
    </Routes>
  );
}

export default App;
