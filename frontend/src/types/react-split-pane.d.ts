import React from "react";
import "react-split-pane";

export interface SplitPaneProps {
  split?: "vertical" | "horizontal";
  minSize?: number | string;
  maxSize?: number | string;
  defaultSize?: number | string;
  size?: number | string;
  allowResize?: boolean;
  primary?: "first" | "second";
  step?: number;
  className?: string;
  paneClassName?: string;
  pane1ClassName?: string;
  pane2ClassName?: string;
  paneStyle?: React.CSSProperties;
  pane1Style?: React.CSSProperties;
  pane2Style?: React.CSSProperties;
  resizerStyle?: React.CSSProperties;
  resizerClassName?: string;
  onChange?: (newSize: number) => void;
  onDragStarted?: () => void;
  onDragFinished?: (newSize: number) => void;
  children?: React.ReactNode;
}

declare module "react-split-pane" {
  export default class SplitPane extends React.Component<
    SplitPaneProps,
    Record<string, unknown>
  > {}
}
