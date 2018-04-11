import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import User from './views/User.vue'
import Page from './views/page.vue'

let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message', //图标样式class
        children: [
            { path: '/user', component: User, name: '账号管理' },
            { path: '/page', component: Page, name: '页面' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page', component: Page, name: '页面' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true, //只有一个节点
        children: [
            { path: '/page', component: Page, name: '导航三' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;