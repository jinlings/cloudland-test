import {
  SECRULE_LIST_FETCHED,
  SECRULE_LIST_FILTER,
  SECRULE_LIST_IS_FETCHING,
} from "../../constants/actionTypes";
import { secrulesListApi } from "../../service/secrules";

export const filterSecruleList = (keyword) => ({
  type: SECRULE_LIST_FILTER,
  keyword,
});
export const fetchSecruleList = (secgroupID) => {
  return (dispatch) => {
    dispatch(fetchingSecruleList(true));
    secrulesListApi(secgroupID).then((res) => {
      console.log("regAction-res", res);
      // let resData = res.data;
      if (res) {
        dispatch(fetchingSecruleList(false));
        dispatch(fetchSecruleListSuccess(res.secrules, false));
        //   } else {
        //     //   dispatch(fetchingUserList(false));
        //     //   dispatch(fetchUserListFailed("获取用户列表失败"));
      }
    });
    //   .catch((e) => dispatch(fetchUserListFailed(e.message)));
  };
};
export const fetchSecruleListSuccess = (secruleList, loading) => ({
  type: SECRULE_LIST_FETCHED,
  secruleList,
  loading,
});
export const fetchingSecruleList = (loading) => ({
  type: SECRULE_LIST_IS_FETCHING,
  loading,
});
