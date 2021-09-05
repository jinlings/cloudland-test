/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import {
  SECGROUP_LIST_IS_FETCHING,
  SECGROUP_LIST_FETCHED,
  SECGROUP_LIST_FILTER,
} from "../../constants/actionTypes";

const initialState = {
  secgroupList: [],
  total: 0,
  filteredList: [],
  isLoading: false,
  errorMessage: "",
  keyword: "",
};
const getFilteredList = (secgroupList, keyword) => {
  return secgroupList.filter(
    (item) =>
      item.ID.toString().indexOf(keyword) > -1 ||
      item.Name.toLowerCase().indexOf(keyword) > -1 ||
      item.IsDefault.toString().indexOf(keyword) > -1
  );
};
export default function RegReducer(state = initialState, action) {
  switch (action.type) {
    case SECGROUP_LIST_IS_FETCHING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case SECGROUP_LIST_FETCHED:
      return {
        ...state,
        // isLoading: action.loading,
        secgroupList: action.secgroupList,
        filteredList: getFilteredList(action.secgroupList, state.keyword),
      };
    case SECGROUP_LIST_FILTER:
      return {
        ...state,
        keyword: action.keyword,
        filteredList: getFilteredList(state.secgroupList, action.keyword),
      };
    default:
      return state;
  }
}
