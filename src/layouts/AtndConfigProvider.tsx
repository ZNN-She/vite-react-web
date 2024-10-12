/**
 * antd 全局配置
 */
import { ReactElement } from 'react'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN';

export default function AtndConfigProvider(props: {children: ReactElement}): JSX.Element {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          "colorPrimary": "#13c2c2",
          "colorInfo": "#13c2c2",
          "borderRadius": 0,
          "wireframe": false,
        },
        algorithm: [theme.compactAlgorithm],
        components: {
          Layout: {
            headerBg: '#13c2c2',
            headerPadding: '0',
            headerHeight: 40,
            // bodyBg: 'rgba(255, 255, 255, .2)',
            bodyBg: '#f5f5f5',
            footerPadding: '12px 50px',
            triggerBg: '#FFF',
            triggerColor: '#222',
            triggerHeight: 40,
          },
          Menu: {
            darkItemBg: '#13c2c2',
            darkPopupBg: '#13c2c2'
          }
        },
      }}
    >
      {props.children}
    </ConfigProvider>
  )
}