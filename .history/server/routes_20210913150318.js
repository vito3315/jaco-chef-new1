const { Home } = require( '../src/components/home' );
const { LiveOrders } = require( '../src/components/live_orders' );
const { Auth } = require( '../src/components/auth' );

module.exports = [
    {
        path: '/',
        exact: true,
        component: Home,
        title: 'Главная',
        code: 200
    },
    {
        path: '/live_orders',
        exact: true,
        component: LiveOrders,
        title: 'Оформленные заказы',
        code: 200
    },
    {
        path: '/auth',
        exact: true,
        component: Auth,
        title: 'Авторизация',
        code: 200
    },
];