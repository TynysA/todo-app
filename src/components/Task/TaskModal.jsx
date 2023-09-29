import "../../style/ProjectListPage.css";
import close from "../../assets/close.png";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
function TaskModal({ isOpen, onClose, item }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [subTaskAdd, setSubTaskAdd] = useState(false);
  //const list = useSelector((state) => state.list);
  const inputSubtaskRef = useRef("");
  if (!isOpen) return null;

  const time = (item.dateEnd - item.dateCreate) / (1000 * 60 * 60 * 24);
  let timeText = ``;
  if (time > 0) {
    timeText = `Оставшеся время ${time} дня`;
  } else {
    timeText = `Прошло уже ${-time} дня с дедлайна`;
  }
  const handleClose = (event) => {
    if (event.target.id === "close") {
      onClose();
    }
  };
  const handeleChangeSubtask = (event) => {
    const listId = id;
    const cardId = item.id;
    const cardStatus = item.status;
    const subtaskId = event.target.id;
    const status = event.target.checked;

    dispatch({
      type: "UPDATE_SUBTASK_STATUS",
      payload: { listId, cardStatus, cardId, subtaskId, status },
    });
  };

  const handeleAddSubTask = () => {
    if (!inputSubtaskRef.current.value) {
      alert("Please write a title for subtas");
      return;
    }
    const title = inputSubtaskRef.current.value;
    console.log(title);
    const listid = id;
    const cardid = item.id;
    const cardstatus = item.status;
    const newsabtask = {
      id: new Date().valueOf(),
      title: title,
      done: false,
    };
    dispatch({
      type: "ADD_SUBTASK",
      payload: { listid, cardstatus, cardid, newsabtask},
    });
    setSubTaskAdd(false);
  };
  return (
    <div id="close" className="modal__inner" onClick={handleClose}>
      <div className="task__modal">
        <div className="modal__info">
          <img
            id="close"
            className="modal__close"
            src={close}
            alt=""
            srcset=""
          />
          <div className="modal__title">{item.title}</div>
          <div className="modal__subtitle">
            в колонке{" "}
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </div>
          {item.dateEnd === null ? null : (
            <div className="modal__date">
              <div className="modal__minititle">Срок</div>
              <div className="modal__time">{timeText}</div>
            </div>
          )}
          <div className="modal__des">
            <div className="modal__minititle">Описание</div>
            <div className="modal_des__info">{item.description}</div>
          </div>
          <div className="modal__subtasks">
            <div className="modal__minititle">Подзадания</div>
            <form onChange={handeleChangeSubtask} className="subtasks__inner">
              {item.subcards.map((row) => (
                <div className="subtask__item">
                  {row.done ? (
                    <input
                      className="subtask__checkbox"
                      checked
                      type="checkbox"
                      name={row.id}
                      id={row.id}
                    />
                  ) : (
                    <input
                      className="subtask__checkbox"
                      type="checkbox"
                      name={row.id}
                      id={row.id}
                    />
                  )}
                  <label for={row.id}>{row.title}</label>
                </div>
              ))}
            </form>
          </div>
          <div className="modal__comment">
            <div className="modal__minititle">Comments</div>
            <div className="input__comments"></div>
          </div>
        </div>
        <div className="modal__actions">
          <div className="actions__title">Добавить на карточку</div>
          <div className="list_of__actions">
            <div
              className="list__actions_item add__subtask"
              onClick={() => setSubTaskAdd(true)}
            >
              Подзадачу
            </div>
            <div className="list__actions_item add__date">Дату</div>
            <div className="list__actions_item add__subtask">Вложения</div>
            {subTaskAdd && (
              <div className="add__subtask_modal">
                <input
                  name="add__subtask"
                  ref={inputSubtaskRef}
                  placeholder="Название карточки"
                  className="add__subtask_modal_title"
                />
                <button onClick={handeleAddSubTask} type="submit">
                  Добавить карточку
                </button>
                <img src={close} alt="" onClick={() => setSubTaskAdd(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
