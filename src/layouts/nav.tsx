/**
 * @description 菜单配置
 */
import { BankOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number] & {
  paretKey?: string | string[];
  route?: string;
  /**
   * 是否是菜单 ture 才会在菜单中展示
   */
  isMenu: boolean;
  children?: MenuItem[] | undefined;
};

export function getItem(key?: string, items = navConfig): MenuItem {
  if (!key) return homeMenu;

  // 定义一个辅助递归函数
  function searchItem(items: MenuItem[], key: string): MenuItem {
    for (const item of items) {
      if (item.key === key) {
        return item; // 如果找到匹配的项，直接返回
      } else if (item.children && item.children.length > 0) {
        // 否则，递归地在子菜单中查找
        const foundChild = searchItem(item.children, key);
        if (foundChild.key === key) {
          return foundChild; // 如果在子菜单中找到，返回该项
        }
      }
    }
    return homeMenu; // 如果当前层级未找到，返回 homeMenu（这个返回值可能会在递归中被覆盖）
  }

  // 调用辅助递归函数并返回结果
  return searchItem(items, key);
}

/**
 * 多个key可以对应同一个route，这里用key作为唯一标识。
 * 不过在刷新的时候因为需要用路由反查，这时候会使用第一个查到的数据
 * @param route 
 * @returns 
 */

export function getItemByRoute(route?: string): MenuItem {
  function findItemRecursively(items: MenuItem[], route: string | undefined): MenuItem | undefined {
    if (!route) return homeMenu;

    for (const item of items) {
      if (item.children && item.children.length > 0) {
        // 递归地在子菜单项中查找
        const foundInChildren = findItemRecursively(item.children, route);
        if (foundInChildren) {
          return foundInChildren; // 如果在子菜单项中找到，返回找到的菜单项
        }
      }
      if (item.route === route) {
        return item; // 如果找到匹配的路由，返回当前菜单项
      }
    }

    return undefined; // 如果没有找到，返回 undefined
  }

  // 调用递归辅助函数
  return findItemRecursively(navConfig, route) || homeMenu;
}


/**
 * 获取菜单 排除isMenu为false的菜单
 */
function getMenu(items: MenuItem[] = navConfig): MenuItem[] {
  return items.reduce((acc, item) => {
    if (item.isMenu) {
      const children = item.children ? getMenu(item.children).filter(child => child.isMenu) : undefined;
      const menuItem = children && children.length > 0 ? { ...item, children } : { ...item, children: undefined };
      acc.push(menuItem);
    }
    return acc;
  }, [] as MenuItem[]).map(item => ({ ...item, children: item.children ?? undefined })); // 移除children为空数组的属性
}



export const homeMenu = {
  label: "",
  icon: <BankOutlined />,
  key: "home",
  route: 'home',
  closable: false,
  isMenu: false,
};

/**
 * 多个key可以对应同一个route，这里用key作为唯一标识。
 * 不过在刷新的时候因为需要用路由反查，这时候会使用第一个查到的数据
 */
export const navConfig: MenuItem[] = [
  {
    label: '商品管理',
    key: 'page1',
    route: undefined,
    isMenu: true,
    children: [
      {
        label: '商品列表',
        paretKey: 'page1',
        key: 'page1_index',
        route: 'page1',
        isMenu: true,
        children: [
          {
            label: '商品列表',
            paretKey: ['page1', 'page1_index'],
            key: 'page1_index_sub',
            route: 'page1',
            isMenu: true,
          },
        ],
      },
    ],
  },
  {
    label: '订单管理',
    key: 'page2',
    route: undefined,
    isMenu: true,
    children: [
      {
        label: '订单列表',
        paretKey: 'page2',
        key: 'page2_index',
        route: 'page2',
        isMenu: true,
      }
    ],
  },

  {
    label: '运营管理',
    key: 'test',
    route: undefined,
    isMenu: true,
    children: [
      {
        label: '直播间配置',
        key: 'test_index',
        isMenu: true,
        paretKey: 'test',
        route: 'test',
      },
    ],
  },
  {
    label: '个人中心',
    key: 'user-center',
    route: 'user-center',
    isMenu: false,
  },
];

/**
 * 菜单数据
 */
export const menuData = getMenu();