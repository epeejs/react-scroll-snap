# react-scroll-snap

一个基于 React 的滚动快照组件

## DEMO

[![Edit react-scroll-snap](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-scroll-snap-2qd0x?fontsize=14&hidenavigation=1&theme=dark)

## 安装

```sh
yarn add @epeejs/react-scroll-snap
```

## 用法

```tsx
import ScrollSnap, { ScrollSnapAction } from '@epeejs/react-scroll-snap';
import React, { useEffect, useRef } from 'react';

const App = () => {
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

## API

| 属性      | 说明             | 类型                     | 默认值 | 版本 |
| :-------- | :--------------- | :----------------------- | :----- | :--- |
| onChange  | 切换面板后的回调 | function(current:number) |
| actionRef | 操作函数         | `ScrollSnapAction`       |

## 方法

### ScrollSnapAction

| 名称        | 描述           |
| :---------- | :------------- |
| goTo(index) | 切换到指定面板 |
