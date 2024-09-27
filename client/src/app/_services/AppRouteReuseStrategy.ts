import { ActivatedRouteSnapshot, BaseRouteReuseStrategy, DetachedRouteHandle } from "@angular/router";

export class AppRouteReuseStrategy implements BaseRouteReuseStrategy {
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }

    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        return;
    }

    // public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    //   return (future.routeConfig === curr.routeConfig) || future.data.reuseComponent;
    // }

    // So as the routes are roloaded with fresh data each call (and not reuse the cached route data)
    public shouldReuseRoute(): boolean {
      return false;
    }
}