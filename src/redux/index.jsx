/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import { combineReducers } from "redux";
import FloatingIPReducer from "./reducers/FloatingIpReducer";
import LoginReducer from "./reducers/LoginReducer";
import OcpReducer from "./reducers/OcpReducer";
import RegReducer from "./reducers/RegReducer";
import GatewayReducer from "./reducers/GatewayReducer";
import SubReducer from "./reducers/SubReducer";
import SecgroupReducer from "./reducers/SecgroupReducer";
import SecruleReducer from "./reducers/SecruleReducer";
import InstReducer from "./reducers/InstReducer";
import FlavorReducer from "./reducers/FlavorReducer";
import ImageReducer from "./reducers/ImageReducer";
import UserReducer from "./reducers/UserReducer";
import OrgReducer from "./reducers/OrgReducer";
import KeyReducer from "./reducers/KeyReducer";
// 通过combineReducers把多个reducer进行合并
const rootReducers = combineReducers({
  loginInfo: LoginReducer,
  user: UserReducer,
  org: OrgReducer,
  keys: KeyReducer,
  inst: InstReducer,
  flavor: FlavorReducer,
  image: ImageReducer,
  sub: SubReducer,
  floatingip: FloatingIPReducer,
  gw: GatewayReducer,
  secgroup: SecgroupReducer,
  secrule: SecruleReducer,
  reg: RegReducer,
  ocp: OcpReducer,
});

export default rootReducers;
