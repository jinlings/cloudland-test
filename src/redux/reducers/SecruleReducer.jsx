/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import {
  SECRULE_LIST_IS_FETCHING,
  SECRULE_LIST_FETCHED,
  SECRULE_LIST_FILTER,
} from "../../constants/actionTypes";

const initialState = {
  secruleList: [],
  total: 0,
  filteredList: [],
  isLoading: false,
  errorMessage: "",
  keyword: "",
};
const getFilteredList = (secruleList, keyword) => {
  return secruleList.filter(
    (item) =>
      item.ID.toString().indexOf(keyword) > -1 ||
      item.Protocol.toLowerCase().indexOf(keyword) > -1 ||
      item.Direction.toLowerCase().indexOf(keyword) > -1 ||
      item.RemoteIp.indexOf(keyword) > -1
  );
};
export default function RegReducer(state = initialState, action) {
  switch (action.type) {
    case SECRULE_LIST_IS_FETCHING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case SECRULE_LIST_FETCHED:
      return {
        ...state,
        secruleList: action.secruleList,
        filteredList: getFilteredList(action.secruleList, state.keyword),
      };
    case SECRULE_LIST_FILTER:
      return {
        ...state,
        keyword: action.keyword,
        filteredList: getFilteredList(state.secruleList, action.keyword),
      };
    default:
      return state;
  }
}
