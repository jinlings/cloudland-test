import {
  REG_LIST_FETCHED,
  REG_LIST_FILTER,
  REG_LIST_IS_FETCHING,
  REG_LIST_FETCH_FAILED,
  REG_LIST_DELETE_FAILED,
  REG_LIST_DELETING,
  REG_LIST_DELETE_SUCCESS,
} from "../../constants/actionTypes";
import { regListApi, delRegInfor } from "../../service/registrys";
export const filterRegList = (keyword) => ({
  type: REG_LIST_FILTER,
  keyword,
});
export const fetchRegList = () => {
  return (dispatch) => {
    dispatch(fetchingRegList(true));
    regListApi().then((res) => {
      console.log("regAction-res", res);
      // let resData = res.data;
      if (res) {
        dispatch(fetchingRegList(false));
        dispatch(fetchRegListSuccess(res.registrys, false));
        //   } else {
        //     //   dispatch(fetchingUserList(false));
        //     //   dispatch(fetchUserListFailed("获取用户列表失败"));
      }
    });
    //   .catch((e) => dispatch(fetchUserListFailed(e.message)));
  };
};
export const fetchRegListSuccess = (regList, loading) => ({
  type: REG_LIST_FETCHED,
  regList,
  loading,
});
export const fetchingRegList = (loading) => ({
  type: REG_LIST_IS_FETCHING,
  loading,
});

export const deleteReg = (id) => {
  return (dispatch) => {
    dispatch(deletingReg(true));
    delRegInfor(id).then((res) => {
      if (res) {
        console.log("res-reg", res);
        //   dispatch(deletingReg(false));
        //   dispatch(deleteRegSuccess(res.Msg));

        // } else {
        //   dispatch(deletingReg(false));
        //   dispatch(deleteRegFailed(`Failed to delete ${id}`));
      }

      // this.loadData(this.state.current, this.state.pageSize);
    });
    //   .catch((e) => dispatch(deleteRegFailed(e.message)));
  };
};

export const deleteRegFailed = (message) => ({
  type: REG_LIST_DELETE_FAILED,
  message,
});
export const deletingReg = (loading) => ({
  type: REG_LIST_DELETING,
  loading,
});
export const deleteRegSuccess = (regList, msg) => ({
  type: REG_LIST_DELETE_SUCCESS,
  regList,
  msg,
});
