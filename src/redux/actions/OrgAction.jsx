import {
  ORG_LIST_FETCHED,
  ORG_LIST_FILTER,
  ORG_LIST_IS_FETCHING,
} from "../../constants/actionTypes";
import { orgsListApi } from "../../service/orgs";

export const filterOrgList = (keyword) => ({
  type: ORG_LIST_FILTER,
  keyword,
});
export const fetchOrgList = () => {
  return (dispatch) => {
    dispatch(fetchingOrgList(true));
    orgsListApi().then((res) => {
      console.log("orgAction-res", res);
      // let resData = res.data;
      if (res) {
        dispatch(fetchingOrgList(false));
        dispatch(fetchOrgListSuccess(res.orgs, false));
        //   } else {
        //     //   dispatch(fetchingUserList(false));
        //     //   dispatch(fetchUserListFailed("获取用户列表失败"));
      }
    });
    //   .catch((e) => dispatch(fetchUserListFailed(e.message)));
  };
};
export const fetchOrgListSuccess = (orgList, loading) => ({
  type: ORG_LIST_FETCHED,
  orgList,
  loading,
});
export const fetchingOrgList = (loading) => ({
  type: ORG_LIST_IS_FETCHING,
  loading,
});
