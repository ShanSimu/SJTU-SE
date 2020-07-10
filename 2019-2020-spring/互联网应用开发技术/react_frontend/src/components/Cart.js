import {Table, Button, Popconfirm, message} from 'antd';
import React from 'react';
import {getCart, saveOneCart,reduceOneCart,deleteOneCart} from "../services/bookService";
import object from "../utils/constant";

export class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.book_id = 0;
        this.columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Author',
                dataIndex: 'author',
                key: 'author',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Stocks',
                dataIndex: 'stocks',
                key: 'stocks',
            },
            {
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <Button type="primary" onClick={() => this.handleAdd(record.book_id)}>Add One</Button>
                        <Button type="primary" onClick={() => this.handleReduce(record.book_id)} danger >Reduce One</Button>
                    </div>
                ),
            },
        ];
        this.state = {
            data:[],
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            ready:true,
        };
    };

    handleGetCart = () =>
    {
        const callback = (data) =>{
            this.setState({data:data});
        };
        getCart({"customer":object.userID} , callback);
    };

    componentDidMount() {
        this.handleGetCart();
    }

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    handleAdd = key => {
        const callback = (data) =>{
            this.setState({data:data});
        };
        saveOneCart({"customer":object.userID,"book":key} , callback);
    };

    handleReduce = key => {
        const callback = (data) =>{
            this.setState({data:data});
        };
        reduceOneCart({"customer":object.userID,"book":key} , callback);
    };
    handlePurchase = () =>{
        console.log(this.state.selectedRowKeys.length);
        if(this.state.selectedRowKeys.length === 0){
            message.error("YOU MUST SELECT SOMETHING!");
            return;
        }
        for (let item in this.state.selectedRowKeys)
        {
            let index = this.state.selectedRowKeys[item];
            if(this.state.data[index].stocks < this.state.data[index].number){
                message.error("STOCK IS NOT ENOUGH !");
                return;
            }
        }
        const callback = (data) =>{
            console.log(data);
            this.handleGetCart();
            message.success("PURCHASE SUCCESS !");
        };
        for (let item in this.state.selectedRowKeys)
        {
            let index = this.state.selectedRowKeys[item];
            deleteOneCart({"customer":object.userID,"book":this.state.data[index].book_id} , callback);
        }
    };

    render() {
        const columns = this.columns;
        const { loading, selectedRowKeys, ready,data } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                        Reload
                    </Button>
                    <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                <Button type="primary" onClick={this.handlePurchase}>
                    Purchase
                </Button>
            </div>
        );
    }
}
