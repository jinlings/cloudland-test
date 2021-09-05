/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import React, { Component } from "react";
import moment from "moment";
import { Card, Button, Popconfirm, Input } from "antd";
import { keysListApi } from "../../service/keys";
import DataTable from "../../components/DataTable/DataTable";
import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { filterKeyList, fetchKeyList } from "../../redux/actions/KeyAction";
const { Search } = Input;

class Keys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      isLoaded: false,
      total: 0,
    };
  }
  columns = [
    {
      title: "ID",
      key: "ID",
      width: 80,
      align: "center",
      dataIndex: "ID",
      //render: (txt, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "Name",
      align: "center",
    },
    {
      title: "Owner",
      dataIndex: "OwnerInfo.name",
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
            <Popconfirm
              title="Are you sure to delete?"
              onCancel={() => {
                console.log("cancelled");
              }}
              onConfirm={() => {
                console.log("confirmed");
                //此处调用api接口进行相关操作
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
    const { keyList } = this.props.keys;
    const { handleFetchKeyList } = this.props;
    if (!keyList || keyList.length === 0) {
      handleFetchKeyList();
    }
  }
  demo = () => {
    console.log("11");
  };
  filter = (event) => {
    this.props.handleFilterKeyList(event.target.value);
  };
  render() {
    const { filteredList, isLoading } = this.props.keys;

    return (
      <Card
        title={"Key Manage Panel" + "(Total: " + filteredList.length + ")"}
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
                paddingLight: "10px",
              }}
              type="primary"
              onClick={this.demo}
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
          // scroll={{ y: 600, x: 600 }}
          onPaginationChange={this.onPaginationChange}
          onShowSizeChange={this.onShowSizeChange}
          pageSizeOptions={this.state.pageSizeOptions}
          loading={isLoading}
        />
      </Card>
    );
  }
}

const mapStateToProps = ({ keys }) => {
  console.log("mapStateToProps-state-key", keys);
  return {
    keys,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchKeyList: () => dispatch(fetchKeyList()),
    handleFilterKeyList: (keyword) => dispatch(filterKeyList(keyword)),
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Keys);
