const { Home } = require( '../src/components/home' );
const { NotFound } = require( '../src/components/app' );
const { Orders } = require( '../src/components/orders' );
const { ordercook } = require( '../src/components/ordercook' );
const { LiveOrders } = require( '../src/components/live_orders' );
const { Auth } = require( '../src/components/auth' );

module.exports = [
    {
        path: '/',
        exact: true,
        component: Home,
        title: 'Оформление заказа',
        code: 200
    },
    {
        path: '/orders',
        exact: true,
        component: Orders,
        title: 'Оформленные заказы',
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
        path: '/ordercook',
        exact: true,
        component: ordercook,
        title: 'Заказы на кухне',
        code: 200
    },
];