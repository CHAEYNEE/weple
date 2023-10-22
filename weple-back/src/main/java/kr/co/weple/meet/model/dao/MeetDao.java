package kr.co.weple.meet.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.PageInfo;
import kr.co.weple.meet.model.vo.Calendar;
import kr.co.weple.meet.model.vo.Category;
import kr.co.weple.meet.model.vo.Follower;
import kr.co.weple.meet.model.vo.Meet;
import kr.co.weple.meet.model.vo.WishList;
import kr.co.weple.member.model.vo.Member;

@Mapper
public interface MeetDao {

	int totalCount();

	List selectMyMeetList(PageInfo pi);

	int enrollMemberList(int meetNo);

	List selectEnrollMemberList(HashMap<String, Object> param);

	int createMeet(Meet meet);
	
	int updateMemberMeet(Member member);

	int meetMemberList(int meetNo);

	List selectMeetMemberList(HashMap<String, Object> param);

	List meetList(PageInfo pi);

	//int updateEnrollMember(int memberNo, int meetNo);

	int circleListTotalCount(int meetCategory);

	int categoryMeetListTotalCount(int meetCategory);
	
	List selectCircleList(HashMap<String, Object> map);

	List categoryMeetList(HashMap<String, Object> map);

	Meet selectOneMeet(int meetNo);

	List meetChatList(int meetNo);

	List meetMargin(int memberNo);

	List meetPopular(int memberNo);

	List meetNew(int memberNo);
	
	List meetCategory();

	List smallCategoryList(Category category);

	//int deleteMember(int memberNo, int meetNo);

	int memberLike(String memberId, double changeMemberLike);

	Member selectOneMember(String memberId);

	int meetJoin(HashMap<String, Object> meetJoinInfo);

	Follower isMeetMember(HashMap<String, Object> map);

	int insertMeetChat(String chatContent, String memberId, int meetNo);

	List meetChatLast(int meetNo);

	int addCalendar(Calendar cal);

	List calendarList(int meetNo);

	int removeCalendar(int calNo);

	int selectMemberNo(String memberId);

	Follower status(int meetNo, int selectMemberNo);

	Meet meetCapCheck(int meetNo, String memberId);

	int modifyMeet(Meet meet);
	
	int deleteMeet(int meetNo);

	int selectMeetMargin(int meetNo);

	//int disCount(int meetNo, int newMargin);

	String getMemberCategory(String memberId);

	WishList isMeetLike(int meetNo, int memberNo);

	int meetLikeUp(int meetNo, int memberNo);
	
	int meetLikeCancle(int meetNo, int memberNo);
	
	List schedule(int calNo);

	int modifyCalendar(Calendar cal);

	int insertMemberLike(int giverNo, int takerNo, int meetNo);

	List like(int memberNo, int meetNo);

	List searchList(HashMap<String, Object> map);

	int searchTotal(String searchKeyword);


	int disCount(HashMap<String, Integer> param);

	int updateEnrollMember(HashMap<String, Integer> param);

	int deleteMember(HashMap<String, Integer> param);

	int selectMeetTotal(int meetNo);

	int deleteEnrollMember(HashMap<String, Integer> param);

	int meetLikeCount(int meetNo);




	
	


}
