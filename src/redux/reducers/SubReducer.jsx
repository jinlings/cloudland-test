/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import {
  SUB_LIST_IS_FETCHING,
  SUB_LIST_FETCHED,
  SUB_LIST_FILTER,
} from "../../constants/actionTypes";

const initialState = {
  subList: [],
  total: 0,
  filteredList: [],
  isLoading: false,
  errorMessage: "",
  keyword: "",
};
const getFilteredList = (subList, keyword) => {
  return subList.filter(
    (item) =>
      item.ID.toString().indexOf(keyword) > -1 ||
      item.Name.toLowerCase().indexOf(keyword) > -1 ||
      item.Network.toLowerCase().indexOf(keyword) > -1 ||
      item.Network.toLowerCase().indexOf(keyword) > -1 ||
      item.Vlan.toString().indexOf(keyword) > -1
    //   ||
    //   item.OwnerInfo.name.toLowerCase().indexOf(keyword) > -1 ||
    //   item.Netlink.Hyper.toString().indexOf(keyword) > -1 ||
    //   item.Zones.map((val) => {
    //     return val.Name.toLowerCase().indexOf(keyword) > -1;
    //   })
  );
};
export default function SubReducer(state = initialState, action) {
  switch (action.type) {
    case SUB_LIST_IS_FETCHING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case SUB_LIST_FETCHED:
      return {
        ...state,
        // isLoading: action.loading,
        subList: action.subList,
        filteredList: getFilteredList(action.subList, state.keyword),
      };
    case SUB_LIST_FILTER:
      return {
        ...state,
        keyword: action.keyword,
        filteredList: getFilteredList(state.subList, action.keyword),
      };
    default:
      return state;
  }
}
