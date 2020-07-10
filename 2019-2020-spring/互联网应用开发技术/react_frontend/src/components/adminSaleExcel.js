import {Table,DatePicker,Input } from 'antd';
import React from 'react';
import {getSaleExcel} from "../services/bookService";
import object from "../utils/constant";

const { Search } = Input;

const { RangePicker } = DatePicker;

export class AdminSaleExcel extends React.Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
                sorter: (a, b) => a.number - b.number,
            },
            {
                title: 'money',
                dataIndex: 'money',
                defaultSortOrder: 'money',
                sorter: (a, b) => a.money - b.money,
            },
        ];
        this.state = {
            money:0,
            number:0,
            selectedTime:null,
            formedSelectedTime:[],
            data:[],
        };
    }

    flushExcel =(start,end) =>{
        const callback = (data) =>{
            this.setState({data:data});
        };
        getSaleExcel({"start":start,"end":end},callback)
    };
    componentDidMount() {
        this.flushExcel(0,100000000);
    }

    onChange = (value, dateString) => {
        if(value != null){
            let start = parseInt(dateString[0].substr(0,10).replace(/-/g,""));
            let end = parseInt(dateString[1].substr(0,10).replace(/-/g,""));
            // let tmpData = this.state.data.filter(function (row) {
            //     let tmp = parseInt(row.date.substr(0,10).replace(/-/g,""));
            //     return (tmp>=start && tmp<=end);
            // });
            // this.setState({searchData:tmpData});
            this.flushExcel(start,end);
        }
        else{
            // this.setState({searchData:this.state.data});
            this.flushExcel(0,100000000);
        }
    };

    onOk = (value) => {
        console.log('onOk: ', value);
    };

    render() {
        const { data} = this.state;
        const columns = this.columns;
        return (
            <div>

                <RangePicker
                    format="YYYY-MM-DD"
                    onChange={this.onChange}
                    onOk={this.onOk}
                />
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}
