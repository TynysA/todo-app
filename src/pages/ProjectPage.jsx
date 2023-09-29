import { NavLink, useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../style/ProjectPage.css";
import TaskList from "../components/Task/TaskList";
import TaskModal from "../components/Task/TaskModal";
function ProjectPage() {
  const list = useSelector((state) => state.list);
  const { id } = useParams();
  const [info, setInfo] = useState([]);
  const [queue, setqueue] = useState([]);
  const [development, setDevelopment] = useState([]);
  const [done, setDone] = useState([]);
  useEffect(() => {
    const foundItem = list.find((item) => item.id === Number(id));
    let info = foundItem;
    setqueue(info.cards.queue);
    setDevelopment(info.cards.development);
    setDone(info.cards.done);
    setInfo(info.cards);
  }, []);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handeleOpenModal = (item) => {
    console.log("item");
    setSelectedTask(item);
    setIsModalOpen(true);
  };

  const handeleCloseModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <MainLayout>
        <div className="project__container">
          {info.map((card, index) => (
            <TaskList
              title={card.title}
              info={card.info}
              onTaskClick={handeleOpenModal}
            ></TaskList>
          ))}
          {/* <TaskList
            title={"queue"}
            info={queue}
            onTaskClick={handeleOpenModal}
          ></TaskList>
          <TaskList
            title={"development"}
            info={development}
            onTaskClick={handeleOpenModal}
          ></TaskList>
          <TaskList
            title={"done"}
            info={done}
            onTaskClick={handeleOpenModal}
          ></TaskList> */}
        </div>
        <TaskModal
          isOpen={isModalOpen}
          onClose={handeleCloseModal}
          item={selectedTask}
        />
      </MainLayout>
    </>
  );
}

export default ProjectPage;
