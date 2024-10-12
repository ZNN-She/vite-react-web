import { debounce } from 'lodash';
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import TableRender, { TableRenderProps } from 'table-render';
import styles from './index.module.less';

interface ProTableProps extends TableRenderProps {
  /**
   * 表格高度自定义差值
   */
  diffHeightFn?: (containerRef: Element) => number
}

const diffHeight = 50;

const ProTable = forwardRef(({
  diffHeightFn = () => diffHeight,
  ...lastProps
}: ProTableProps, ref) => {
  const containerRef = useRef(null);
  const resizeObserverRef = useRef<ResizeObserver>();
  const tableRenderRef = useRef(null);
  const [scrollY, setScrollY] = useState<number>();


  const propsResult = {
    ...lastProps,
    search: lastProps.search ? {
      ...lastProps.search,
      collapsed: true
    } : lastProps.search,
    scroll: lastProps.scroll ? lastProps.scroll : {
      x: 850,
      y: scrollY,
    },
  }

  useImperativeHandle(ref, () => tableRenderRef.current);

  useEffect(() => {
    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        debounceHeightChange()
      });
    }
    resizeObserver();
    return () => {
      // console.log('销毁');
      resizeObserverRef.current?.disconnect();
    };
  }, [])

  function resizeObserver() {
    if (containerRef.current && resizeObserverRef.current) {
      // console.log('观察', containerRef.current);
      resizeObserverRef.current.observe(containerRef.current);
    }
  }

  function heightChange() {
    // console.log('切换tab');
    if (containerRef.current) {
      const ele = (containerRef.current as Element).getElementsByClassName('ant-table-wrapper')[0]
      if (ele) {
        const boundingClientRect = ele.getBoundingClientRect();
        const bodyHeight = document.body.clientHeight;
        console.log('高度', bodyHeight, boundingClientRect.top);
        setScrollY(bodyHeight - boundingClientRect.top - diffHeight - diffHeightFn(containerRef.current));
      }
    }
  }

  const debounceHeightChange = debounce(heightChange, 300);


  return (
    <div ref={containerRef} className={styles.proTable}>
      <TableRender
        ref={tableRenderRef}
        {...propsResult}
      />
    </div>
  );
});

export default ProTable;