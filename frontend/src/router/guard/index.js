import { createPageLoadingGuard } from './pageLoadingGuard'

export function setupRouterGuard(router) {
  createPageLoadingGuard(router)
}
