import { cx } from 'cva'
import { CopyButton, ShellLineCopyButtons, WrapButton } from './CodeBlock.client.js'
import { CollapseHandler } from './Collapse.client.js'
import { FoldHandler } from './Fold.client.js'

export function CodeBlock(props: CodeBlock.Props) {
  const {
    className,
    container = true,
    'data-v-lang': _lang,
    'data-v-shell': isShell,
    'data-v-show-wrap': showWrap,
    'data-title': title,
  } = props
  if (!container) return <pre {...props} data-v />
  return (
    <div data-v-code-container>
      {title && (
        <div data-v-code-header>
          <span data-v-code-title data-title={title}>
            {title}
          </span>
        </div>
      )}
      <div className="vocs:relative vocs:group/code vocs:max-md:-mx-4" data-v-code-body>
        <pre
          {...props}
          className={cx(
            className,
            'vocs:relative vocs:max-md:mx-0',
            title ? ' vocs:rounded-t-none vocs:border-t-0' : '',
          )}
          data-v-wrapped={showWrap !== undefined ? '' : undefined}
          data-v
        >
          {props.children}
          {isShell !== undefined && <ShellLineCopyButtons />}
          <CollapseHandler />
          <FoldHandler />
        </pre>
        {showWrap !== undefined && <WrapButton defaultWrapped />}
        <CopyButton />
      </div>
    </div>
  )
}

export namespace CodeBlock {
  export type Props = React.PropsWithChildren<React.ComponentProps<'pre'>> & {
    container?: boolean | undefined
    'data-v-lang'?: string | undefined
    'data-v-shell'?: '' | undefined
    'data-v-show-wrap'?: '' | undefined
    'data-title'?: string | undefined
  }
}
