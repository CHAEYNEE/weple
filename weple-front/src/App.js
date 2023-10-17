import { Route, Routes } from "react-router-dom";
import "./component/common/common.css";
import Feed from "./component/feed/Feed";
import Main from "./component/common/Main";
import Footer from "./component/common/Footer";
import MeetMain from "./component/meet/MeetMain";
import Board from "./component/board/Board";
import Admin from "./component/admin/Admin";
import Header from "./component/common/Header";
import Join from "./component/member/Join";
import Login from "./component/member/Login";
import { useState } from "react";
import { useEffect } from "react";
import Mypage from "./component/member/Mypage";
import FindId from "./component/member/FindId";
import ReviewMain from "./component/review/ReviewMain";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      setIsLogin(false);
      setId("");
      console.log("id : ", id);
    } else {
      setIsLogin(true);
      console.log("id : ", id);
    }
  }, []);
  console.log("app", setIsLogin);
  return (
    <div className="weple-wrap">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} setId={setId} />
      <div className="weple-content">
        <Routes>
          <Route
            path="/mypage/*"
            element={
              <Mypage isLogin={isLogin} setIsLogin={setIsLogin} setId={setId} />
            }
          />
          <Route path="/feed/*" element={<Feed isLogin={isLogin} id={id} />} />
          <Route
            path="/meet/*"
            element={
              <MeetMain isLogin={isLogin} setIsLogin={setIsLogin} id={id} />
            }
          ></Route>
          <Route
            path="/board/*"
            element={<Board isLogin={isLogin} id={id} />}
          />

          <Route
            path="/admin/*"
            element={<Admin isLogin={isLogin} id={id} />}
          />
          <Route path="/join" element={<Join />} />
          <Route
            path="/login"
            element={<Login setIsLogin={setIsLogin} setId={setId} />}
          />
          <Route path="/findId" element={<FindId />} />
          {/* <Route path="/category" element={<Category />} /> */}
          <Route path="/review/*" element={<ReviewMain />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
