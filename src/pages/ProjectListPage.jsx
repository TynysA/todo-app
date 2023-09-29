import { useDispatch, useSelector } from "react-redux";
import ProjectItem from "../components/Project/ProjectItem";
import MainLayout from "../layout/MainLayout";
import "../style/ProjectListPage.css";
import plus from "../assets/plus.png";
import close from "../assets/close.png";
import { useRef, useState } from "react";
function ProjectListPage() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const inputRef = useRef("");
  const list = useSelector((state) => state.list);
  const handeleAddProject = () => {
    const newTitle = inputRef.current.value;
    if (!inputRef.current.value) {
      alert("Please write Something");
      return;
    }
    const newCards = [
      {
        id: 1,
        title: "queue",
        info: [],
      },
      {
        id: 2,
        title: "development",
        info: [],
      },
      {
        id: 3,
        title: "done",
        info: [],
      },
    ];
    const ID = new Date().valueOf();
    const newProject = {
      id: ID,
      name: "Some list",
      cards: newCards,
      title: newTitle,
      board: "board-1",
    };
    dispatch({ type: "ADD_PROJECT", payload: newProject });
    setOpen(false);
  };
  const handleOpen = (e) => {
    setOpen(true);
  };
  const handeleClose = () => {
    setOpen(false);
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
            {open ? (
              <div className="project__item create__modal">
                <input
                  name="add__task"
                  ref={inputRef}
                  placeholder="Название карточки"
                  className="add__task_modal_title"
                />
                <button onClick={(e) => handeleAddProject(e)} type="submit">
                  Добавить карточку
                </button>
                <img
                  className="task_modal__close"
                  src={close}
                  alt=""
                  onClick={handeleClose}
                  srcset=""
                />
              </div>
            ) : (
              <div className="project__item create" onClick={handleOpen}>
                <span>Создать Проект</span>
                <img src={plus} alt="" />
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default ProjectListPage;
