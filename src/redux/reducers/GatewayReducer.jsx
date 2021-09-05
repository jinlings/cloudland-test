/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import {
  GW_LIST_IS_FETCHING,
  GW_LIST_FETCHED,
  GW_LIST_FILTER,
} from "../../constants/actionTypes";

const initialState = {
  gwList: [],
  total: 0,
  filteredList: [],
  isLoading: false,
  errorMessage: "",
  keyword: "",
};
const getFilteredList = (gwList, keyword) => {
  return gwList.filter(
    (item) =>
      item.ID.toString().indexOf(keyword) > -1 ||
      item.Name.toLowerCase().indexOf(keyword) > -1 ||
      item.Status.toLowerCase().indexOf(keyword) > -1 ||
      item.Hyper.toString().indexOf(keyword) > -1
  );
};
export default function RegReducer(state = initialState, action) {
  switch (action.type) {
    case GW_LIST_IS_FETCHING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case GW_LIST_FETCHED:
      return {
        ...state,
        // isLoading: action.loading,
        gwList: action.gwList,
        filteredList: getFilteredList(action.gwList, state.keyword),
      };
    case GW_LIST_FILTER:
      console.log("LIST_FILTER-state", state);
      return {
        ...state,
        keyword: action.keyword,
        filteredList: getFilteredList(state.gwList, action.keyword),
      };
    default:
      return state;
  }
}
