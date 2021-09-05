/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import {
  FLAVOR_LIST_IS_FETCHING,
  FLAVOR_LIST_FETCHED,
  FLAVOR_LIST_FILTER,
} from "../../constants/actionTypes";

const initialState = {
  flavorList: [],
  total: 0,
  filteredList: [],
  isLoading: false,
  errorMessage: "",
  keyword: "",
};
const getFilteredList = (flavorList, keyword) => {
  return flavorList.filter(
    (item) =>
      item.ID.toString().indexOf(keyword) > -1 ||
      item.Name.toLowerCase().indexOf(keyword) > -1
  );
};
export default function FlavorReducer(state = initialState, action) {
  switch (action.type) {
    case FLAVOR_LIST_IS_FETCHING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case FLAVOR_LIST_FETCHED:
      return {
        ...state,
        // isLoading: action.loading,
        flavorList: action.flavorList,
        filteredList: getFilteredList(action.flavorList, state.keyword),
      };
    case FLAVOR_LIST_FILTER:
      return {
        ...state,
        keyword: action.keyword,
        filteredList: getFilteredList(state.flavorList, action.keyword),
      };
    default:
      return state;
  }
}
