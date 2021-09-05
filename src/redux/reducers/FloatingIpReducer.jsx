/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import {
  FLOATINGIP_LIST_IS_FETCHING,
  FLOATINGIP_LIST_FETCHED,
  FLOATINGIP_LIST_FILTER,
} from "../../constants/actionTypes";

const initialState = {
  floatList: [],
  total: 0,
  filteredList: [],
  isLoading: false,
  errorMessage: "",
  keyword: "",
};
const getFilteredList = (floatList, keyword) => {
  return floatList.filter(
    (item) =>
      item.ID.toString().indexOf(keyword) > -1 ||
      item.FipAddress.indexOf(keyword) > -1 ||
      item.IntAddress.indexOf(keyword) > -1 ||
      item.Instance.Hostname.toLowerCase().indexOf(keyword) > -1
  );
};
export default function FloatingIPReducer(state = initialState, action) {
  switch (action.type) {
    case FLOATINGIP_LIST_IS_FETCHING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case FLOATINGIP_LIST_FETCHED:
      return {
        ...state,
        // isLoading: action.loading,
        floatList: action.floatList,
        filteredList: getFilteredList(action.floatList, state.keyword),
      };
    case FLOATINGIP_LIST_FILTER:
      return {
        ...state,
        keyword: action.keyword,
        filteredList: getFilteredList(state.floatList, action.keyword),
      };
    default:
      return state;
  }
}
