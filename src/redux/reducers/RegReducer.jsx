/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import {
  REG_LIST_IS_FETCHING,
  REG_LIST_FETCHED,
  REG_LIST_FILTER,
  REG_LIST_DELETE_FAILED,
  REG_LIST_FETCH_FAILED,
  REG_LIST_DELETING,
  REG_LIST_DELETE_SUCCESS,
} from "../../constants/actionTypes";

const initialState = {
  regList: [],
  total: 0,
  filteredList: [],
  isLoading: false,
  errorMessage: "",
  keyword: "",
  message: "",
  total: 0,
  pageSize: 10,
  offset: 0,

  current: 1,
};
const getFilteredList = (regList, keyword) => {
  return regList.filter(
    (item) =>
      item.ID.toString().indexOf(keyword) > -1 ||
      item.Label.toLowerCase().indexOf(keyword) > -1 ||
      item.OcpVersion.toLowerCase().indexOf(keyword) > -1 ||
      item.RegistryContent.toLowerCase().indexOf(keyword) > -1
  );
};
export default function RegReducer(state = initialState, action) {
  switch (action.type) {
    case REG_LIST_DELETE_FAILED:
    case REG_LIST_FETCH_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.message,
      };
    case REG_LIST_DELETING:
    case REG_LIST_IS_FETCHING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case REG_LIST_DELETE_SUCCESS:
    case REG_LIST_FETCHED:
      return {
        ...state,
        // isLoading: action.loading,
        message: action.msg,
        regList: action.regList,
        filteredList: getFilteredList(action.regList, state.keyword),
      };
    case REG_LIST_FILTER:
      return {
        ...state,
        keyword: action.keyword,
        filteredList: getFilteredList(state.regList, action.keyword),
      };
    default:
      return state;
  }
}
