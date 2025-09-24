import { useEffect } from "react"
import { useLocation } from "react-router-dom" 
import { track } from "@vercel/analytics"

export default function RouteAnalytics() {
    const location = useLocation()
    useEffect(() => {
        track("route_change", {
            path: location.pathname,
            search: location.search,
            hash: location.hash,
        })
    }, [location])
    return null
}
