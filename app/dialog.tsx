'use client'

import styles from '@/app/dialog.module.css'
import * as RadixDialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { ReactNode, useState } from 'react'

export default function Dialog({
  children,
  trigger,
  title,
  description,
  headerText,
}: {
  children: ReactNode
  trigger: ReactNode
  title: string
  description: string
  headerText?: string
}) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger asChild={true}>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.dialogOverlay} />
        <RadixDialog.Content
          className={styles.dialogContent}
          aria-describedby={undefined}
        >
          <VisuallyHidden.Root asChild={true}>
            <RadixDialog.Title>{title}</RadixDialog.Title>
          </VisuallyHidden.Root>
          <VisuallyHidden.Root asChild={true}>
            <RadixDialog.Description>{description}</RadixDialog.Description>
          </VisuallyHidden.Root>
          <div className={styles.dialogHeader}>
            <RadixDialog.Close>
              <button type='button' className={styles.dialogCloseButton}>
                <svg
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                  className={styles.dialogCloseButtonSvg}
                >
                  <g>
                    <path d='M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z'></path>
                  </g>
                </svg>
              </button>
            </RadixDialog.Close>
            {headerText && (
              <span className={styles.dialogHeaderText}>{headerText}</span>
            )}
          </div>
          <div className={styles.dialogMain}>{children}</div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
