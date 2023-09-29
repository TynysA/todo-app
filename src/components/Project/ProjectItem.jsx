import { NavLink } from "react-router-dom";
import "../../style/ProjectListPage.css";

function ProjectItem({ item }) {
  return (
    <NavLink to={`/project/${item?.id}`} className="project__item">
      <span>{item?.title}</span>
    </NavLink>
  );
}

export default ProjectItem;
