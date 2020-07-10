import React, { useContext, useState, useEffect, useRef } from 'react';
import {Table, Input, Button, Popconfirm, Form, InputNumber, message,Drawer} from 'antd';
import "../css/bookstore.css"
import {getBooks,editBook,deleteBook,editBookIcon} from "../services/bookService";
// import {emptyImage} from "../utils/constant";

const { Search } = Input;

// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//         this.setState({selectedRowKey : selectedRowKeys});
//         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//         console.log(this.state.selectedRowKey);
//     },
//     getCheckboxProps: record => ({
//         disabled: record.name === 'Disabled User', // Column configuration not to be checked
//         name: record.name,
//     }),
// };

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async e => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

export class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'title',
                dataIndex: 'title',
                width: '30%',
                 editable: true,
            },
            {
                title: 'author',
                dataIndex: 'author',
                editable:true,
            },
            {
                title: 'isbn',
                dataIndex: 'isbn',
                editable:true,
            },
            {
                title: 'price',
                dataIndex: 'price',
                editable:true,
            },
            {
                title: 'stocks',
                dataIndex: 'stocks',
                editable:true,
            },
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <div>
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                <a style={{ marginRight: 16 }}>Delete</a>
                            </Popconfirm>
                            <Popconfirm title="Show image ?" onConfirm={() => this.handleIcon(record)}>
                                <a style={{ marginRight: 16 }}>Image</a>
                            </Popconfirm>
                        </div>
                    ) : null,
            },
        ];
        this.state = {
            selectedRowKeys:[],
            dataSource: [],
            searchData:null,
            searching:false,
            count: 0,
            fileIndex:1,
            icon:"",
            iconBase64:"",
            visible:false,
            details:"",
        };
    }

    // rowSelection = {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //         this.setState({selectedRowKey : selectedRowKeys});
    //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //         console.log(this.state.selectedRowKey);
    //     },
    // };

    handleIcon = record => {
        if(record.icon!= null)
        {
            console.log("not empty");
            this.setState({
            iconBase64:record.icon.iconBase64,//.icon.iconBase64,
            visible:true,
        });
        }
        else {
            console.log("empty");
            this.setState({
                iconBase64:"data:image/jpeg;base64,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",//.icon.iconBase64,
                visible:true,
            });
        }

    };

    onClose = () => {
        this.setState({
            visible:false,
        })
    };

    handleGetBook = () =>{
        console.log("ohhh");
        const callback = (data) =>{
            console.log(data);
            let max = 0;
            for (let item in data)
            {
                if(data[item].key > max){
                    max = data[item].key;
                }
            }
            this.setState({
                dataSource:data,
                count:max+1,
            });
        };
        getBooks({"search":null} , callback);
    };

    componentDidMount() {
        this.handleGetBook();
    };

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key),
        });
        console.log(key);
        const callback = data =>{
            console.log(data);
        };
        deleteBook({"book":key},callback);
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            title: `Book ${count}`,
            author: `Author ${count}`,
            isbn: count,
            price: 6.66,
            stocks: count,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
        console.log(newData);
        const callback = data =>{
            console.log(data);
        };
        editBook(newData,callback);
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        console.log(newData);
        const index = newData.findIndex(item => row.key === item.key);//key值
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
        const callback = data =>{
            console.log(data);
        };
        editBook(row,callback);
    };

    search = (value) =>{
        let needle = value.toLowerCase();
        if(!needle){
            this.setState({searchData:this.dataSource,searching:false});
            return;
        }

        let tmpData = this.state.dataSource.filter(function (row) {
            return (row.title.toString().toLowerCase().indexOf(needle) > -1);
        });
        this.setState({searchData:tmpData,searching:true});
    };

    previewFile = () => {
        let preview = document.querySelector('img');
        let file    = document.querySelector('input[type=file]').files[0];
        let reader  = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    handleTest = () => {
        const callback = (data) =>{
            this.handleGetBook();
            console.log(data);
        };
        let image = document.getElementById("test").src;
        let index = this.state.selectedRowKeys[0];
        console.log(document.getElementById("test").src);
        console.log(this.state.selectedRowKeys);

        editBookIcon({"id":index,"icon":image},callback)
    };

    render() {

        const { searching,dataSource,searchData } = this.state;
        // const rowSelection = {
        //     selectedRowKeys,
        //     onChange: this.onSelectChange,
        // };
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys);
                this.setState({
                    selectedRowKeys:selectedRowKeys
                });
                console.log(this.state.selectedRowKeys)
            }
        };
        return (
            <div>
                <Search
                    placeholder="input search text"
                    onSearch={value => this.search(value)}
                    style={{ width: 200 }}
                />
                <Button
                    onClick={this.handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Add a row
                </Button>
                <Table
                    // rowSelection={{
                    //     type: "radio",
                    //     ...rowSelection,
                    // }}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={searching?searchData:dataSource}
                    columns={columns}
                    rowSelection={rowSelection}
                />
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
                <input type="file" onChange={this.previewFile}/>
                    <br/>
                    <img id="test"src="" height="200" alt="Image preview..."/>
                <Button
                    onClick={this.handleTest}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Modify a picture
                </Button>
            </div>
        );
    }
}

