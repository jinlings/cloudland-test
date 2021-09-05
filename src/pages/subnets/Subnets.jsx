/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import React, { Component } from "react";
import { Card, Button, Popconfirm, message, Input } from "antd";
import { subnetsListApi, delSubInfor } from "../../service/subnets";
import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import DataTable from "../../components/DataTable/DataTable";
import { filterSubList, fetchSubList } from "../../redux/actions/SubAction";

const { Search } = Input;
class Subnets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subnets: [],
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
      //render: (txt, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "Name",
      align: "center",
    },
    {
      title: "Network",
      dataIndex: "Network",
      align: "center",
    },
    {
      title: "Netmask",
      dataIndex: "Netmask",
      align: "center",
    },
    {
      title: "Zones",
      dataIndex: "Zones",
      align: "center",
      render: (Zones) => (
        <span>
          {Zones.map((zones) => {
            return zones.Name;
          })}
        </span>
      ),
    },
    {
      title: "Vlan",
      dataIndex: "Vlan",
      align: "center",
    },
    {
      title: "Hyper",
      dataIndex: "Netlink.Hyper",
      align: "center",
    },
    {
      title: "Owner",
      dataIndex: "OwnerInfo.name",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
      render: (txt, record, index) => {
        return (
          <div>
            <Button
              style={{
                marginTop: "10px",
              }}
              type="primary"
              size="small"
              onClick={() => {
                console.log("onClick:", record);
                this.props.history.push("/subnets/new/" + record.ID);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete?"
              onCancel={() => {
                console.log("cancelled");
              }}
              onConfirm={() => {
                console.log("onClick-delete:", record);
                //this.props.history.push("/registrys/new/" + record.ID);
                delSubInfor(record.ID)
                  .then((res) => {
                    //const _this = this;
                    console.log("delSubInfor-res", res);
                    message.success(res.Msg);
                    this.loadData(this.state.current, this.state.pageSize);

                    console.log("用户~~", res);
                    console.log("用户~~state", this.state);
                  })
                  .catch((err) => {
                    console.log("用户~~err", err);
                    // message.error(err.response.data.ErrorMsg);
                  });
              }}
            >
              <Button
                style={{
                  margin: "5px",
                  marginRight: "0px",
                  marginTop: "10px",
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
  componentDidMount() {
    const { subList } = this.props.sub;
    const { handleFetchSubList } = this.props;
    if (!subList || subList.length === 0) {
      handleFetchSubList();
    }
  }
  loadData = (page, pageSize) => {
    console.log("loadData~~", page, pageSize);
    const _this = this;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    subnetsListApi(offset, limit)
      .then((res) => {
        console.log("loadData", res);

        _this.setState({
          subnets: res.subnets,
          isLoaded: true,
          total: res.total,
          pageSize: limit,
          current: page,
        });
        console.log("loadData-page-", page, _this.state);
      })
      .catch((error) => {
        message.error(error.response.data.ErrorMsg);
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
    console.log("toSelectchange~limit:", offset, limit);
    subnetsListApi(offset, limit)
      .then((res) => {
        console.log("loadData", res);
        _this.setState({
          subnets: res.subnets,
          isLoaded: true,
          total: res.total,
          pageSize: limit,
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
  createSubnets = () => {
    this.props.history.push("/subnets/new");
  };
  filter = (event) => {
    this.props.handleFilterSubList(event.target.value);
  };
  render() {
    const { filteredList, isLoading } = this.props.sub;
    return (
      <Card
        title={"Subnet Manage Panel" + "(Total: " + filteredList.length + ")"}
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
              onClick={this.createSubnets}
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

const mapStateToProps = ({ sub }) => {
  console.log("mapStateToProps-state", sub);
  return {
    sub,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchSubList: () => dispatch(fetchSubList()),
    handleFilterSubList: (keyword) => dispatch(filterSubList(keyword)),
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Subnets);
