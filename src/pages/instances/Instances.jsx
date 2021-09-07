/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import React, { Component } from "react";
import {
  Card,
  Button,
  Popconfirm,
  Row,
  Col,
  Menu,
  Dropdown,
  message,
  Tooltip,
  Input,
} from "antd";
import {
  instListApi,
  delInstInfor,
  getInstInforById,
  editInstInfor,
  getInstInforforAll,
} from "../../service/instances";
import DataTable from "../../components/DataTable/DataTable";
import { getAll } from "../../utils/auth";

import { connect } from "react-redux";
import InstModal from "./InstModal";
import "./instances.css";
const { Search } = Input;
class Instances extends Component {
  constructor(props) {
    super(props);
    console.log("instance-props", this.props);
    console.log("getAll-instance", sessionStorage.loginInfo);
    this.state = {
      updateInstance: {},

      instances: [],
      filteredList: [],
      isLoaded: false,
      total: 0,
      pageSize: 10,
      offset: 0,
      pageSizeOptions: ["5", "10", "15", "20"],
      current: 1,
      visible: false,
      everyData: {},
      menuKey: "",
      flag: "",
      action: "",
      zone: [],
    };
  }

  columns = [
    {
      title: "ID",
      key: "ID",
      width: 60,
      align: "center",
      dataIndex: "ID",
    },
    {
      title: "HostName",
      dataIndex: "Hostname",
      align: "center",
    },
    {
      title: "Flavor",
      dataIndex: "Flavor.Name",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "Image.Name",
      align: "center",
    },
    {
      title: "IP Address",
      dataIndex: "Interfaces",
      key: Math.random(),
      align: "center",
      render: (Interfaces) => (
        <span>
          {Interfaces.map((iface) => {
            return iface.Address.Address + " ";
          })}
        </span>
      ),
    },
    {
      title: "Console",
      dataIndex: "",
      align: "center",
    },
    {
      title: "Status",
      align: "center",
      width: "60px",
      render: (record) => {
        return (
          <Tooltip title={record.Reason}>
            <span style={{ color: "#1890ff" }}>{record.Status}</span>
          </Tooltip>
        );
      },
    },
    {
      title: "Hyper",
      dataIndex: "Hyper",
      align: "center",
      className: sessionStorage.loginInfo.isAdmin ? "" : "columnHidden",
    },
    {
      title: "Owner",
      dataIndex: "OwnerInfo.name",
      align: "center",
      className: sessionStorage.loginInfo.isAdmin ? "" : "columnHidden",
    },
    {
      title: "Zone",
      dataIndex: "Zone.Name",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
      render: (txt, record, index) => {
        return (
          <div className="actionStyle">
            <Dropdown.Button
              type="primary"
              onClick={() => {
                console.log("onClick:", record);
                this.props.history.push("/instances/new/" + record.ID);
              }}
              overlay={this.menu(record.ID)}
            >
              Edit
            </Dropdown.Button>
            <Popconfirm
              title="Are you sure to delete?"
              onCancel={() => {
                console.log("cancelled");
              }}
              onConfirm={() => {
                console.log("onClick-delete:", record);
                delInstInfor(record.ID).then((res) => {
                  message.success(res.Msg);
                  this.loadData(this.state.current, this.state.pageSize);

                  console.log("用户~~", res);
                  console.log("用户~~state", this.state);
                });
              }}
            >
              <Button
                style={{
                  margin: "5px",
                  marginRight: "0px",
                  marginTop: "10px",
                  height: "32px",
                }}
                type="danger"
                size="small"
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  menu = (r) => (
    <Menu onClick={this.handleModal.bind(this, r)}>
      <Menu.Item key="changeHostname">Change Hostname</Menu.Item>
      <Menu.Item key="migrateIns">Migrate Instance</Menu.Item>
      <Menu.Item key="resizeIns">Resize Instance</Menu.Item>
      <Menu.Item key="changeStatus">Change Status</Menu.Item>
      <Menu.Item key="startVm">Start VM</Menu.Item>
      <Menu.Item key="stopVm">Stop VM</Menu.Item>
    </Menu>
  );

  handleModal = (id, { key }) => {
    console.log("handleModal-key", key);
    this.handleChange(id);
    console.log("handleModal", id);
    if (
      key === "changeHostname" ||
      key === "migrateIns" ||
      key === "resizeIns"
    ) {
      this.setState({
        visible: !this.state.visible,
      });
    } else if (key === "changeStatus") {
      this.setState({
        visible: !this.state.visible,
        flag: "ChangeStatus",
      });
    } else if (key === "startVm") {
      this.setState(
        {
          flag: "ChangeStatus",
          action: "start",
        },
        () => {
          getInstInforById(id, {
            flag: this.state.flag,
            action: this.state.action,
          })
            .then((res) => {
              message.success(res.Msg);
              this.loadData(this.state.current, this.state.pageSize);
            })
            .catch((error) => {
              console.log(error);
            });
          message.success("Start VM successfully");
        }
      );
    } else {
      this.setState(
        {
          flag: "ChangeStatus",
          action: "shutdown",
        },
        () => {
          getInstInforById(id, {
            flag: this.state.flag,
            action: this.state.action,
          })
            .then((res) => {
              console.log("stopVm", res);
              message.success(res.Msg);
              this.loadData(this.state.current, this.state.pageSize);
            })
            .catch((error) => {
              console.log(error);
            });
          message.success("Stop VM successfully");
        }
      );
    }

    if (key) {
      switch (key) {
        case "changeHostname":
          return this.setState({
            menuKey: key,
            title: "Change Hostname",
          });
        case "migrateIns":
          return this.setState({
            menuKey: key,
            title: "Migrate Instance",
          });
        case "resizeIns":
          return this.setState({
            menuKey: key,
            title: "Resize Instance",
          });
        case "changeStatus":
          return this.setState({
            title: "Change Status",
          });
        case "startVm":
          return this.setState({
            title: "Start VM",
          });
        case "stopVm":
          return this.setState({
            title: "Stop VM",
          });
        default:
          return null;
      }
    }
  };
  handleChange = (id) => {
    getInstInforById(id).then((res) => {
      console.log("handleChange-getInstInforById-res:", res);
      this.setState((sta) => (sta.everyData = res.instance));
      console.log("handleChange-state.everyData", this.state);
    });
  };
  onCancel = () => {
    console.log("cancel");
    this.setState({
      visible: false,
      key: Math.random(),
    });
  };
  handleOk = () => {
    console.log("ok");
    this.setState({
      visible: false,
      key: Math.random(),
    });
  };
  componentDidMount() {
    const _this = this;
    instListApi()
      .then((res) => {
        console.log("componentDidMount-instances:", res);
        _this.setState({
          instances: res.instances,
          filteredList: res.instances,
          isLoaded: true,
          total: res.total,
        });
      })
      .catch((error) => {
        _this.setState({
          isLoaded: false,
          error: error,
        });
      });
  }
  // componentDidUpdate() {
  //   const _this = this;
  //   instListApi()
  //     .then((res) => {
  //       console.log("componentDidUpdate-instances:", res);
  //       _this.setState({
  //         instances: res.instances,
  //         filteredList: res.instances,
  //         isLoaded: true,
  //         total: res.total,
  //       });
  //     })
  //     .catch((error) => {
  //       _this.setState({
  //         isLoaded: false,
  //         error: error,
  //       });
  //     });
  // }
  loadData = (page, pageSize) => {
    console.log("ins-loadData~~", page, pageSize);
    const _this = this;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    instListApi(offset, limit)
      .then((res) => {
        console.log("loadData", res);
        _this.setState({
          instances: res.instances,
          filteredList: res.instances,
          isLoaded: true,
          total: res.total,
          pageSize: limit,
          current: page,
        });
        console.log("loadData-page-", page, _this.state);
      })
      .catch((error) => {
        _this.setState({
          isLoaded: false,
          error: error,
        });
      });
  };
  toSelectchange = (page, num) => {
    console.log("toSelectchange", page, num);
    const _this = this;
    const offset = (page - 1) * num;
    const limit = num;
    console.log("instance-toSelectchange~limit:", offset, limit);
    instListApi(offset, limit)
      .then((res) => {
        console.log("loadData", res);
        _this.setState({
          instances: res.instances,
          filteredList: res.instances,
          isLoaded: true,
          total: res.total,
          pageSize: limit,
          current: page,
        });
      })
      .catch((error) => {
        _this.setState({
          isLoaded: false,
          error: error,
        });
      });
  };
  onPaginationChange = (e) => {
    console.log("onPaginationChange", e);
    this.loadData(e, this.state.pageSize);
  };
  onShowSizeChange = (current, pageSize) => {
    console.log("onShowSizeChange:", current, pageSize);
    //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
    this.toSelectchange(current, pageSize);
  };

  createInstances = () => {
    this.props.history.push("/instances/new");
  };

  modalFormList = (data) => {
    console.log("instance-modalFormList", data);
    console.log("key-modalFormList", this.state.menuKey);
    const modalFormList = [
      {
        type: "INPUT",
        label: "Hostname",
        name: "hostname",
        field: "Change Hostname",
        placeholder: "Please input Hostname",
        width: "90%",
        initialValue: data.Hostname,
        id: data.ID,
      },
      {
        type: "SELECT",
        width: "200px",
        label: "Hyper",
        name: "hyper",
        field: "Migrate Instance",
        // disabled:true,
        initialValue: data.Hyper,
        id: data.ID,
      },
      {
        type: "SELECT",
        width: "200px",
        label: "Flavor",
        field: "Resize Instance",
        name: "flavor",
        initialValue: data.FlavorID,
        id: data.ID,
      },
      {
        type: "SELECT",
        label: "Action",
        name: "action",
        field: "Change Status",
        placeholder: "Please Select Status",
        width: "90%",
        // disabled:true,
        initialValue: data.Status,
        id: data.ID,
      },
    ];
    return modalFormList;
  };
  handleSubmit = (data) => {
    const id = this.state.everyData && this.state.everyData.ID;
    if (id) {
      const hostname = this.state.everyData && this.state.everyData.Hostname;
      const hyper = this.state.everyData && this.state.everyData.Hyper;
      const action = this.state.everyData && this.state.everyData.Status;
      const flavor = this.state.everyData && this.state.everyData.FlavorID;
      let ifaces = [];

      this.state.everyData &&
        this.state.everyData.Interfaces.map((item) => {
          ifaces.push(`${item.Address.SubnetID}`);
          return ifaces;
        });

      let initInstance = {};
      initInstance["hostname"] = hostname;
      initInstance["hyper"] = hyper;
      initInstance["action"] = action;
      initInstance["flavor"] = flavor;
      initInstance["ifaces"] = ifaces;
      this.setState(
        {
          updateInstance: initInstance,
        },
        () => {
          if (data.hostname) {
            initInstance.hostname = data.hostname;
          } else if (data.hyper) {
            initInstance.hyper = data.hyper;
          } else if (data.flavor) {
            initInstance.flavor = data.flavor;
          } else if (data.action) {
            initInstance.action = data.action;
          }
          let dataInstance = Object.assign(
            {},
            this.state.updateInstance,
            initInstance,
            data
          );
          console.log("dataInstance", dataInstance);
          this.handleUpdateList(id, dataInstance);
        }
      );
    }
  };
  handleUpdateList = (id, paramsObj) => {
    console.log("hangleUpdateList", paramsObj, id);
    if (id) {
      editInstInfor(id, paramsObj)
        .then((res) => {
          // let _json = res.data;
          // if (_json.return_code === "0") {
          console.log("handleUpdateList-editInstInfor:", res);
          // } else {
          //   message.error(res.message);
          // }
          this.loadData(this.state.current, this.state.pageSize);
        })
        .catch((err) => {
          console.log("handleUpdateList-error:", err);
        });
    }

    this.setState({
      visible: false,
    });
  };
  filter = (event) => {
    console.log("event-filter", event.target.value);
    this.getFilteredList(event.target.value);
  };
  getFilteredList = (word) => {
    console.log("getFilteredListr-keyword-ocp", word);
    var keyword = word.toLowerCase();
    if (keyword) {
      this.setState({
        filteredList: this.state.instances.filter(
          (item) =>
            item.ID.toString().indexOf(keyword) > -1 ||
            item.Hostname.toLowerCase().indexOf(keyword) > -1 ||
            item.Status.toLowerCase().indexOf(keyword) > -1
          // ||
          // item.Zone.Name.toLowerCase().indexOf(keyword) > -1 ||
          // item.Image.Name.toLowerCase().indexOf(keyword) > -1
        ),
        total: this.state.filteredList.length,
      });

      console.log("filteredList", this.state.filteredList);
    } else {
      this.setState({
        filteredList: this.state.instances,
      });
    }
  };
  render() {
    const { everyData } = this.state;
    return (
      <div>
        <Row>
          <Col span={24}>
            <Card
              title={
                "Instance Manage Panel" + "(Total: " + this.state.total + ")"
              }
              extra={
                <div>
                  <Search
                    placeholder="Search..."
                    onChange={this.filter}
                    enterButton
                  />
                  <Button
                    style={{
                      float: "right",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                    type="primary"
                    onClick={this.createInstances}
                  >
                    Create
                  </Button>
                </div>
              }
            >
              <Row>
                <Col span={24}>
                  <DataTable
                    rowKey="ID"
                    columns={this.columns}
                    dataSource={this.state.filteredList}
                    bordered
                    total={this.state.total}
                    pageSize={this.state.pageSize}
                    // scroll={{ y: 600, x: 600 }}
                    onPaginationChange={this.onPaginationChange}
                    onShowSizeChange={this.onShowSizeChange}
                    pageSizeOptions={this.state.pageSizeOptions}
                    loading={!this.state.isLoaded}
                  />
                  <InstModal
                    visible={this.state.visible}
                    modalFormList={this.modalFormList(everyData)}
                    title={this.state.title}
                    submit={this.handleSubmit.bind(this)}
                    close={() => {
                      this.setState({
                        visible: false,
                        everyData: {},
                      });
                    }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   console.log("mapStateToProps-instance:", state);
//   // var loginInfo = JSON.parse(state.loginInfo);
//   // console.log("mapStateToProps-isadmin:", JSON.parse(state.loginInfo));

//   return state;
// };
// const mapStateToProps = ({ loginInfo }) => {
//   console.log("mapStateToProps-instance:", loginInfo);
//   // var loginInfo = JSON.parse(state.loginInfo);
//   // console.log("mapStateToProps-isadmin:", JSON.parse(state.loginInfo));

//   return loginInfo;
// };
export default Instances;
