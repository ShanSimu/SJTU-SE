import {Popconfirm, Table,Drawer} from 'antd';
import React from 'react';
import {getBooks,buyBooks} from "../services/bookService";
import object from "../utils/constant";


export class UserBookstore extends React.Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                // render: text => <a>{text}</a>,
            },
            {
                title: 'Author',
                dataIndex: 'author',
                key: 'author',
            },
            {
                title: 'ISBN',
                dataIndex: 'isbn',
                key: 'isbn',
            },
            {
                title: 'Stocks',
                dataIndex: 'stocks',
                key: 'stocks',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <div>
                <Popconfirm title="Show details ?" onConfirm={() => this.handleDetail(record)}>
                    <a style={{ marginRight: 16 }}>Details</a>
                </Popconfirm>
                <Popconfirm title="Sure to buy ?" onConfirm={() => this.handleBuy(record.key)}>
                    <a style={{ marginRight: 16 }}>Buy</a>
                </Popconfirm>
                    </div>
                ),
            },
        ];
        this.state = {
            visible:false,
            details:"",
            iconBase64:"",
            data:[],
        };
    };

    handleDetail = record => {
        console.log(record);
        console.log(record.details);
        console.log(record.icon.iconBase64)
            this.setState({
            details:record.details,
            iconBase64:record.icon.iconBase64,//.icon.iconBase64,
            visible:true,
        });

    };

    onClose = () => {
        this.setState({
            visible:false,
        })
    };

    handleBuy = key => {
            // console.log(object.userID);
            // console.log(key);
        const callback = (data) =>{
            console.log(data);
        };

        buyBooks({"customer":object.userID,"book":key},callback);
    };

    componentDidMount() {
        const callback = (data) =>{
            this.setState({data:data});
        };
        getBooks({"search":null} , callback);
    }

    render() {
        const { data } = this.state;
        const columns = this.columns;
        return (
            <div>
                <Table columns={columns} dataSource={data} />
                <Drawer
                    title="Details"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <img src = {this.state.iconBase64} alt="" />
                    <p>{this.state.details}</p>
                </Drawer>
            </div>
        );
    }
}
