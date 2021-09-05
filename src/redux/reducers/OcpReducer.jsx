/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import {
  OCP_LIST_IS_FETCHING,
  OCP_LIST_FETCHED,
  OCP_LIST_FILTER,
} from "../../constants/actionTypes";

const initialState = {
  ocpList: [],
  total: 0,
  filteredList: [],
  isLoading: false,
  errorMessage: "",
  keyword: "",
};
const getFilteredList = (ocpList, keyword) => {
  return ocpList.filter(
    (item) =>
      item.ID.toString().indexOf(keyword) > -1 ||
      item.BaseDomain.toLowerCase().indexOf(keyword) > -1 ||
      item.ClusterName.toLowerCase().indexOf(keyword) > -1 ||
      item.Flavor.toString().indexOf(keyword) > -1 ||
      item.Haflag.toLowerCase().indexOf(keyword) > -1 ||
      item.Status.toLowerCase().indexOf(keyword) > -1 ||
      item.WorkerNum.toString().indexOf(keyword) > -1 ||
      item.Version.toLowerCase().indexOf(keyword) > -1
  );
};
export default function OcpReducer(state = initialState, action) {
  switch (action.type) {
    case OCP_LIST_IS_FETCHING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case OCP_LIST_FETCHED:
      return {
        ...state,

        ocpList: action.ocpList,
        filteredList: getFilteredList(action.ocpList, state.keyword),
      };
    case OCP_LIST_FILTER:
      return {
        ...state,
        keyword: action.keyword,
        filteredList: getFilteredList(state.ocpList, action.keyword),
      };
    default:
      return state;
  }
}
