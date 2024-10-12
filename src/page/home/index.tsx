import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { useAtomValue } from "jotai";
import layoutStore from "@/layouts/store";

export default function Home() {
  const systemName = useAtomValue(layoutStore.systemName)

  return <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
  <Result
    icon={<SmileOutlined />}
    title={`欢迎来到${systemName}`}
    subTitle={(
      <div>
        <div>我们致力于为您提供高效、便捷的管理工具，帮助您更好地管理工作流程与业务运营。</div>
        <div>如果您有任何问题或需要帮助，请随时联系客户服务团队。祝您使用愉快~</div>
      </div>
    )}
  />
</div>;
};