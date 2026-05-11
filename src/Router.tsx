import { useEffect, useState } from "react";

interface IRouterMap {
    [path:string]: React.ComponentType<any>
}

interface IRouter {
    routes: IRouterMap
}

const matchPath = (path: string, route: string) => {
    const pathParts = path.split('/')
    const routePaths = route.split('/')

    if(pathParts.length !== routePaths.length){
         return null;
    }

    const params:{[name:string]:string} = {};

    for(let i=0; i < routePaths.length; i++) {
        if(routePaths[i].startsWith(':id')) {
            const paramName = routePaths[i].slice(1);
            params[paramName] = pathParts[i]
        } else if (routePaths[i] !== pathParts[i] ) {
            return null
        }
    }

    return params
}

export const useRouter = (): string => {
    const [path, setPath] = useState(location.pathname)

    useEffect(() => {
        const onLocationChange = () => {
            setPath(location.pathname) 
        } 

        window.addEventListener('popstate', onLocationChange)

        return () => {
            window.removeEventListener('popstate', onLocationChange)
        }
    }, [])

    return path
}

const Router = ({routes}: IRouter) => {
    const path = useRouter();

    for(const route in routes) {
        const params = matchPath(path, route)

        if(params) {
            const Page = routes[route];
            return <Page params={params} />
        }
    }

    const NotFound = routes['*'];

    return <NotFound />
}

export default Router;