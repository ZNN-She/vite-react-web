import AtndConfigProvider from "@/layouts/AtndConfigProvider";
import login from "@/utils/login";
import { Modal, Form, Input, ModalProps } from "antd";
import { createRoot } from 'react-dom/client';

export default function ModifyPasswordModal({
  onOk,
  ...lastProps
}: ModalProps) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // TODO: 修改密码
    console.log(values);
    onOk?.(values);
    login.logout();
  };

  return (
    <Modal
      {...lastProps}
      title="修改密码"
      onOk={() => {
        form.submit();
      }}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="旧密码"
          name="oldPassword"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder='请输入密码' />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPassword"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder='请输入密码' />
        </Form.Item>
        <Form.Item
          label="确认新密码"
          name="affirmNewPassword"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder='请输入密码' />
        </Form.Item>
      </Form>
    </Modal>
  )
};


function openModifyPasswordModal() {
  let ele = document.getElementById('openModifyPasswordModal');
  if (!ele) {
    ele = document.createElement('div');
    ele.id = 'openModifyPasswordModal';
    document.body.appendChild(ele);
  }
  const root = createRoot(ele);
  root.render(
    <AtndConfigProvider>
      <ModifyPasswordModal
        open={true}
        onOk={() => {
          root.unmount()
        }}
        onCancel={() => {
          root.unmount()
        }}
      />
    </AtndConfigProvider>
  );
};

export {
  openModifyPasswordModal
};
