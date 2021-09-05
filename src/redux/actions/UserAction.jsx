import {
  USER_LIST_FETCHED,
  USER_LIST_FILTER,
  USER_LIST_IS_FETCHING,
} from "../../constants/actionTypes";
import { userListApi } from "../../service/users";

export const filterUserList = (keyword) => ({
  type: USER_LIST_FILTER,
  keyword,
});
export const fetchUserList = () => {
  return (dispatch) => {
    dispatch(fetchingUserList(true));
    userListApi().then((res) => {
      console.log("regAction-res", res);
      // let resData = res.data;
      if (res) {
        dispatch(fetchingUserList(false));
        dispatch(fetchUserListSuccess(res.users, false));
        //   } else {
        //     //   dispatch(fetchingUserList(false));
        //     //   dispatch(fetchUserListFailed("获取用户列表失败"));
      }
    });
    //   .catch((e) => dispatch(fetchUserListFailed(e.message)));
  };
};
export const fetchUserListSuccess = (userList, loading) => ({
  type: USER_LIST_FETCHED,
  userList,
  loading,
});
export const fetchingUserList = (loading) => ({
  type: USER_LIST_IS_FETCHING,
  loading,
});
