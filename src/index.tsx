import classNames from 'classnames';
import { debounce } from 'lodash';
import React, { useEffect, useMemo, useRef } from 'react';
import './index.less';

export interface ScrollSnapAction {
  goTo: (index: number) => void;
}
export interface ScrollSnapProps {
  className?: string;
  style?: React.CSSProperties;
  onChange?: (current: number) => void;
  actionRef?: React.MutableRefObject<ScrollSnapAction | undefined>;
}

const IncScrollSnap: React.FC<ScrollSnapProps> = ({
  className,
  style,
  onChange,
  children,
  actionRef,
}) => {
  const currentRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchEndRef = useRef(true);
  const handleScroll = useMemo(
    () =>
      debounce((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        if (!touchEndRef.current) {
          return;
        }
        const container = e.target as HTMLDivElement;
        const index = (Array.from(container.childNodes) as Element[]).findIndex((el) => {
          const rect = el.getBoundingClientRect();
          return rect.x > 0;
        });

        if (currentRef.current !== index) {
          onChange?.(index);
        }
        currentRef.current = index;
      }, 100),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  useEffect(() => {
    if (actionRef) {
      actionRef.current = {
        goTo(index: number) {
          const node = containerRef.current!.childNodes.item(index) as Element | null;

          if (node) {
            const { x } = node.getBoundingClientRect();

            containerRef.current!.scrollTo({ left: x, behavior: 'smooth' });
          }
        },
      };
    }
  }, [actionRef]);

  return (
    <div
      className={classNames(['ep-scroll-snap', className])}
      style={style}
      onScroll={handleScroll}
      onTouchEnd={() => {
        touchEndRef.current = true;
      }}
      onTouchStart={() => {
        touchEndRef.current = false;
      }}
      ref={containerRef}
    >
      {children}
    </div>
  );
};

export default IncScrollSnap;
