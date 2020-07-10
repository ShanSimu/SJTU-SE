import {Table,DatePicker,Input } from 'antd';
import React from 'react';
import {getOrder} from "../services/bookService";
import object from "../utils/constant";

const { Search } = Input;

const { RangePicker } = DatePicker;

export class Order extends React.Component{
    constructor(props) {
        super(props);
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
                title: 'ISBN',
                dataIndex: 'isbn',
                key: 'isbn',
            },
            {
                title:"Number",
                dataIndex:"number",
                key:"number",
            },
            {
                title:"Price",
                dataIndex:"price",
                key:"price",
            },
            {
                title:"Date",
                dataIndex:"date",
                key:"date",
                render: text => {
                    let normal = text.substr(0,10);
                    return <text>{normal}</text>
                }

            },
        ];
        this.state = {
            selectedTime:null,
            formedSelectedTime:[],
            tmpData:[],
            data:[],
            searchData:null,
            searching:false,
        };
    }

    componentDidMount() {
        const callback = (data) =>{
            this.setState({data:data,searchData:data});
        };
        getOrder({"customer":object.userID} , callback);
    }

    onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);//可用的时间
        console.log(dateString[0]);
        console.log("123");
        if(value != null){
            let start = parseInt(dateString[0].substr(0,10).replace(/-/g,""));
            let end = parseInt(dateString[1].substr(0,10).replace(/-/g,""));
            let tmpData = this.state.data.filter(function (row) {
                    let tmp = parseInt(row.date.substr(0,10).replace(/-/g,""));
                    return (tmp>=start && tmp<=end);
                });
            this.setState({searchData:tmpData});
        }
        else{
            this.setState({searchData:this.state.data});
        }
    };

    onOk = (value) => {
        console.log('onOk: ', value);
    };

    search = (value) =>{
        let needle = value.toLowerCase();
        if(!needle){
            this.setState({searchData:this.state.data});
            return;
        }

        let tmpData = this.state.data.filter(function (row) {
            return (row.title.toString().toLowerCase().indexOf(needle) > -1);
        });
        this.setState({searchData:tmpData});
    };

    render() {
        const { data,searchData } = this.state;
        const columns = this.columns;
        return (
            <div>
                <Search
                    placeholder="input search text"
                    onSearch={value => this.search(value)}
                    style={{ width: 200 }}
                />
                <RangePicker
                    // showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD"
                    onChange={this.onChange}
                    onOk={this.onOk}
                />
                <Table columns={columns} dataSource={searchData} />
            </div>
        );
    }
}
