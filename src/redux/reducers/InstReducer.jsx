/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import {
  INST_LIST_IS_FETCHING,
  INST_LIST_FETCHED,
  INST_LIST_FILTER,
} from "../../constants/actionTypes";

const initialState = {
  instList: [],
  total: 0,
  filteredList: [],
  isLoading: false,
  errorMessage: "",
  keyword: "",
};
const getFilteredList = (instList, keyword) => {
  return instList.filter(
    (item) =>
      item.ID.toString().indexOf(keyword) > -1 ||
      item.Hostname.toLowerCase().indexOf(keyword) > -1 ||
      item.Status.toLowerCase().indexOf(keyword) > -1 ||
      item.Zone.Name.toLowerCase().indexOf(keyword) > -1
  );
};
export default function InstReducer(state = initialState, action) {
  switch (action.type) {
    case INST_LIST_IS_FETCHING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case INST_LIST_FETCHED:
      return {
        ...state,
        // isLoading: action.loading,
        instList: action.instList,
        filteredList: getFilteredList(action.instList, state.keyword),
      };
    case INST_LIST_FILTER:
      return {
        ...state,
        keyword: action.keyword,
        filteredList: getFilteredList(state.instList, action.keyword),
      };
    default:
      return state;
  }
}
