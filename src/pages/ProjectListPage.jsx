import { useDispatch, useSelector } from "react-redux";
import ProjectItem from "../components/Project/ProjectItem";
import MainLayout from "../layout/MainLayout";
import "../style/ProjectListPage.css";
import plus from "../assets/plus.png";
function ProjectListPage() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);
  const handeleAddProject = () => {
    const newCards = {
      queue: [],
      development: [],
      done: [],
    };
    const ID = new Date().valueOf();
    console.log(ID);
    const newProject = {
      id: ID,
      name: "Some list",
      cards: newCards,
      title: "New list",
      board: "board-1",
    };
    dispatch({ type: "ADD_PROJECT", payload: newProject });
  };
  return (
    <>
      <MainLayout>
        <div className="projectlist__page">
          <div className="list_page__header">ВАШИ РАБОЧИЕ ПРОЕКТЫ</div>
          <div className="project__list">
            {list.map((item) => (
              <ProjectItem key={item.id} item={item}></ProjectItem>
            ))}
            <div className="project__item create" onClick={handeleAddProject}>
              <span>Создать Проект</span>
              <img src={plus} alt="" />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default ProjectListPage;
