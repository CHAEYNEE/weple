package kr.co.weple.meet.model.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.weple.PageInfo;
import kr.co.weple.Pagination;
import kr.co.weple.meet.model.dao.MeetDao;
import kr.co.weple.meet.model.vo.Calendar;
import kr.co.weple.meet.model.vo.Category;
import kr.co.weple.meet.model.vo.Follower;
import kr.co.weple.meet.model.vo.Meet;
import kr.co.weple.member.model.vo.Member;

@Service
public class MeetService {
	@Autowired
	private MeetDao meetDao;
	@Autowired
	private Pagination pagination;
	
	public Map myMeetList(int reqPage) {
		//내가 창설한 모임 리스트 조회, 페이징에 필요한 데이터 취합
		int numPerPage = 12; //한페이지당 게시물수(변경가능)
		int pageNaviSize = 5; //페이지 네비게이션 길이
		int totalCount = meetDao.totalCount();
		
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List myMeetList = meetDao.selectMyMeetList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("myMeetList", myMeetList);
		map.put("pi",pi);
		return map;
		
	}

	public Map enrollMember(int reqPage,int meetNo) {
		int numPerPage	= 10;
		int pageNaviSize = 5;
		int totalCount = meetDao.enrollMemberList(meetNo);
		//System.out.println("totalCount : "+totalCount);
		
		PageInfo pi = pagination.getPageInfo(reqPage,numPerPage,pageNaviSize,totalCount);
		//System.out.println("pi : "+pi);
		HashMap<String, Integer> param = new HashMap<String, Integer>();
		param.put("start", pi.getStart());
		param.put("end", pi.getEnd());
		param.put("meetNo",meetNo);
		List enrollMemberList = meetDao.selectEnrollMemberList(param);
		//System.out.println("enrollMemberList : "+enrollMemberList);
		HashMap<String, Object> map = new HashMap<String,Object>();
		map.put("enrollMemberList",enrollMemberList);
		map.put("pi",pi);
		return map;
	}

	//모임생성
	@Transactional
	public int createMeet(Meet meet) {
		// TODO Auto-generated method stub
		
		//모임 장장 select 해와서 meet에 set 은 같은 자료형이라 controller에서 이미 해왔고 여기선 안해도됨
		
		int result = meetDao.createMeet(meet);
		
		
		return result;
	}
	
	//모임수정
	@Transactional
	public Meet modifyMeet(Meet meet) {
		// TODO Auto-generated method stub
		
		int result = meetDao.modifyMeet(meet);
		Meet newMeet= meetDao.selectOneMeet(meet.getMeetNo());
		
		return newMeet;
	}

	public Map meetMemberList(int reqPage, int meetNo) {
		int numPerPage	= 12;
		int pageNaviSize = 5;
		int totalCount = meetDao.meetMemberList(meetNo);
		System.out.println("totalCount : "+totalCount);
		
		PageInfo pi = pagination.getPageInfo(reqPage,numPerPage,pageNaviSize,totalCount);
		System.out.println("pi : "+pi);
		HashMap<String, Integer> param = new HashMap<String, Integer>();
		param.put("start", pi.getStart());
		param.put("end", pi.getEnd());
		param.put("meetNo",meetNo);
		List selectMeetMemberList = meetDao.selectMeetMemberList(param);
		System.out.println("selectMeetMemberList : "+selectMeetMemberList);
		HashMap<String, Object> map = new HashMap<String,Object>();
		map.put("selectMeetMemberList",selectMeetMemberList);
		map.put("pi",pi);
		return map;
		
	}
	//모임 리스트 조회
	public Map meetList(int reqPage) {
		
		int totalCount = meetDao.totalCount();
		int numPerPage = 12;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List meetList = meetDao.meetList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", meetList);
		map.put("pi", pi);
		return map;
	}
	@Transactional
	public int updateEnrollMember(int memberNo, int meetNo) {	
		int meetMargin = meetDao.selectMeetMargin(meetNo);
		int newMargin = meetMargin - 1;
		int meetTotalCount = meetDao.disCount(meetNo,newMargin);//업데이트 meetMargin
		int updateResult = meetDao.updateEnrollMember(memberNo,meetNo);
		if(meetTotalCount == 1 && updateResult == 1) {
			return 1;
		}else {			
			return 0;
		}
	}
	/*
	 	@Transactional
	public int deleteMember(int memberNo, int meetNo) {
		//필요한 값 
		//모임 번호 : meetNo, 모임번호로 조회된 meetMargin 
		//meetMargin +1 
		int meetMargin = meetDao.selectMeetMargin(meetNo);
		int newMargin = meetMargin + 1;
		int meetTotalCount = meetDao.disCount(meetNo,newMargin);//업데이트 meetMargin
		int deleteResult = meetDao.deleteMember(memberNo,meetNo);//모임회원 삭제
		System.out.println("서비스 deleteResult : "+deleteResult);
		System.out.println("서비스meetTotalCount : "+meetTotalCount);
		if(meetTotalCount == 1 && deleteResult == 1) {
			return 1;
		}else {
			
			return 0;
		}
	}
	 * */

	public Map circleList(int reqPage, int meetCategory) {
		// TODO Auto-generated method stub
		
		// 게시물조회, 페이징에 필요한 데이터를 취합

		int numPerPage = 12; // 한페이지당 게시물 수
		int pageNaviSize = 5; // 페이지 네비게이션 길이
		int totalCount = meetDao.totalCount();// 전체게시물수 구해오기
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		
		//map으로 list와 pi 묶어서 리턴
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("pi", pi);
		map.put("start", pi.getStart());
		map.put("end", pi.getEnd());
		map.put("meetCategory",meetCategory);

		// 리스트조회 //pi 랑 meetCategory도 묶어서 보냄
		List circleList = meetDao.selectCircleList(map);
		map.put("meetList", circleList);
		
		
		return map;
	}

	// 모임 카테고리 메뉴바 눌럿을때 모임 리스트 조회
	public Map categoryMeetList(int reqPage, int meetCategory) {
		// TODO Auto-generated method stub
		// 게시물조회, 페이징에 필요한 데이터를 취합

		int numPerPage = 12; // 한페이지당 게시물 수
		int pageNaviSize = 5; // 페이지 네비게이션 길이
		int totalCount = meetDao.totalCount();// 전체게시물수 구해오기
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);

		// map으로 list와 pi 묶어서 리턴
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("pi", pi);
		map.put("start", pi.getStart());
		map.put("end", pi.getEnd());
		map.put("meetCategory", meetCategory);

		// 리스트조회 //pi 랑 meetCategory도 묶어서 보냄
		List circleList = meetDao.categoryMeetList(map);
		map.put("meetList", circleList);

		return map;
	}

	//meet
	public Meet selectOneMeet(int meetNo) {
		// TODO Auto-generated method stub
		
		return meetDao.selectOneMeet(meetNo);
	}
	

	public Map meetChatList(int meetNo) {
		List meetChat = meetDao.meetChatList(meetNo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("meetChat", meetChat);
		return map;
	}
/*********************************메인페이지 모임조회*********************************************/
	//메인페이지에 인기순 모임조회
	public List meetPopular() {
		// TODO Auto-generated method stub
		List list = meetDao.meetPopular();
		return list;
	}
	//메인페이지에 최신순 모임조회
	public List meetNew() {
		// TODO Auto-generated method stub
		List list = meetDao.meetNew();
		return list;
	}
	//메인페이지에 참여인원 순 모임 조회
		public List meetMargin() {
			// TODO Auto-generated method stub
			List list = meetDao.meetMargin();
			return list;
		}
	
//	//메인페이지에 선호카테고리순 모임조회
//	public List meetCategory(String memberId) {
//		// TODO Auto-generated method stub
//		String getMemberCategory = meetDao.getMemberCategory(memberId);
//		List list = meetDao.meetCategory();
//		return list;
//	}	
/********************************************************************************************/	
	//모임 카테고리 메뉴 조회
		public List selectSmallCategory(Category category) {
			// TODO Auto-generated method stub
			List smallCategoryList = meetDao.smallCategoryList(category);
			return smallCategoryList;
	}
	//내모임회원 추방
	@Transactional
	public int deleteMember(int memberNo, int meetNo) {
		//필요한 값 
		//모임 번호 : meetNo, 모임번호로 조회된 meetMargin 
		//meetMargin +1 
		int meetMargin = meetDao.selectMeetMargin(meetNo);
		int newMargin = meetMargin + 1;
		int meetTotalCount = meetDao.disCount(meetNo,newMargin);//업데이트 meetMargin
		int deleteResult = meetDao.deleteMember(memberNo,meetNo);//모임회원 삭제
		System.out.println("서비스 deleteResult : "+deleteResult);
		System.out.println("서비스meetTotalCount : "+meetTotalCount);
		if(meetTotalCount == 1 && deleteResult == 1) {
			return 1;
		}else {
			
			return 0;
		}
	}
	//모임 내 회원 호감도
	@Transactional
	public int memberLike(String memberId, double memberLike) {
		double changeMemberLike = memberLike + 0.7;
		
		
		return meetDao.memberLike(memberId,changeMemberLike);
	}

	//아이디 받아서 멤버 조회
	public Member selectOneMember(String memberId) {
		// TODO Auto-generated method stub
		return meetDao.selectOneMember(memberId);
	}

	//모임가입신청
	@Transactional
	public int meetJoin(Member joinMember, Meet meet) {
		// TODO Auto-generated method stub
		// 가입신청한 멤버번호와 가입할 모임번호를 모임가입정보로 묶어서 전달
		System.out.println("가입할 회원 아이디 : "+ joinMember);
		System.out.println("가입신청한 모임 : " + meet);
		HashMap<String, Object> meetJoinInfo = new HashMap<String,Object>();
		meetJoinInfo.put("memberNo",joinMember.getMemberNo());
		meetJoinInfo.put("meetNo",meet.getMeetNo());
		
		int result = meetDao.meetJoin(meetJoinInfo);
		System.out.println("결과확인");
		return result;
	}
	//로그인한 회원이 가입승인을 받은 모임 멤버인지 조회
	public Follower isMeetMember(int memberNo, int meetNo) {
		// TODO Auto-generated method stub
		HashMap<String, Object> map = new HashMap<String,Object>();
		map.put("memberNo", memberNo);
		map.put("meetNo", meetNo);
		Follower follower = meetDao.isMeetMember(map);
		
		return follower;
	}
	@Transactional
	public List insertMeetChat(String chatContent, String memberId, int meetNo) {
		// TODO Auto-generated method stub
		int result = meetDao.insertMeetChat(chatContent,memberId,meetNo);
		List list = meetDao.meetChatLast(meetNo);
		
		return list;
	}


	//------------------캘린더---------------------
	@Transactional
	public int addcalendar(Calendar cal, String memberId) {
		Meet m = meetDao.selectOneMeet(cal.getMeetNo());
		if(m.getMeetCaptain().equals(memberId)) {
			return  meetDao.addCalendar(cal);
		}
		return 0;
	}

	public List calendarList(int meetNo) {
		return meetDao.calendarList(meetNo);
	}
	
	@Transactional
	public int removeCalendar(int calNo, int meetNo, String memberId) {
		Meet m = meetDao.selectOneMeet(meetNo);
		if(m.getMeetCaptain().equals( memberId)) {
		return meetDao.removeCalendar(calNo);
		}
		return 0;
	}

	public Follower status(int meetNo, String memberId) {
		int selectMemberNo = meetDao.selectMemberNo(memberId);
		Follower followStatus = meetDao.status(meetNo,selectMemberNo);
		System.out.println("1111111111"+followStatus);
		return followStatus;
	}

	public Map meetCapCheck(int meetNo, String memberId) {
		Meet meetCapCheck= meetDao.meetCapCheck(meetNo,memberId);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("meetCapCheck",meetCapCheck);		
		return map;
	}


	


	


	
}
