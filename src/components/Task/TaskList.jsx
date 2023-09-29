import { NavLink, useParams } from "react-router-dom";
import "../../style/ProjectListPage.css";
import plus from "../../assets/plus.png";
import close from "../../assets/close.png";
import TaskItem from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
function TaskList({ card, title, onTaskClick }) {
  const { id } = useParams();
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const inputRef = useRef("");
  const [open, setOpen] = useState(false);
  const [currentBoard, setCurrentBoard] = useState();
  const [currentItem, setCurrentItem] = useState();
  const [infoList, setInfoList] = useState(card.info);
  let current;
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
    // console.log(e.target);
    // console.log(card);
    // console.log(item);
    setCurrentBoard(card);
    setCurrentItem(item);
  }
  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none";
    e.target.style.boxShadow = "0px 1px 1px #091e4240, 0px 0px 1px #091e424f";
  };
  const dropHandler = (e, card, item) => {
    e.preventDefault();

    console.log(e.target);
    console.log(item);
    console.log(current);
    const currentIndex = card.info.indexOf(item);
    console.log(currentIndex);
    // currentBoard.splice(currentIndex, 1);
    // const dropindex = infoList.indexOf(item);
    // infoList.splice(dropindex + 1, 0, currentItem);
    // setInfoList(
    //   list.map((i) => {
    //     if (i.id === infoList.id) {
    //       return infoList;
    //     }
    //     if (i.id === currentBoard.id) {
    //       return currentBoard;
    //     }
    //   })
    // );
    // console.log(infoList);
  };

  const handeleAddTask = () => {
    const newTitle = inputRef.current.value;
    if (!inputRef.current.value) {
      alert("Please write Something");
      return;
    }
    const newCard = {
      number: new Date().valueOf(),
      title: newTitle,
      dateCreate: new Date(),
      dateEnd: null,
      description: "",
      files: null,
      status: title,
      comment: [],
      subcards: [],
    };
    const foundItemIndex = list.findIndex((item) => item.id === Number(id));

    if (foundItemIndex !== -1) {
      // Clone the list to avoid mutating the state directly
      const updatedList = [...list];

      // Add the new card to the appropriate status (queue, development, or done)
      if (title === "done") {
        updatedList[foundItemIndex].cards.done.push(newCard);
      }
      if (title === "development") {
        updatedList[foundItemIndex].cards.development.push(newCard);
      }
      if (title === "queue") {
        updatedList[foundItemIndex].cards.queue.push(newCard);
      }
      // Dispatch an action to update the state
      dispatch({ type: "UPDATE_LIST", payload: updatedList });
    }
    setOpen(false);
  };
  const handeleOpenAddTask = () => {
    setOpen(true);
  };
  const handeleCloseAddTask = () => {
    setOpen(false);
  };
  // const handeleOpen = () => {
  //   onTaskClick(item);
  // };
  return (
    <div className="project__tasks">
      <div className="tasks__title">
        {title.charAt(0).toUpperCase() + title.slice(1)}
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
            onClick={() => onTaskClick(item)}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className="add__task" onClick={handeleOpenAddTask}>
        <img src={plus} alt="" />
        Добавить карточку
      </div>
      {open && (
        <div className="add__task_modal">
          <input
            name="add__task"
            ref={inputRef}
            placeholder="Название карточки"
            className="add__task_modal_title"
          />
          <button onClick={handeleAddTask} type="submit">
            Добавить карточку
          </button>
          <img
            id="close"
            className="task_modal__close"
            src={close}
            alt=""
            onClick={handeleCloseAddTask}
            srcset=""
          />
        </div>
      )}
    </div>
  );
}

export default TaskList;
