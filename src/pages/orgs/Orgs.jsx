/*

Copyright <holder> All Rights Reserved

SPDX-License-Identifier: Apache-2.0

*/
import React, { Component } from "react";
import moment from "moment";
import { Card, Button, Popconfirm, message, Input } from "antd";
import { orgsListApi, delOrgInfor } from "../../service/orgs";
import DataTable from "../../components/DataTable/DataTable";

import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { filterOrgList, fetchOrgList } from "../../redux/actions/OrgAction";

const { Search } = Input;

class Orgs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
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
      dataIndex: "name",
    },
    {
      title: "Created At",
      dataIndex: "CreatedAt",
      render: (record) => (
        <span>{moment(record).format("YYYY-MM-DD HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      render: (txt, record, index) => {
        return (
          <div>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                this.props.history.push("/orgs/new/" + record.ID);
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
                delOrgInfor(record.ID).then((res) => {
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
    const { orgList } = this.props.org;
    const { handleFetchOrgList } = this.props;
    if (!orgList || orgList.length === 0) {
      handleFetchOrgList();
    }
  }

  loadData = (page, pageSize) => {
    const _this = this;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    orgsListApi(offset, limit)
      .then((res) => {
        console.log("loadData", res);
        _this.setState({
          orgs: res.orgs,
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
    orgsListApi(offset, limit)
      .then((res) => {
        console.log("loadData", res);
        _this.setState({
          orgs: res.orgs,
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

  createOrg = () => {
    this.props.history.push("/orgs/new");
  };
  filter = (event) => {
    this.props.handleFilterOrgList(event.target.value);
  };

  render() {
    const { filteredList, isLoading } = this.props.org;

    return (
      <Card
        title={
          "Organization Manage Panel" + "(Total: " + filteredList.length + ")"
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
              onClick={this.createOrg}
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

const mapStateToProps = ({ org }) => {
  console.log("mapStateToProps-state", org);
  return {
    org,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchOrgList: () => dispatch(fetchOrgList()),
    handleFilterOrgList: (keyword) => dispatch(filterOrgList(keyword)),
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Orgs);
