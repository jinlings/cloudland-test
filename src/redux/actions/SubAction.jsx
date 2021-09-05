import {
  SUB_LIST_FETCHED,
  SUB_LIST_FILTER,
  SUB_LIST_IS_FETCHING,
} from "../../constants/actionTypes";
import { subnetsListApi } from "../../service/subnets";
export const filterSubList = (keyword) => ({
  type: SUB_LIST_FILTER,
  keyword,
});
export const fetchSubList = () => {
  return (dispatch) => {
    dispatch(fetchingSubList(true));
    subnetsListApi().then((res) => {
      console.log("regAction-res", res);
      // let resData = res.data;
      if (res) {
        dispatch(fetchingSubList(false));
        dispatch(fetchSubListSuccess(res.subnets, false));
        //   } else {
        //     //   dispatch(fetchingUserList(false));
        //     //   dispatch(fetchUserListFailed("获取用户列表失败"));
      }
    });
    //   .catch((e) => dispatch(fetchUserListFailed(e.message)));
  };
};
export const fetchSubListSuccess = (subList, loading) => ({
  type: SUB_LIST_FETCHED,
  subList,
  loading,
});
export const fetchingSubList = (loading) => ({
  type: SUB_LIST_IS_FETCHING,
  loading,
});
