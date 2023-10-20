import axios from "axios";
import { MeetItem } from "../meet/MeetList";
import SwiperComponent from "../util/Swiper";
import "./main.css";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FeedContent } from "../feed/FeedList";
import MainMeet from "./MainMeet";

const Main = (props) => {
  const isLogin = props.isLogin;
  const imgList = ["./img/main_1.jpg", "./img/main_2.jpg"];
  const token = window.localStorage.getItem("token");
  const [memberCategory, setMemberCategory] = useState([]);

  //선호 카테고리 조회
  useEffect(() => {
    axios
      .post("/member/getMemberCategory", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMemberCategory(res?.data);
      })
      .catch((res) => {
        console.log(res.data?.status);
      });
  }, []);

  const list = imgList.map((item, index) => {
    return <img src={item} key={"mainSwiper" + index}></img>;
  });
  return (
    <div className="main-wrap">
      <SwiperComponent
        spaceBetween={21}
        slidesPerView={1}
        navigation={true}
        pagination={true}
        loop={true}
        autoplay={true}
        list={list}
        delButton={false}
      />
      {/* 비로그인 */}
      {/* <MeetMain
        meetSet={"meetCategory"}
        meetTitle={"이 모임은 어때요?"}
        memberCategory={memberCategory}
      /> */}
      {console.log("meetMain", memberCategory)}
      <MeetMain meetSet={"meetPopular"} meetTitle={"주간 인기 TOP 30 👑"} isLogin={isLogin} />
      <MeetMain meetSet={"meetMargin"} meetTitle={"마감임박!"} isLogin={isLogin} />
      <FeedMain />
      <MeetMain meetSet={"meetNew"} meetTitle={"신규개설"} isLogin={isLogin} />
    </div >
  );
};

const MeetMain = (props) => {
  const isLogin = props.isLogin;
  const meetSet = props.meetSet;
  const meetTitle = props.meetTitle;
  const memberCategory = props?.memberCategory;
  const [meetMain, setMeetMain] = useState([]);
  const [sendMeetMain, setSendMeetMain] = useState([]);

  //모임 조회
  useEffect(() => {
    if (meetSet == "meetCategory") {
      console.log("memberCategory", memberCategory);
      const form = new FormData();
      form.append("memberCategory", memberCategory);
      const token = window.localStorage.getItem("token");
      axios
        .post("/meet/meetCategory", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log("memberCateogrh넘어감");
          setSendMeetMain(res.data);
          setMeetMain(res.data?.slice(0, 4));
        })
        .catch((res) => {
          console.log("memberCateogrh실패");
          console.log(res.data?.status);
        });
    } else {
      axios
        .get("/meet/" + meetSet)
        .then((res) => {
          setSendMeetMain(res.data);
          setMeetMain(res.data?.slice(0, 4));
        })
        .catch((res) => {
          console.log(res.data?.status);
        });
    }
  }, []);
  return (
    <div className="meet-main">
      <div className="meet-main-title">
        {meetTitle}
        <Link
          to="/meet/mainmeet"
          state={{ meetList: sendMeetMain, meetTitle: meetTitle }}
          className="meet-move-btn"
        >
          전체보기
        </Link>
      </div>
      <div className="meet-one-wrap">
        {meetMain.map((meet, index) => {
          // console.log(meet);
          return <MeetItem key={"meetMain" + index} meet={meet} isLogin={isLogin} />;
        })}
      </div>
    </div>
  );
};

const FeedMain = () => {
  const navigate = useNavigate();
  const [feedList, setFeedList] = useState([]);

  useEffect(() => {
    axios
      .get("/feed/list/" + 1 + "/" + 3)
      .then((res) => {
        const arr = [...feedList];
        for (let i = 0; i < res.data.length; i++) {
          arr.push(res.data[i]);
        }
        setFeedList([...arr]);
      })
      .catch((res) => {
        Swal.fire("Main실패");
        console.log(res.data.status);
      });
  }, []);

  return (
    <div>
      <div className="meet-main-title">피드</div>
      <div className="feed-list-content-wrap">
        {feedList.map((feed, index) => {
          return (
            <FeedContent key={"feed" + index} navigate={navigate} feed={feed} />
          );
        })}
      </div>
    </div>
  );
};
export default Main;
