/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import React, { Component } from "react";
import { Card, Button, Popconfirm, message, Input } from "antd";
import { flavorsListApi, delFlavorInfor } from "../../service/flavors";
import DataTable from "../../components/DataTable/DataTable";
import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  filterFlavorList,
  fetchFlavorList,
} from "../../redux/actions/FlavorAction";
const { Search } = Input;

class Flavors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flavors: [],
      isLoaded: false,
      total: 0,
      pageSize: 10,
      offset: 0,
      pageSizeOptions: ["5", "10", "15", "20"],
      current: 1,
    };
  }
  columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      width: 80,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "Name",
      align: "center",
    },
    {
      title: "CPU",
      dataIndex: "Cpu",
      align: "center",
    },
    {
      title: "Memory",
      dataIndex: "Memory",
      align: "center",
    },
    {
      title: "Disk",
      dataIndex: "Disk",
      align: "center",
    },
    {
      title: "Swap",
      dataIndex: "Swap",
      align: "center",
    },
    {
      title: "Ephemeral",
      dataIndex: "Ephemeral",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
      render: (txt, record, index) => {
        return (
          <div>
            <Popconfirm
              title="Are you sure to delete?"
              onCancel={() => {
                console.log("deleted");
              }}
              onConfirm={() => {
                console.log("onClick-delete:", record);
                //this.props.history.push("/registrys/new/" + record.ID);
                delFlavorInfor(record.ID).then((res) => {
                  //const _this = this;
                  message.success(res.Msg);
                  this.loadData(this.state.current, this.state.pageSize);

                  console.log("用户~~", res);
                  console.log("用户~~state", this.state);
                });
              }}
            >
              <Button style={{ margin: "0 1rem" }} type="danger" size="small">
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  componentDidMount() {
    const { flavorList } = this.props.flavor;
    const { handleFetchFlavorList } = this.props;
    if (!flavorList || flavorList.length === 0) {
      handleFetchFlavorList();
    }
  }
  loadData = (page, pageSize) => {
    console.log("flavor-loadData~~", page, pageSize);
    const _this = this;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    flavorsListApi(offset, limit)
      .then((res) => {
        console.log("loadData", res);
        _this.setState({
          flavors: res.flavors,
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
    console.log("flavor-toSelectchange~limit:", offset, limit);
    flavorsListApi(offset, limit)
      .then((res) => {
        console.log("loadData", res);
        _this.setState({
          flavors: res.flavors,
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
  createFlavors = () => {
    this.props.history.push("/flavors/new");
  };
  flavorsFormList = (data) => {
    console.log("flavors-FormList", data);
    const flavorsFormList = [
      {
        type: "INPUT",
        label: "Name",
        name: "name",
        // field: "Change Hostname",
        placeholder: "please input flavor name",
        width: "90%",
        // initialValue: data.Hostname,
        // id: data.ID,
      },
      {
        type: "INPUT",
        label: "CPU",
        name: "cpu",
        // field: "Change Hostname",
        placeholder: "please input flavor cpu",
        width: "90%",
        // initialValue: data.Hostname,
        // id: data.ID,
      },
      {
        type: "INPUT",
        label: "Memory(M)",
        name: "memory",
        // field: "Change Hostname",
        placeholder: "please input flavor memory",
        width: "90%",
        // initialValue: data.Hostname,
        // id: data.ID,
      },
      {
        type: "INPUT",
        label: "Disk(G)",
        name: "disk",
        // field: "Change Hostname",
        placeholder: "please input flavor disk",
        width: "90%",
        // initialValue: data.Hostname,
        // id: data.ID,
      },
      {
        type: "INPUT",
        label: "Swap(G)",
        name: "swap",
        // field: "Change Hostname",
        placeholder: "please input flavor swap",
        width: "90%",
        // initialValue: data.Hostname,
        // id: data.ID,
      },
      {
        type: "INPUT",
        label: "Ephemeral(G)",
        name: "ephemeral",
        // field: "Change Hostname",
        placeholder: "please input flavor ephemeral",
        width: "90%",
        // initialValue: data.Hostname,
        // id: data.ID,
      },
    ];
    return flavorsFormList;
  };
  filter = (event) => {
    this.props.handleFilterFlavorList(event.target.value);
  };
  render() {
    const { filteredList, isLoading } = this.props.flavor;

    return (
      <Card
        title={"Flavor Manage Panel " + "(Total: " + filteredList.length + ")"}
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
              onClick={this.createFlavors}
            >
              Create
            </Button>
          </div>
        }
      >
        <DataTable
          rowKey="ID"
          columns={this.columns}
          dataSource={filteredList}
          bordered
          total={filteredList.length}
          pageSize={this.state.pageSize}
          scroll={{ y: 600 }}
          onPaginationChange={this.onPaginationChange}
          onShowSizeChange={this.onShowSizeChange}
          pageSizeOptions={this.state.pageSizeOptions}
          loading={isLoading}
        />
      </Card>
    );
  }
}
const mapStateToProps = ({ flavor }) => {
  console.log("mapStateToProps-state", flavor);
  return {
    flavor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchFlavorList: () => dispatch(fetchFlavorList()),
    handleFilterFlavorList: (keyword) => dispatch(filterFlavorList(keyword)),
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Flavors);
