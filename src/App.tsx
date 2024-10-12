import React, { useState, lazy, useEffect, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Spin } from 'antd';
import LayoutPage from './layouts';
import layoutStore from '@/layouts/store'
import { useAtomValue } from 'jotai';
import Home from './page/home';

// 懒加载
function loadModule(p: () => Promise<any>) {
  return lazy(() => {
    return p()
  });
}

/**
   * 自动根据用户信息注册路由
   * 路由规则为./page下所有的页面会自动注册
   *
   */
function getRoutersConfig(): Array<{ path: string; comp: ReturnType<typeof loadModule> }> {

  const pages = import.meta.glob('./page/**/index.tsx');
  const filters: Array<{ path: string; comp: ReturnType<typeof loadModule> }> = [];
  for (const path in pages) {
    const realPath = path
      .replace(/^.\/page\//, '')
      .replace(/\/index\.tsx$/, '');
    const realPathLastPath = realPath.split('/').pop();
    // 文件首字母大写则认为是组件，否则认为是页面
    if (realPathLastPath && realPathLastPath[0].toLowerCase() === realPathLastPath[0]) {
      filters.push({
        path: realPath,
        comp: loadModule(pages[path])
      });
    }
  }
  return filters;
}

function App() {
  const [pages, setPages] = useState<{ path: string; comp: ReturnType<typeof loadModule> }[]>([])
  const systemName = useAtomValue(layoutStore.systemName)

  useEffect(() => {
    const newPages = getRoutersConfig();
    console.log(newPages);
    setPages(newPages)

  }, []);

  return (
    <Routes>
      <Route path={'/*'} element={<LayoutPage></LayoutPage>}>
        {pages.map((item: any) => {
          return (
            <Route key={item.path} path={item.path} element={<Suspense fallback={(
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Spin size="large" />
              </div>
            )}><item.comp></item.comp></Suspense>} />
          )
        })}
        <Route path='*' element={<Home></Home>} />
      </Route>
    </Routes>
  )
}

export default App
