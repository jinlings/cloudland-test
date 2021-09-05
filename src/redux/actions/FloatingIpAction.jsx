import {
  FLOATINGIP_LIST_FETCHED,
  FLOATINGIP_LIST_FILTER,
  FLOATINGIP_LIST_IS_FETCHING,
} from "../../constants/actionTypes";
import { floatingipsListApi } from "../../service/floatingips";
export const filterFloatingIpList = (keyword) => ({
  type: FLOATINGIP_LIST_FILTER,
  keyword,
});
export const fetchFloatingIpList = () => {
  return (dispatch) => {
    dispatch(fetchingFloatingIpList(true));
    floatingipsListApi().then((res) => {
      console.log("floatingipAction-res", res);
      // let resData = res.data;
      if (res) {
        dispatch(fetchingFloatingIpList(false));
        dispatch(fetchFloatingIpListSuccess(res.floatingips, false));
        //   } else {
        //     //   dispatch(fetchingUserList(false));
        //     //   dispatch(fetchUserListFailed("获取用户列表失败"));
      }
    });
    //   .catch((e) => dispatch(fetchUserListFailed(e.message)));
  };
};
export const fetchFloatingIpListSuccess = (floatList, loading) => ({
  type: FLOATINGIP_LIST_FETCHED,
  floatList,
  loading,
});
export const fetchingFloatingIpList = (loading) => ({
  type: FLOATINGIP_LIST_IS_FETCHING,
  loading,
});
