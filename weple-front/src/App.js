import { Route, Routes } from "react-router-dom";
import "./component/common/common.css";
import Feed from "./component/feed/Feed";
import Header from "./component/common/header";

function App() {
  return (
    <div className="weple-wrap">
      <Header />
      <div className="weple-content">
        <Routes>
          <Route path="/feed/*" element={<Feed />} />
          <Route path="/header" element={<Header />} />
        </Routes>
      </div>
      {/* 푸터삽입 */}
    </div>
  );
}

export default App;
