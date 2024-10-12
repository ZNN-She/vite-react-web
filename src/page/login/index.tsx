import { Button, Checkbox, Form, Input } from 'antd';
import { } from '@ant-design/icons'
import login from '@/utils/login';
import './index.less';
import { useAtomValue } from 'jotai';
import layoutStore from '@/layouts/store';

export default function LoginPage () {
  const systemName = useAtomValue(layoutStore.systemName)

  const onFinish = (values: any) => {
    login.login(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    username?: string;
    pwd?: string;
    remember?: string;
  };
  
  return (
    <div className="body">
      <div className='center'>
        <p className='p-title'>欢迎使用{systemName}</p>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ marginTop: 30, maxWidth: 400 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder='请输入手机号/用户名' />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码  "
            name="pwd"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder='请输入密码' />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};