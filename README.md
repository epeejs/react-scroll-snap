# react-scroll-snap

一个基于 React 的滚动快照组件

## 安装

```sh
yarn add @epeejs/react-scroll-snap
```

## 用法

```tsx
import type { ScrollSnapAction } from '@epeejs/react-scroll-snap';
import { ScrollSnap } from '@epeejs/react-scroll-snap';
import { useEffect, useRef } from 'react';

const Demo = () => {
  const actionRef = useRef<ScrollSnapAction>();
  const colors = ['#E6F7FF', '#BAE7FF', '#91D5FF', '#69C0FF'];

  useEffect(() => {
    if (actionRef.current) {
      // 初始化时滑动到第三个元素
      actionRef.current.goTo(2);
    }
  }, []);

  return (
    <ScrollSnap
      actionRef={actionRef}
      onChange={(current) => {
        console.log(current);
      }}
    >
      {colors.map((m) => (
        <div
          style={{
            background: m,
            width: '80%',
            borderRadius: 16,
            height: 300,
            flexShrink: 0,
            // 设置停留时元素居中
            scrollSnapAlign: 'center',
          }}
        >
          {m}
        </div>
      ))}
    </ScrollSnap>
  );
};
```
