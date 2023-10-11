import { Link, Route, Routes } from "react-router-dom";
import "./category.css";
import MeetCreate from "../meet/MeetCreate";
import { MeetList } from "../meet/MeetList";
const Category = () => {
  const bool = true;
  return (
    <div className="category-wrap">
      <div className="a">카테고리</div>
      <Link to="/meetList">
        <div className="category">
          <img src="../img/category/sport.jpg"></img>
          <span>스포츠</span>
        </div>
      </Link>
      <Link to="/">
        <div className="category">
          <img src="../img/category/travel.jpg"></img>
          <span>여행</span>
        </div>
      </Link>

      <Link to="/">
        <div className="category">
          <img src="../img/category/cook.jpg"></img>
          <span>요리</span>
        </div>
      </Link>
      <Link to="/">
        <div className="category">
          <img src="../img/category/DIY.jpg"></img>
          <span>공예DIY</span>
        </div>
      </Link>
      <Link to="/">
        <div className="category">
          <img src="../img/category/selfdevelop.jpg"></img>
          <span>자기계발</span>
        </div>
      </Link>

      <Link to="/">
        <div className="category">
          <img src="../img/category/movie.jpg"></img>
          <span>문화예술</span>
        </div>
      </Link>
    </div>
  );
};
export default Category;
