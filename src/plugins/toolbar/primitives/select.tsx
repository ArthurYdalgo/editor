import React from 'react'
import * as Select from '@radix-ui/react-select'
import DropDownIcon from '../icons/arrow_drop_down.svg'
import classNames from 'classnames'
import styles from '../styles.module.css'
import { TooltipWrap } from './TooltipWrap'
import { corePluginHooks } from '../../core/realmPlugin'

export const SelectItem = React.forwardRef<HTMLDivElement | null, { className?: string; children: React.ReactNode; value: string }>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item {...props} ref={forwardedRef} className={classNames(className, styles.selectItem)}>
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    )
  }
)

export const SelectTrigger: React.FC<{ title: string; placeholder: string; className?: string }> = ({ title, placeholder, className }) => {
  return (
    <TooltipWrap title={title}>
      <Select.Trigger aria-label={placeholder} className={classNames(styles.selectTrigger, className)}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon className={styles.selectDropdownArrow}>
          <DropDownIcon />
        </Select.Icon>
      </Select.Trigger>
    </TooltipWrap>
  )
}

export const SelectContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = styles.selectContainer
}) => {
  const [editorRootElementRef] = corePluginHooks.useEmitterValues('editorRootElementRef')

  return (
    <Select.Portal container={editorRootElementRef?.current}>
      <Select.Content className={className} onCloseAutoFocus={(e) => e.preventDefault()} position="popper">
        <Select.Viewport>{children}</Select.Viewport>
      </Select.Content>
    </Select.Portal>
  )
}

export const SelectButtonTrigger: React.FC<{ children: React.ReactNode; title: string; className?: string }> = ({
  children,
  title,
  className
}) => {
  return (
    <TooltipWrap title={title}>
      <Select.Trigger className={classNames(styles.toolbarButtonSelectTrigger, className)}>
        {children}
        <Select.Icon className={styles.selectDropdownArrow}>
          <DropDownIcon />
        </Select.Icon>
      </Select.Trigger>
    </TooltipWrap>
  )
}
