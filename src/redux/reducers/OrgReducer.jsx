/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import {
  ORG_LIST_IS_FETCHING,
  ORG_LIST_FETCHED,
  ORG_LIST_FILTER,
} from "../../constants/actionTypes";

const initialState = {
  orgList: [],
  total: 0,
  filteredList: [],
  isLoading: false,
  errorMessage: "",
  keyword: "",
};
const getFilteredList = (orgList, keyword) => {
  return orgList.filter(
    (item) =>
      item.ID.toString().indexOf(keyword) > -1 ||
      item.name.toLowerCase().indexOf(keyword) > -1
  );
};
export default function OrgReducer(state = initialState, action) {
  switch (action.type) {
    case ORG_LIST_IS_FETCHING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case ORG_LIST_FETCHED:
      return {
        ...state,
        // isLoading: action.loading,
        orgList: action.orgList,
        filteredList: getFilteredList(action.orgList, state.keyword),
      };
    case ORG_LIST_FILTER:
      return {
        ...state,
        keyword: action.keyword,
        filteredList: getFilteredList(state.orgList, action.keyword),
      };
    default:
      return state;
  }
}
