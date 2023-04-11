import React from 'react'
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps
} from 'react-beautiful-dnd'

type DropProps = Omit<DroppableProps, 'children'> & {
  children: React.ReactNode
}

export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          // 为children添加额外的属性
          // 等价于 <Children {...provided.droppableProps} ref={provided.innerRef} provided={provided} />
          const childProps = {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided
          }
          return React.cloneElement(children, childProps)
        }
        return <div />
      }}
    </Droppable>
  )
}

type DropChildProps = Partial<
  {
    provided: DroppableProvided
  } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>

// 用户自定义组件传入ref
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  )
})
DropChild.displayName = 'DropChild'

type DragProps = Omit<DraggableProps, 'children'> & {
  children: React.ReactNode
}
export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          const childProps = {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef
          }
          return React.cloneElement(children, childProps)
        }
        return <div />
      }}
    </Draggable>
  )
}
