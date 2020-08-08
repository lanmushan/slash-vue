import router from '@/router/index.js'

/**
 * 添加路由
 * @param router
 */
function loadRouter (menus) {

  if (menus.length >= 0) {
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].children.length > 0) {
        loadRouter(menus[i].children)
      } else {
        addRouter(menus[i].resourceUrl)
      }

    }

  }

}

function addRouter (path) {
  let has = false
  router.options.routes[0].children.forEach((it) => {
    if (it.path == path) {
      has = true
    }
  })
  if (!has) {
    router.options.routes[0].children.push({
      path: `${path}`,
      component: () => import( '@/pages/' + path.replace('/pages/', '')),
    })
    router.addRoutes(router.options.routes)
  }
}

export {loadRouter}
