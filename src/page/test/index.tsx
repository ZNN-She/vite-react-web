import React, { useEffect, useRef } from 'react';
import TableRender from 'table-render';
import ProTable from '@/component/proTable'
import { Button } from 'antd';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';

const dataSource = [];
for (let i = 0; i < 6; i++) {
  dataSource.push({
    id: i.toString(),
    title: `标题${i + 1}`,
    created_at: new Date().getTime(),
  });
}

const schema = {
  type: 'object',
  labelWidth: 70,
  properties: {
    title: {
      title: '标题',
      type: 'string'
    },
    1: {
      title: '标题',
      type: 'string'
    },
    2: {
      title: '标题',
      type: 'string'
    },
    3: {
      title: '标题',
      type: 'string'
    },
    4: {
      title: '标题',
      type: 'string'
    },
    5: {
      title: '标题',
      type: 'string'
    },
    65: {
      title: '标题',
      type: 'string'
    },
    8: {
      title: '标题',
      type: 'string'
    },
    9: {
      title: '标题',
      type: 'string'
    },
    0: {
      title: '标题',
      type: 'string'
    },
    created_at: {
      title: '创建时间',
      type: 'string',
      format: 'date'
    },
  }
};

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'date',
  },
  {
    title: '操作',
    render: (row, record) => <a onClick={() => alert(row.title)}>编辑</a>,
  }
];

const Demo = () => {

  const tableRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      console.log(tableRef.current);
    }, 300)
  }, [])

  const api = () => {
    return {
      data: dataSource,
      total: dataSource.length
    };
  };

  return (
    <ProTable
      ref={tableRef}
      className='xxxx'
      search={{ schema }}
      request={api}
      columns={columns}
      // request={[
      //   { name: '我的', api: api },
      //   { name: '全部', api: api }
      // ]}
      // title='复杂表格'
      // toolbarAction
      // toolbarRender={
      //   <>
      //     <Button>查看日志</Button>
      //     <Button>导出数据</Button>
      //     <Button type='primary'>
      //       <PlusOutlined />
      //       新增
      //     </Button>
      //   </>
      // }
    />
  );
}

export default Demo;