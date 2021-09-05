import {
  SECGROUP_LIST_FETCHED,
  SECGROUP_LIST_FILTER,
  SECGROUP_LIST_IS_FETCHING,
} from "../../constants/actionTypes";
import { secgroupsListApi } from "../../service/secgroups";

export const filterSecgroupList = (keyword) => ({
  type: SECGROUP_LIST_FILTER,
  keyword,
});
export const fetchSecgroupList = () => {
  return (dispatch) => {
    dispatch(fetchingSecgroupList(true));
    secgroupsListApi().then((res) => {
      console.log("regAction-res", res);
      // let resData = res.data;
      if (res) {
        dispatch(fetchingSecgroupList(false));
        dispatch(fetchSecgroupListSuccess(res.secgroups, false));
        //   } else {
        //     //   dispatch(fetchingUserList(false));
        //     //   dispatch(fetchUserListFailed("获取用户列表失败"));
      }
    });
    //   .catch((e) => dispatch(fetchUserListFailed(e.message)));
  };
};
export const fetchSecgroupListSuccess = (secgroupList, loading) => ({
  type: SECGROUP_LIST_FETCHED,
  secgroupList,
  loading,
});
export const fetchingSecgroupList = (loading) => ({
  type: SECGROUP_LIST_IS_FETCHING,
  loading,
});
