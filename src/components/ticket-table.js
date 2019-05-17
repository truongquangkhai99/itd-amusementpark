import React, { Component } from 'react'
import '../App.css'
import {Icon, Table, Spin, Button} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
const loadingIcon = <Icon type="loading" style={{ fontSize: 48, marginLeft: '4px' }} spin />;
class PriceTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            ticketSource: []
        }

    
    }
    componentDidMount () {
        document.title = 'Giá vé'
        axios.get(`http://localhost:4000/ticket/prices`)
        .then(response => {
            console.log('kết quả là :', response.data)
            response.data.map(content => {
                if (content.childUsed === false) {
                    content.childGia = 'Không áp dụng';
                }
                if (content.adultUsed === false) {
                    content.adultGia = 'Không áp dụng';
                }
                content.adultGia = content.adultGia.toLocaleString('vi-vn')
                content.childGia = content.childGia.toLocaleString('vi-vn')
            })
            this.setState({
                ticketSource: response.data,
                isLoading: false
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    
    render() {
        const columns = [
            {
                title: 'Dịch vụ',
                dataIndex: 'tenVe',
                width: '40%',
            },
            {
                title: 'Giá vé (VNĐ)',
                children: [
                    {
                        title: 'Trẻ em',
                        dataIndex: 'childGia',
                        width: '20%'

                    },
                    {
                        title: 'Người lớn',
                        dataIndex: 'adultGia',
                        width: '20%'
                    }
                ]
            },
            {
                title: 'Ghi chú', 
            }
            
        ]
        return (
            <div style = {{margin: '30px', marginLeft: '60px', marginRight: '60px'}}>
               { this.state.isLoading ? <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <Spin
                    indicator = {loadingIcon}
                />
        </div> :
            <Table
            columns = {columns}
            dataSource = {this.state.ticketSource}
            bordered
            rowKey = 'idVe'
            pagination = {{pageSize: this.state.ticketSource.length}}
            title = {() => 'Bảng giá vé trò chơi & dịch vụ'}
            footer = {() => '*Vé đã mua không thể hoàn trả'}
            expandedRowRender = {record => <p style = {{margin: 0, fontWeight: 'bold', fontSize: '18px', color: 'red'}} >
                {record.motaVe}
                </p>}   
            /> }
             <div style = {{textAlign: 'right', marginTop: '40px'}}> 
                    <Button
                        type='primary'
                        size='large'
                    >
                        <Link to='/book' >Đặt vé ngay</Link>
                    </Button>
             </div>
            </div>
        )
    }
}

export default PriceTable