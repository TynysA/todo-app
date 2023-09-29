import { NavLink, useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../style/ProjectPage.css";
import plus from "../assets/plus.png";
import close from "../assets/close.png";
import TaskModal from "../components/Task/TaskModal";
import TaskFooter from "../components/Task/TaskFooter";
function ProjectPage() {
  const list = useSelector((state) => state.list);
  const { id } = useParams();
  const [info, setInfo] = useState([]);
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentBoard, setCurrentBoard] = useState();
  const [currentItem, setCurrentItem] = useState();
  const dragOverHandler = (e, card, item) => {
    e.preventDefault();
    if (e.target.className === "task__item") {
      e.target.style.boxShadow = "0 4px 3px gray";
      // setCurrentBoard(card);
      // setCurrentItem(item);
    }
  };
  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = "none";
    e.target.style.boxShadow = "0px 1px 1px #091e4240, 0px 0px 1px #091e424f";
  };
  function dragStartHandler(e, card, item) {
    setCurrentBoard(card);
    setCurrentItem(item);
  }
  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none";
    e.target.style.boxShadow = "0px 1px 1px #091e4240, 0px 0px 1px #091e424f";
  };
  const dropHandler = (e, card, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.info.indexOf(currentItem);
    currentBoard.info.splice(currentIndex, 1);
    const dropindex = card.info.indexOf(item);
    card.info.splice(dropindex + 1, 0, currentItem);
    setInfo(
      cards.map((i) => {
        if (i.id === card.id) {
          return card;
        }
        if (i.id === currentBoard.id) {
          return currentBoard;
        }
        return i;
      })
    );
  };

  useEffect(() => {
    const foundItem = list.find((item) => item.id === Number(id));
    let info = foundItem;
    setInfo(info.cards);
    setCards(info.cards);
  }, [id, list]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskTitle, setSelectedTaskTitle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handeleOpenModal = (item, title) => {
    setSelectedTask(item);
    setSelectedTaskTitle(title);
    setIsModalOpen(true);
  };

  const handeleCloseModal = () => {
    setSelectedTask(null);
    setSelectedTaskTitle(null);
    setIsModalOpen(false);
  };
  // const handeleAddTask = (e, card) => {
  //   const newTitle = inputRef.current.value;
  //   if (!inputRef.current.value) {
  //     alert("Please write Something");
  //     return;
  //   }
  //   console.log(card);
  //   const newCard = {
  //     number: new Date().valueOf(),
  //     title: newTitle,
  //     dateCreate: new Date(),
  //     dateEnd: null,
  //     description: "",
  //     files: null,
  //     comment: [],
  //     subcards: [],
  //   };
  //   const foundItemIndex = list.findIndex((item) => item.id === Number(id));

  //   if (foundItemIndex !== -1) {
  //     // Clone the list to avoid mutating the state directly
  //     const updatedList = [...list];
  //     console.log(updatedList);
  //     // // Add the new card to the appropriate status (queue, development, or done)
  //     // if (title === "done") {
  //     //   updatedList[foundItemIndex].cards.done.push(newCard);
  //     // }
  //     // if (title === "development") {
  //     //   updatedList[foundItemIndex].cards.development.push(newCard);
  //     // }
  //     // if (title === "queue") {
  //     //   updatedList[foundItemIndex].cards.queue.push(newCard);
  //     // }
  //     // // Dispatch an action to update the state
  //     // dispatch({ type: "UPDATE_LIST", payload: updatedList });
  //   }
  //   setOpen(false);
  // };
  return (
    <>
      <MainLayout>
        <div className="project__container">
          {info.map((card) => (
            <div className="project__tasks">
              <div className="tasks__title">
                {card.title.charAt(0).toUpperCase() + card.title.slice(1)}
              </div>
              <div className="tasks">
                {card.info?.map((item) => (
                  // <TaskItem
                  //   onTaskClick={onTaskClick}
                  //   key={item.id}
                  //   item={item}
                  // ></TaskItem>
                  <div
                    onDragOver={(e) => dragOverHandler(e, card, item)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragStart={(e) => dragStartHandler(e, card, item)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDrop={(e) => dropHandler(e, card, item)}
                    draggable={true}
                    className="task__item"
                    onClick={() => handeleOpenModal(item, card.title)}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
              <TaskFooter card={card} info={info}></TaskFooter>
            </div>
          ))}
        </div>
        <TaskModal
          isOpen={isModalOpen}
          onClose={handeleCloseModal}
          item={selectedTask}
          itemTitle={selectedTaskTitle}
        />
      </MainLayout>
    </>
  );
}

export default ProjectPage;
