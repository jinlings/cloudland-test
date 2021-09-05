import {
  IMAGE_LIST_FETCHED,
  IMAGE_LIST_FILTER,
  IMAGE_LIST_IS_FETCHING,
} from "../../constants/actionTypes";
import { imagesListApi } from "../../service/images";

export const filterImageList = (keyword) => ({
  type: IMAGE_LIST_FILTER,
  keyword,
});
export const fetchImageList = () => {
  return (dispatch) => {
    dispatch(fetchingImageList(true));
    imagesListApi().then((res) => {
      console.log("regAction-res", res);
      // let resData = res.data;
      if (res) {
        dispatch(fetchingImageList(false));
        dispatch(fetchImageListSuccess(res.images, false));
        //   } else {
        //     //   dispatch(fetchingUserList(false));
        //     //   dispatch(fetchUserListFailed("获取用户列表失败"));
      }
    });
    //   .catch((e) => dispatch(fetchUserListFailed(e.message)));
  };
};
export const fetchImageListSuccess = (imageList, loading) => ({
  type: IMAGE_LIST_FETCHED,
  imageList,
  loading,
});
export const fetchingImageList = (loading) => ({
  type: IMAGE_LIST_IS_FETCHING,
  loading,
});
