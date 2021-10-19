const { Home } = require( '../src/components/home' );
const { Auth } = require( '../src/components/auth' );
const { Reg } = require( '../src/components/registration' );

const { LiveOrders } = require( '../src/components/live_orders' );
const { Events } = require( '../src/components/events' );
const { RasByBill } = require( '../src/components/ras_by_bill' );
const { CategoryItems } = require( '../src/components/category_items' );
const { VendorModule } = require( '../src/components/vendor_module' );
const { VendorItemPrice } = require( '../src/components/vendor_item_price' );
const { Tender } = require( '../src/components/tender' );
const { Revizion, RevizionNew } = require( '../src/components/revizion' );



module.exports = [
    {
        path: '/',
        exact: true,
        component: Home,
        title: 'Главная',
        code: 200
    },
    {
        path: '/auth',
        exact: true,
        component: Auth,
        title: 'Авторизация',
        code: 200
    },
    {
        path: '/registration',
        exact: true,
        component: Reg,
        title: 'Регистрация',
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
        path: '/events',
        exact: true,
        component: Events,
        title: 'События',
        code: 200
    },
    {
        path: '/ras_by_bill',
        exact: true,
        component: RasByBill,
        title: 'Расход по накладным',
        code: 200
    },
    {
        path: '/category_items',
        exact: true,
        component: CategoryItems,
        title: 'Категории товаров',
        code: 200
    },
    {
        path: '/vendor_module',
        exact: true,
        component: VendorModule,
        title: 'Поставщики',
        code: 200
    },
    {
        path: '/vendor_item_price',
        exact: true,
        component: VendorItemPrice,
        title: 'Цены на товары поставщика',
        code: 200
    },
    {
        path: '/tender',
        exact: true,
        component: Tender,
        title: 'Цены на товары поставщика',
        code: 200
    },
    {
        path: '/revizion',
        exact: true,
        component: Revizion,
        title: 'Ревизия',
        code: 200
    },
    {
        path: '/revizion/new',
        exact: true,
        component: RevizionNew,
        title: 'Новая ревизия',
        code: 200
    },
    
    
    
];