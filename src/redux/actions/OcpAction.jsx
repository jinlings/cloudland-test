import {
  OCP_LIST_FETCHED,
  OCP_LIST_FILTER,
  OCP_LIST_IS_FETCHING,
} from "../../constants/actionTypes";
import { ocpListApi } from "../../service/openshifts";
export const filterOcpList = (keyword) => ({
  type: OCP_LIST_FILTER,
  keyword,
});
export const fetchOcpList = () => {
  return (dispatch) => {
    dispatch(fetchingOcpList(true));
    ocpListApi().then((res) => {
      console.log("ocpAction-res", res);
      // let resData = res.data;
      if (res) {
        dispatch(fetchingOcpList(false));
        dispatch(fetchOcpListSuccess(res.openshifts, false));
        //   } else {
        //     //   dispatch(fetchingUserList(false));
        //     //   dispatch(fetchUserListFailed("获取用户列表失败"));
      }
    });
    //   .catch((e) => dispatch(fetchUserListFailed(e.message)));
  };
};
export const fetchOcpListSuccess = (ocpList, loading) => ({
  type: OCP_LIST_FETCHED,
  ocpList,
  loading,
});
export const fetchingOcpList = (loading) => ({
  type: OCP_LIST_IS_FETCHING,
  loading,
});
