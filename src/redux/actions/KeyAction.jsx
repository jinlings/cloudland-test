import {
  KEY_LIST_FETCHED,
  KEY_LIST_FILTER,
  KEY_LIST_IS_FETCHING,
} from "../../constants/actionTypes";
import { keysListApi } from "../../service/keys";

export const filterKeyList = (keyword) => ({
  type: KEY_LIST_FILTER,
  keyword,
});
export const fetchKeyList = () => {
  return (dispatch) => {
    dispatch(fetchingKeyList(true));
    keysListApi().then((res) => {
      console.log("keyAction-res", res);
      // let resData = res.data;
      if (res) {
        dispatch(fetchingKeyList(false));
        dispatch(fetchKeyListSuccess(res.keys, false));
        //   } else {
        //     //   dispatch(fetchingUserList(false));
        //     //   dispatch(fetchUserListFailed("获取用户列表失败"));
      }
    });
    //   .catch((e) => dispatch(fetchUserListFailed(e.message)));
  };
};
export const fetchKeyListSuccess = (keyList, loading) => ({
  type: KEY_LIST_FETCHED,
  keyList,
  loading,
});
export const fetchingKeyList = (loading) => ({
  type: KEY_LIST_IS_FETCHING,
  loading,
});
