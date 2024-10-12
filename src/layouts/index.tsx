/**
 * 页面整体布局 - 左侧菜单栏 + 顶部导航栏 + 右侧内容区域
 */
import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Layout, Menu, message, Tabs, TabsProps } from 'antd';
import { getItem, getItemByRoute, MenuItem, menuData } from '@/layouts/nav';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import layoutStore from './store';
import styles from './index.module.less';
import { useAtom, useAtomValue } from 'jotai';
import { LeftOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { uniqBy } from 'lodash'
import login from '@/utils/login';
import { openModifyPasswordModal } from '@/component/modifyPassword';

const { Header, Sider } = Layout;

const BasicLayout: React.FC = () => {
  const systemName = useAtomValue(layoutStore.systemName);
  const [tabMenus, setTabMenus] = useAtom(layoutStore.tabMenus);
  const [activeMenu, setActiveMenu] = useAtom(layoutStore.activeMenu);
  const [menuOpenKeys, setMenuOpenKeys] = useAtom(layoutStore.menuOpenKeys);
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    console.log(location)
    const activeItem = getItemByRoute(location.pathname.substring(1));
    delete activeItem.children;
    setTabMenus(uniqBy([...tabMenus, activeItem], 'key'));
    setMenuOpenKeys(typeof activeItem?.paretKey === 'string' ? [activeItem?.paretKey as string] : activeItem?.paretKey as string[]);
    setActiveMenu(activeItem);
  }, [])


  function onMenuSelect(e: MenuItem) {
    console.log(e);
    console.log(getItem(e.key as string));
    const activeItem = getItem(e.key as string);
    console.log(activeItem);
    navigate(activeItem?.route as string);
    delete activeItem.children;
    setTabMenus(uniqBy([...tabMenus, activeItem], 'key'));
    setMenuOpenKeys(typeof activeItem?.paretKey === 'string' ? [activeItem?.paretKey as string] : activeItem?.paretKey as string[]);
    setActiveMenu(activeItem);
  }

  function onTabsEdit(key: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') {
    if (action === 'remove') {
      const newTabMenus = tabMenus.filter((item) => item.key !== key);
      setTabMenus(newTabMenus);
      setActiveMenu(newTabMenus[0]);
    }
  }

  function onClickMyCenter() {
    navigate('user-center')
    const activeItem = getItem('user-center');
    console.log(activeItem);
    navigate(activeItem?.route as string);
    delete activeItem.children;
    setTabMenus(uniqBy([...tabMenus, activeItem], 'key'));
    setMenuOpenKeys(typeof activeItem?.paretKey === 'string' ? [activeItem?.paretKey as string] : activeItem?.paretKey as string[]);
    setActiveMenu(activeItem);
  }

  function onClickModifyPassword() {
    message.success('修改密码');
    openModifyPasswordModal();
  }

  function onClickLogout() {
    login.logout();
  }

  return (
    <Layout className={styles.basicLayout}>
      <Header className={styles.header} style={{ display: 'flex', alignItems: 'center' }}>
        <div className={styles.logo}>{systemName}</div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeMenu?.key as string]}
          items={menuData}
          style={{ flex: 1, minWidth: 0 }}
          onSelect={onMenuSelect}
        />
        <div className={styles.action}>
          <Dropdown
            menu={{
              items: [
                { label: (<span onClick={onClickMyCenter}>个人中心</span>), key: '1' },
                { label: (<span onClick={onClickModifyPassword}>修改密码</span>), key: '2' },
                { label: (<span onClick={onClickLogout}>退出登录</span>), key: '3' },
              ]
            }}
          >
            <Avatar size={24} icon={<UserOutlined />} />
          </Dropdown>

        </div>
      </Header>
      <Layout>
        <Sider
          width={150}
          breakpoint="lg"
          collapsible
          collapsedWidth={40}
          collapsed={collapsed}
          trigger={null}
          onCollapse={(c) => setCollapsed(c)}
        >
          <div
            className={styles.siderTrigger}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </div>
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            openKeys={menuOpenKeys}
            selectedKeys={[activeMenu?.key as string]}
            items={menuData}
            onSelect={onMenuSelect}
            onOpenChange={(keys) => setMenuOpenKeys(keys)}
          />
        </Sider>
        <Layout style={{ margin: '0 8px 8px' }}>
          <div>
            <Tabs
              hideAdd
              onChange={(k) => onMenuSelect({ key: k })}
              activeKey={activeMenu?.key as string}
              size='small'
              tabBarStyle={{ background: '#FFF' }}
              type="editable-card"
              onEdit={onTabsEdit}
              items={tabMenus as Required<TabsProps>['items']}
            />
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <Outlet></Outlet>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

function LayoutPage() {
  const location = useLocation();
  if(location.pathname === '/login' || location.pathname === '/user/register') {
    return <Outlet></Outlet>;
  }

  return <BasicLayout />;
}

export default LayoutPage;