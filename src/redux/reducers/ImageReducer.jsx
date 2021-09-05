/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import {
  IMAGE_LIST_IS_FETCHING,
  IMAGE_LIST_FETCHED,
  IMAGE_LIST_FILTER,
} from "../../constants/actionTypes";

const initialState = {
  imageList: [],
  total: 0,
  filteredList: [],
  isLoading: false,
  errorMessage: "",
  keyword: "",
};
const getFilteredList = (imageList, keyword) => {
  return imageList.filter(
    (item) =>
      item.ID.toString().indexOf(keyword) > -1 ||
      item.Name.toLowerCase().indexOf(keyword) > -1 ||
      item.Format.toLowerCase().indexOf(keyword) > -1 ||
      item.Status.toLowerCase().indexOf(keyword) > -1 ||
      item.UserName.toLowerCase().indexOf(keyword) > -1 ||
      item.VirtType.toLowerCase().indexOf(keyword) > -1 ||
      item.Architecture.toLowerCase().indexOf(keyword) > -1
  );
};
export default function ImageReducer(state = initialState, action) {
  switch (action.type) {
    case IMAGE_LIST_IS_FETCHING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case IMAGE_LIST_FETCHED:
      return {
        ...state,
        // isLoading: action.loading,
        imageList: action.imageList,
        filteredList: getFilteredList(action.imageList, state.keyword),
      };
    case IMAGE_LIST_FILTER:
      return {
        ...state,
        keyword: action.keyword,
        filteredList: getFilteredList(state.imageList, action.keyword),
      };
    default:
      return state;
  }
}
