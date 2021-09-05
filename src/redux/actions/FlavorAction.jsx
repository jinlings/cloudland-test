import {
  FLAVOR_LIST_FETCHED,
  FLAVOR_LIST_FILTER,
  FLAVOR_LIST_IS_FETCHING,
} from "../../constants/actionTypes";
import { flavorsListApi } from "../../service/flavors";
export const filterFlavorList = (keyword) => ({
  type: FLAVOR_LIST_FILTER,
  keyword,
});
export const fetchFlavorList = () => {
  return (dispatch) => {
    dispatch(fetchingFlavorList(true));
    flavorsListApi().then((res) => {
      // let resData = res.data;
      if (res) {
        dispatch(fetchingFlavorList(false));
        dispatch(fetchFlavorListSuccess(res.flavors, false));
      } else {
        dispatch(fetchingFlavorList(false));
        //   dispatch(fetchUserListFailed("获取用户列表失败"));
      }
    });
    //   .catch((e) => dispatch(fetchUserListFailed(e.message)));
  };
};
export const fetchFlavorListSuccess = (flavorList, loading) => ({
  type: FLAVOR_LIST_FETCHED,
  flavorList,
  loading,
});
export const fetchingFlavorList = (loading) => ({
  type: FLAVOR_LIST_IS_FETCHING,
  loading,
});
