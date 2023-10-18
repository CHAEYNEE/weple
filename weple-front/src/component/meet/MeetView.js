import { Link, Route, Routes, useLocation } from "react-router-dom";
import "./afterMeet.css";
import MeetInfo from "./MeetInfo";
import MeetChat from "./MeetChat";
import { useState } from "react";
import MeetCalendar from "./MeetCalendar";
import MeetMemberList from "./MeetMemberList";
import { useEffect } from "react";

import EnrollMeetMember from "./EnrollMeetMember";
import axios from "axios";

const MeetView = (props) => {
  console.log("view 렌더링");
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const id = props.id;
  // console.log("모임메인 id : ", id);
  const location = useLocation();
  useEffect(() => {
    //   console.log(location.state.m);
    console.log("myMeet set");
    setMyMeet(location.state.m);
  }, [props]);
  const [myMeet, setMyMeet] = useState({});
  const [captainCheck, setCaptainCheck] = useState({});
  const token = window.localStorage.getItem("token");
  const [followerStatus, setFollowerStatus] = useState({});
  const meetNo = myMeet.meetNo;
  //console.log("멤버스테이트에 필요한 meetNo : ", meetNo);
  useEffect(() => {
    console.log("asdf", myMeet);
    axios
      .get("/meet/memberStatus/" + myMeet.meetNo, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("팔로워 status : ", res);
        setFollowerStatus(res.data.followerStatus);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [myMeet]);
  //모임장 id 전송 이후 DB에서 모임장 정보 불러오기
  const [meetCaptain, setMeetCaptain] = useState({});
  useEffect(() => {
    axios
      .post("/meet/selectOneMember", { memberId: location.state.m.meetCaptain })
      .then((res) => {
        console.log("캡틴체크", res.data);
        setMeetCaptain(res.data);
      })
      .catch((res) => {
        console.log("catch : " + res.response.status);
      });
  }, []);

  //  console.log("view", myMeet);
  const [meetMenu, setMeetMenu] = useState([
    { url: "", text: "소개", active: true },
    { url: "meetChat", text: "글 작성", active: false },
    { url: "meetCalendar", text: "캘린더", active: false },
    { url: "meetList", text: "멤버목록", active: false },
    { url: "enrollMeetMember", text: "신청자목록", active: false },
  ]);
  const [meetMenu2, setMeetMenu2] = useState([
    { url: "", text: "소개", active: true },
    { url: "meetChat", text: "글 작성", active: false },
    { url: "meetCalendar", text: "캘린더", active: false },
    { url: "meetList", text: "멤버목록", active: false },
  ]);

  // console.log("meetCapttain 아이디 : ", captainId);
  return (
    <div className="afterMeet-all-wrap">
      <div className="feed-title">MY GROUP</div>
      <AfterMeetMain myMeet={myMeet} meetCaptain={meetCaptain} />
      {isLogin ? (
        myMeet.meetCaptain === id ? (
          <AfterMeetSubNavi
            meetMenu={meetMenu}
            setMeetMenu={setMeetMenu}
            meetMenu2={meetMenu2}
            setMeetMenu2={setMeetMenu2}
            meetNo={meetNo}
            captainCheck={captainCheck}
            setCaptainCheck={setCaptainCheck}
          />
        ) : followerStatus ? (
          <AfterMeetSubNavi
            meetMenu={meetMenu}
            setMeetMenu={setMeetMenu}
            meetMenu2={meetMenu2}
            setMeetMenu2={setMeetMenu2}
            meetNo={meetNo}
            captainCheck={captainCheck}
            setCaptainCheck={setCaptainCheck}
          ></AfterMeetSubNavi>
        ) : (
          ""
        )
      ) : (
        ""
      )}

      {/* 
      {isLogin && captainCheck === id ? (
        <AfterMeetSubNavi
          meetMenu={meetMenu}
          setMeetMenu={setMeetMenu}
          meetMenu2={meetMenu2}
          setMeetMenu2={setMeetMenu2}
          meetNo={meetNo}
          captainCheck={captainCheck}
          setCaptainCheck={setCaptainCheck}
        />
      ) : isLogin && followerStatus ? (
        <AfterMeetSubNavi
          meetMenu={meetMenu}
          setMeetMenu={setMeetMenu}
          meetMenu2={meetMenu2}
          setMeetMenu2={setMeetMenu2}
          meetNo={meetNo}
          captainCheck={captainCheck}
          setCaptainCheck={setCaptainCheck}
        ></AfterMeetSubNavi>
      ) : (
        ""
      )} */}

      <Routes>
        <Route
          path="enrollMeetMember"
          element={
            <EnrollMeetMember
              myMeet={myMeet}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              id={id}
            />
          }
        />
        <Route
          path="meetChat"
          element={
            <MeetChat
              myMeet={myMeet}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              id={id}
            />
          }
        />

        <Route
          path="meetCalendar"
          element={<MeetCalendar meetNo={myMeet.meetNo} />}
        />
        <Route
          path="meetList"
          element={
            <MeetMemberList
              myMeet={myMeet}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              captainCheck={captainCheck}
              id={id}
            />
          }
        />
        <Route
          path="*"
          element={
            <MeetInfo
              myMeet={myMeet}
              isLogin={isLogin}
              meetCaptain={meetCaptain}
            />
          }
        />
      </Routes>
    </div>
  );
};

const AfterMeetMain = (props) => {
  const myMeet = props.myMeet;
  const meetCaptain = props.meetCaptain;

  //console.log(myMeet);
  return (
    <div className="afterMeet-main-wrap">
      <div className="afterMeet-main-thumbnail">
        <div className="afterMeet-thumbnail-img">
          <img src={"/meet/" + myMeet.meetThumbNail}></img>
        </div>
      </div>
      <div className="afterMeet-main-info">
        <div className="afterMeet-info-host">
          <div className="aferMeet-host-img">
            {meetCaptain.memberImage ? (
              <img src={"/member/" + meetCaptain.memberImage}></img>
            ) : (
              <img src="/img/testImg_01.png"></img>
            )}
          </div>
          <div className="aferMeet-host-name">
            <Link to="#">{myMeet.meetCaptain}</Link>
          </div>
          <div className="afer-host-like">
            <span className="material-icons">favorite</span>
          </div>
        </div>
        <div className="afterMeet-info-title">
          <h3>{myMeet.meetTitle}</h3>
        </div>
        <div className="afterMeet-info-sub-content">
          <p>{myMeet.meetContentS}</p>
        </div>
        <div className="afterMeet-member-count">
          {myMeet.meetMargin}/{myMeet.meetTotal}명
        </div>
      </div>
    </div>
  );
};
const AfterMeetSubNavi = (props) => {
  const meetMenu = props.meetMenu;
  const setMeetMenu = props.setMeetMenu;
  const meetMenu2 = props.meetMenu2;
  const setMeetMenu2 = props.setMeetMenu2;
  const meetNo = props.meetNo;
  const [captainCheck, setCaptainCheck] = useState(null);
  // const captainCheck = props.captainCheck;
  // const setCaptainCheck = props.setCaptainCheck;
  const token = window.localStorage.getItem("token");
  // console.log("방장체크에 필요한 meetNo :", meetNo);

  useEffect(() => {
    axios
      .get("/meet/meetCapCheck/" + meetNo, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("방장체크 : ", res.data);
        setCaptainCheck(res.data.meetCapCheck);
        //   console.log("방장체크 captainCheck : ", captainCheck);
      })
      .catch((res) => {
        //    console.log(res.response.status);
      });
  }, [props]);
  console.log("사이드 렌더링", captainCheck);
  const activeTab = (index) => {
    meetMenu.forEach((item) => {
      item.active = false;
    });
    meetMenu[index].active = true;
    setMeetMenu([...meetMenu]);
  };
  const activeTab2 = (index) => {
    meetMenu2.forEach((item) => {
      item.active = false;
    });
    meetMenu2[index].active = true;
    setMeetMenu2([...meetMenu2]);
  };
  // console.log("meetView의 capTainCheck : ", captainCheck);
  return (
    <>
      {captainCheck ? (
        <div className="afterMeet-sub-navi">
          <ul>
            {meetMenu.map((meetMenu, index) => {
              return (
                <li key={"meetMenu" + index}>
                  {meetMenu.active ? (
                    <Link
                      to={meetMenu.url}
                      className="active-side"
                      onClick={() => {
                        activeTab(index);
                      }}
                      captainCheck={captainCheck}
                    >
                      {meetMenu.text}
                    </Link>
                  ) : (
                    <Link
                      to={meetMenu.url}
                      onClick={() => {
                        activeTab(index);
                      }}
                      captainCheck={captainCheck}
                    >
                      {meetMenu.text}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="afterMeet-sub-navi">
          <ul>
            {meetMenu2.map((meetMenu2, index) => {
              return (
                <li key={"meetMenu" + index}>
                  {meetMenu2.active ? (
                    <Link
                      to={meetMenu2.url}
                      className="active-side"
                      onClick={() => {
                        activeTab2(index);
                      }}
                      captainCheck={captainCheck}
                    >
                      {meetMenu2.text}
                    </Link>
                  ) : (
                    <Link
                      to={meetMenu2.url}
                      onClick={() => {
                        activeTab2(index);
                      }}
                      captainCheck={captainCheck}
                    >
                      {meetMenu2.text}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
export default MeetView;
