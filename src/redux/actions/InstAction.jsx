import {
  INST_LIST_FETCHED,
  INST_LIST_FILTER,
  INST_LIST_IS_FETCHING,
} from "../../constants/actionTypes";
import { instListApi } from "../../service/instances";
export const filterInstList = (keyword) => ({
  type: INST_LIST_FILTER,
  keyword,
});
export const fetchInstList = () => {
  return (dispatch) => {
    dispatch(fetchingInstList(true));
    instListApi().then((res) => {
      console.log("insAction-res", res);
      // let resData = res.data;
      if (res) {
        dispatch(fetchingInstList(false));
        dispatch(fetchInstListSuccess(res.instances, false));
        //   } else {
        //     //   dispatch(fetchingUserList(false));
        //     //   dispatch(fetchUserListFailed("获取用户列表失败"));
      }
    });
    //   .catch((e) => dispatch(fetchUserListFailed(e.message)));
  };
};
export const fetchInstListSuccess = (instList, loading) => ({
  type: INST_LIST_FETCHED,
  instList,
  loading,
});
export const fetchingInstList = (loading) => ({
  type: INST_LIST_IS_FETCHING,
  loading,
});
