import {
  GW_LIST_FETCHED,
  GW_LIST_FILTER,
  GW_LIST_IS_FETCHING,
} from "../../constants/actionTypes";
import { gwListApi } from "../../service/gateways";

export const filterGwList = (keyword) => ({
  type: GW_LIST_FILTER,
  keyword,
});
export const fetchGwList = () => {
  return (dispatch) => {
    dispatch(fetchingGwList(true));
    gwListApi().then((res) => {
      console.log("gwAction-res", res);
      // let resData = res.data;
      if (res) {
        dispatch(fetchingGwList(false));
        dispatch(fetchGwListSuccess(res.gateways, false));
        //   } else {
        //     //   dispatch(fetchingUserList(false));
        //     //   dispatch(fetchUserListFailed("获取用户列表失败"));
      }
    });
    //   .catch((e) => dispatch(fetchUserListFailed(e.message)));
  };
};
export const fetchGwListSuccess = (gwList, loading) => ({
  type: GW_LIST_FETCHED,
  gwList,
  loading,
});
export const fetchingGwList = (loading) => ({
  type: GW_LIST_IS_FETCHING,
  loading,
});
