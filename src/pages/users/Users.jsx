/*
Copyright <holder> All Rights Reserved
SPDX-License-Identifier: Apache-2.0
*/
import React, { Component } from "react";
import moment from "moment";
import { Card, Button, Popconfirm, message, Input } from "antd";
import { userListApi, delUserInfor } from "../../service/users";
import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import DataTable from "../../components/DataTable/DataTable";
import { filterUserList, fetchUserList } from "../../redux/actions/UserAction";

const { Search } = Input;

class Users extends Component {
  constructor(props) {
    super(props);
    console.log("Users.props:", this.props);
    this.state = {
      users: [],
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
      dataIndex: "username",
      align: "center",
    },
    {
      title: "Created At",
      dataIndex: "CreatedAt",
      align: "center",
      render: (record) => (
        <span>{moment(record).format("YYYY-MM-DD HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      align: "center",
      render: (txt, record, index) => {
        return (
          <div>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                this.props.history.push("/users/new/" + record.ID);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Do you want to delete?"
              onCancel={() => {
                console.log("Cancel delete.");
              }}
              onConfirm={() => {
                console.log("Confirm delete.");
                delUserInfor(record.ID).then((res) => {
                  message.success(res.Msg);
                  this.loadData(this.state.current, this.state.pageSize);
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
    console.log("componentDidMount:", this);
    const { userList } = this.props.user;
    const { handleFetchUserList } = this.props;
    if (!userList || userList.length === 0) {
      handleFetchUserList();
    }
  }

  loadData = (page, pageSize) => {
    console.log("user-loadData~~", page, pageSize);
    const _this = this;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    userListApi(offset, limit)
      .then((res) => {
        console.log("loadData", res);
        _this.setState({
          users: res.users,
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
    console.log("user-toSelectchange~limit:", offset, limit);
    userListApi(offset, limit)
      .then((res) => {
        console.log("loadData", res);
        _this.setState({
          users: res.users,
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

  createUser = () => {
    this.props.history.push("/users/new");
  };
  filter = (event) => {
    this.props.handleFilterUserList(event.target.value);
  };

  render() {
    const { filteredList, isLoading } = this.props.user;
    return (
      <Card
        title={"Users" + "(Total: " + filteredList.length + ")"}
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
              onClick={this.createUser}
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

const mapStateToProps = ({ user }) => {
  console.log("mapStateToProps-state", user);
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchUserList: () => dispatch(fetchUserList()),
    handleFilterUserList: (keyword) => dispatch(filterUserList(keyword)),
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Users);
