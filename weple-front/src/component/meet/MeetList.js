import { useEffect, useState } from "react";
import "./meetList.css";
import axios from "axios";

const MeetList = () => {

  //로그인상태 불러올곳 ( 모임생성버튼이 이곳에 있다면 버튼을 위해서 )
  //const isLogin = props.isLogin;

  const [meetList, setMeetList] = useState([]);
  const [reqPage, setReqPage] = useState(1); //처음에는 1페이지
  const [pagenfo, setPageInfo] = useState({});

  useEffect(() => {

  }, [reqPage]);
  axios
    .get("/meet/meetList" + reqPage)
    .then((res) => {
      console.log(res.data);
      //setMeetList(res.data.meetList);
      //페이지인포 셋팅
      //setPageInfo(res.data.pi);
    })
    .catch((res) => {
      console.log(res.response.status);
    });


  return (
    <div className="meetList-all-wrap">
      <div className="meetListCategori-area">카테고리</div>
      <div className="meetList-area">
        {/* meetList db에서 받아온후 map으로 반복출력 예정 */}
        {/* props로 meet 정보 줄예정 */}
        <MeetItem />
        <div className="meet-one">
          <div className="MeetList-meet-img-box">
            <img src="/img/main_1.jpg"></img>
          </div>
          <div className="MeetList-meetTitle">
            <span>제목</span>
            <span>db</span>
          </div>

          <div>
            <span>인원 : </span>
            <span>db</span>
          </div>
          <div className="MeetList-star">
            <span>별점 </span>
            <span className="material-icons">star_rate</span>
          </div>
          <div className="MeetList-like-box">
            <span className="material-icons MeetList-like">favorite_border</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MeetItem = (props) => {
  // 연주님께~  meet props로 전달해주시고 meetList 따로 select 해와서 map으로 반복 출력해주세요
  const meet = props.meet;
  return (
    <div className="meet-one">

      <div className="MeetList-meet-img-box">
        <img src="/img/main_1.jpg"></img>
      </div>
      <div className="MeetList-meetTitle">
        <span>제목</span>
      </div>
      <div>
        <span>인원 : </span>
        <span>db</span>
      </div>
      <div className="MeetList-star">
        <span>별점 </span>
        <span className="material-icons">star_rate</span>
      </div>
      <div className="MeetList-like-box">
        <span className="material-icons MeetList-like">favorite_border</span>
      </div>
    </div>
  );
}

export { MeetList, MeetItem };
