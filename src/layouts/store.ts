/**
 * layout store
 */
import { atom } from "jotai";
import { homeMenu, MenuItem } from "./nav";

/**
 * tabs导航菜单
 */
const tabMenus = atom<MenuItem[]>([homeMenu]);

const activeMenu = atom<MenuItem>(homeMenu);

const menuOpenKeys = atom<string[]>([]);

/**
 * 用户信息
 */
const useInfo = atom();

/**
 * 系统名称
 */
const systemName = atom("应用名称-v1.0");

/**
 * layoutStore
 */
const layoutStore = { tabMenus, activeMenu, menuOpenKeys, useInfo, systemName };
export default layoutStore;