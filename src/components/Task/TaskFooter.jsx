import { NavLink, useParams } from "react-router-dom";
import "../../style/ProjectListPage.css";
import plus from "../../assets/plus.png";
import close from "../../assets/close.png";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
function TaskFooter({ card, info }) {
  const [newOpen, setNewOpen] = useState(false);
  const inputRef = useRef("");
  const dispatch = useDispatch();
  const { id } = useParams();
  //  const handeleAddTask = (e, card) => {
  //     const newTitle = inputRef.current.value;
  //     if (!inputRef.current.value) {
  //       alert("Please write Something");
  //       return;
  //     }
  //     console.log(card);
  //     const newCard = {
  //       number: new Date().valueOf(),
  //       title: newTitle,
  //       dateCreate: new Date(),
  //       dateEnd: null,
  //       description: "",
  //       files: null,
  //       comment: [],
  //       subcards: [],
  //     };
  //     const foundItemIndex = list.findIndex((item) => item.id === Number(id));

  //     if (foundItemIndex !== -1) {
  //       // Clone the list to avoid mutating the state directly
  //       const updatedList = [...list];
  //       console.log(updatedList);
  //       // // Add the new card to the appropriate status (queue, development, or done)
  //       // if (title === "done") {
  //       //   updatedList[foundItemIndex].cards.done.push(newCard);
  //       // }
  //       // if (title === "development") {
  //       //   updatedList[foundItemIndex].cards.development.push(newCard);
  //       // }
  //       // if (title === "queue") {
  //       //   updatedList[foundItemIndex].cards.queue.push(newCard);
  //       // }
  //       // // Dispatch an action to update the state
  //       // dispatch({ type: "UPDATE_LIST", payload: updatedList });
  //     }
  //     setOpen(false);
  //   };
  function handeleAddTask(params) {
    // console.log(params);
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
      comment: [],
      subcards: [],
    };
    const list_id = id;
    const card_id = card.id;
    dispatch({
      type: "ADD_CARD",
      payload: { list_id, card_id, newCard },
    });
  }
  function handeleOpen() {
    setNewOpen(true);
  }
  return (
    <>
      <div className="add__task" onClick={handeleOpen}>
        <img src={plus} alt="" />
        Добавить карточку
      </div>
      {newOpen && (
        <div className="add__task_modal">
          <input
            name="add__task"
            ref={inputRef}
            placeholder="Название карточки"
            className="add__task_modal_title"
          />
          <button onClick={(e) => handeleAddTask(e)} type="submit">
            Добавить карточку
          </button>
          <img
            id="close"
            className="task_modal__close"
            src={close}
            alt=""
            onClick={() => setNewOpen(false)}
            srcset=""
          />
        </div>
      )}
    </>
  );
}

export default TaskFooter;
