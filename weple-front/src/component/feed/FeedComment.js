import axios from "axios";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FeedComment = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "10px",
      width: "600px",
      height: "600px",
      overflow: "inherit",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  };
  const feedNo = props.feedNo;
  const isOpen = props.isOpen;
  const closeComent = props.closeComent;
  const isLogin = props.isLogin;
  const [commentList, setCommentList] = useState([]);
  const [fCommentContent, setFCommentContent] = useState("");
  const [fCommentRefNo, setFCommentRefNo] = useState(null);
  const [rcmId, setRcmId] = useState(""); //답글남길 아이디 띄우기

  useEffect(() => {
    axios
      .get("/feed/comment/list/" + feedNo)
      .then((res) => {
        setCommentList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  return (
    <ReactModal style={customStyles} isOpen={isOpen}>
      <div className="commment-modal-wrap">
        <div className="feed-title">
          COMMENT
          <span class="material-icons" onClick={closeComent}>
            close
          </span>
        </div>
        <div className="feed-comment-wrap">
          {commentList.map((comment, index) => {
            return (
              <CommentList
                key={"comment" + index}
                comment={comment}
                isLogin={isLogin}
                fCommentRefNo={fCommentRefNo}
                setFCommentRefNo={setFCommentRefNo}
                rcmId={rcmId}
                setRcmId={setRcmId}
              />
            );
          })}
        </div>
        {isLogin ? (
          <CommentFrm
            feedNo={feedNo}
            closeComent={closeComent}
            fCommentContent={fCommentContent}
            setFCommentContent={setFCommentContent}
            fCommentRefNo={fCommentRefNo}
            setFCommentRefNo={setFCommentRefNo}
            rcmId={rcmId}
            setRcmId={setRcmId}
          />
        ) : (
          ""
        )}
      </div>
    </ReactModal>
  );
};

const CommentList = (props) => {
  const comment = props.comment;
  const isLogin = props.isLogin;
  const fCommentRefNo = props.fCommentRefNo;
  const setFCommentRefNo = props.setFCommentRefNo;
  const [memberId, setMemberId] = useState();
  const token = window.localStorage.getItem("token");
  const rcmId = props.rcmId;
  const setRcmId = props.setRcmId;

  useEffect(() => {
    if (isLogin) {
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setMemberId(res.data.memberId);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);

  const deleteComment = () => {
    Swal.fire({
      icon: "warning",
      text: "댓글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/feed/comment/delete/" + comment.fcommentNo)
          .then((res) => {
            if (res.data !== 0) {
              Swal.fire({
                icon: "success",
                text: "댓글이 삭제되었습니다",
                confirmButtonText: "확인",
              });
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };

  const reComemtEvent = () => {
    setFCommentRefNo(comment.fcommentNo);
    setRcmId(comment.fcommentWriter);
  };

  return (
    <div className="feed-comment">
      <div className="feed-list-top">
        <div className="feed-list-profile">
          <span className="material-icons-outlined">person</span>
        </div>
        <div className="feed-list-info">
          <div>
            {comment.fcommentWriter}
            <span>{comment.fcommentDate}</span>
          </div>
          <div className="feed-comment-detail">
            <span className="feed-comment-text">{comment.fcommentContent}</span>
            <span className="material-icons-outlined">favorite_border</span>
          </div>
          <div className="comment-click-btn">
            <div>좋아요 0개</div>
            {isLogin && memberId == comment.fcommentWriter ? (
              <div onclick={reComemtEvent}>답글달기</div>
            ) : (
              ""
            )}
            {isLogin && memberId == comment.fcommentWriter ? (
              <div onClick={deleteComment}>삭제</div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentFrm = (props) => {
  const fCommentContent = props.fCommentContent;
  const setFCommentContent = props.setFCommentContent;
  const fCommentRefNo = props.fCommentRefNo;
  const setFCommentRefNo = props.setFCommentRefNo;
  const feedNo = props.feedNo;
  const closeComent = props.closeComent;
  const rcmId = props.rcmId;
  const setRcmId = props.setRcmId;
  const navigate = useNavigate();

  const changeContent = (e) => {
    const changeValue = e.currentTarget.value;
    setFCommentContent(changeValue);
  };

  const rcmCancel = () => {
    setRcmId("");
    setFCommentRefNo(null);
  };

  const comment = () => {
    if (fCommentContent !== "") {
      const form = new FormData();
      form.append("feedNo", feedNo);
      form.append("fCommentContent", fCommentContent);
      if (fCommentRefNo !== null) {
        form.append("fCommentRefNo", fCommentRefNo);
      }
      const token = window.localStorage.getItem("token");
      axios
        .post("/feed/comment/insert", form, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data == 1) {
            closeComent();
            navigate("/feed");
          }
        })
        .catch((res) => {
          console.log(res.response.status);
          Swal.fire("실패");
        });
    } else {
      Swal.fire("댓글 내용을 입력하세요");
    }
  };

  return (
    <div className="feed-comment-write">
      {fCommentRefNo !== null ? (
        <div>
          <span>{rcmId}님께 답글 남기는 중 ...</span>
          <span onClick={rcmCancel}>답글취소</span>
        </div>
      ) : (
        ""
      )}
      <div className="feed-comment-left">
        <div className="feed-list-profile">
          <span className="material-icons-outlined">person</span>
        </div>
      </div>
      <div className="feed-comment-text">
        <input type="text" onChange={changeContent} />
        <button onClick={comment}>등록</button>
      </div>
    </div>
  );
};

export default FeedComment;
