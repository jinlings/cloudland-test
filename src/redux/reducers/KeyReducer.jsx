/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import {
  KEY_LIST_IS_FETCHING,
  KEY_LIST_FETCHED,
  KEY_LIST_FILTER,
} from "../../constants/actionTypes";

const initialState = {
  keyList: [],
  total: 0,
  filteredList: [],
  isLoading: false,
  errorMessage: "",
  keyword: "",
};
const getFilteredList = (keyList, keyword) => {
  return keyList.filter(
    (item) =>
      item.ID.toString().indexOf(keyword) > -1 ||
      item.Name.toLowerCase().indexOf(keyword) > -1
  );
};
export default function KeyReducer(state = initialState, action) {
  switch (action.type) {
    case KEY_LIST_IS_FETCHING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case KEY_LIST_FETCHED:
      return {
        ...state,
        // isLoading: action.loading,
        keyList: action.keyList,
        filteredList: getFilteredList(action.keyList, state.keyword),
      };
    case KEY_LIST_FILTER:
      return {
        ...state,
        keyword: action.keyword,
        filteredList: getFilteredList(state.keyList, action.keyword),
      };
    default:
      return state;
  }
}
