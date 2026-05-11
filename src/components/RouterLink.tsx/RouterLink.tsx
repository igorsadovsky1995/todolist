import type { ReactNode } from "react"

interface IRouterLink {
    to: string,
    children: ReactNode
}

export const RouterLink = (props: IRouterLink) => {
    const {
        to,
        children,
        ...rest
    } = props

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()

        window.history.pushState({}, '', to);
        window.dispatchEvent(new PopStateEvent('popstate'))
    }

    return (
        <a 
            href={to}
            onClick={handleClick}
            {...rest}
        >
            {children}
        </a>
    )
}