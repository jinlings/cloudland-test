/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import {
  USER_LIST_IS_FETCHING,
  USER_LIST_FETCHED,
  USER_LIST_FILTER,
} from "../../constants/actionTypes";

const initialState = {
  userList: [],
  total: 0,
  filteredList: [],
  isLoading: false,
  errorMessage: "",
  keyword: "",
};
const getFilteredList = (userList, keyword) => {
  return userList.filter(
    (item) =>
      item.ID.toString().indexOf(keyword) > -1 ||
      item.username.toLowerCase().indexOf(keyword) > -1
  );
};
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LIST_IS_FETCHING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case USER_LIST_FETCHED:
      return {
        ...state,
        // isLoading: action.loading,
        userList: action.userList,
        filteredList: getFilteredList(action.userList, state.keyword),
      };
    case USER_LIST_FILTER:
      return {
        ...state,
        keyword: action.keyword,
        filteredList: getFilteredList(state.userList, action.keyword),
      };
    default:
      return state;
  }
}
