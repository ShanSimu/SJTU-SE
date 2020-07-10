import {Descriptions, Badge, Switch, Table, Button, Tag, Space, Popconfirm} from 'antd';
import React from 'react';
import {getPassengers,blockOrUnblock} from "../services/userService";

export class Profile extends React.Component {
    availability;

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Availability',
                dataIndex: 'availability',
                key: 'availability',
                render:(text, record) => (
                    <Switch checkedChildren="UNBLOCKED" unCheckedChildren="BLOCKED" defaultChecked={record.availability} onChange={() => this.handleBlockOrUnblock(record)}/>
                ),
            },
        ];
        this.state = {
            data:[]
        }
    }
    handleBlockOrUnblock = record =>{
        const callback = (data) =>{
            this.setState({data:data});
        };
        blockOrUnblock({"userID":record.key,"blockBit":(record.availability?0:1)},callback)
    };
    componentDidMount() {
        const callback = (data) =>{
            this.setState({data:data});
        };
        getPassengers({"search":null} , callback);
    }
    render() {
        const { data } = this.state;
        const columns = this.columns;
        return (
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}
