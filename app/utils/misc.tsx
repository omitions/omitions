import { Link, LinkProps } from "@remix-run/react"
import React from "react"

type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>
const AnchorOrLink = React.forwardRef<
  HTMLAnchorElement,
  AnchorProps & {
    reload?: boolean
    to?: LinkProps['to']
    prefetch?: LinkProps['prefetch']
  }
>(function AnchorOrLink(props, ref) {
  const {
    to,
    href,
    download,
    reload = false,
    prefetch,
    children,
    ...rest
  } = props
  let toUrl = ''
  let shouldUserRegularAnchor = reload || download

  if (!shouldUserRegularAnchor && typeof href === 'string') {
    shouldUserRegularAnchor = href.includes(':') || href.startsWith('#')
  }

  if (!shouldUserRegularAnchor && typeof to === 'string') {
    toUrl = to
    shouldUserRegularAnchor = to.includes(':')
  }

  if (!shouldUserRegularAnchor && typeof to === 'object') {
    toUrl = `${to.pathname ?? ''}${to.hash ? `#${to.hash}` : ''}${to.search ? `?${to.search}` : ''
      }`
    shouldUserRegularAnchor = to.pathname?.includes(':')
  }

  if (shouldUserRegularAnchor) {
    return (
      <a {...rest} download={download} href={href ?? toUrl} ref={ref}>
        {children}
      </a>
    )
  } else {
    return (
      <Link prefetch={prefetch} to={to ?? href ?? ''} {...rest} ref={ref}>
        {children}
      </Link>
    )
  }
})

function generateDash(text: string) {
  const str = text;

  return str.split(" ").join("-");
}

function regenerateDash(text: string) {
  const str = text;

  const withoutTheLast = () => str.split('-').slice(0, -1).join(' ');
  const getTheLast = () => str.split('-').pop();
  const defaultText = () => str.split("-").join(" ");

  return {
    defaultText,
    withoutTheLast,
    getTheLast
  }
}

export { AnchorOrLink, generateDash, regenerateDash }