import "../../style/ProjectListPage.css";
function TaskItem({ item, onTaskClick }) {
  const handeleOpen = () => {
    onTaskClick(item);
  };
  return (
    <div className="task__item" onClick={handeleOpen}>
      {item.title}
    </div>
  );
}

export default TaskItem;
