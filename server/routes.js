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
const { WorkSchedule } = require( '../src/components/work_schedule' );
const { SiteSale2, SiteSale2_New, SiteSale2_Edit, SiteSale2_Stat, SiteSale2_StatList } = require( '../src/components/site_sale_2' );
const { DriveMapStatAll } = require( '../src/components/drive_map_stat_all' );
const { DriverStat } = require( '../src/components/driver_stat' );
const { Concenter } = require( '../src/components/concenter' );
const { SocialNetwork } = require( '../src/components/socialnetwork' );
//

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
    {
        path: '/work_schedule',
        exact: true,
        component: WorkSchedule,
        title: 'График работы',
        code: 200
    },
    
    {
        path: '/site_sale_2',
        exact: true,
        component: SiteSale2,
        title: 'Промокоды маркетолога',
        code: 200
    },
    {
        path: '/site_sale_2/new',
        exact: true,
        component: SiteSale2_New,
        title: 'Промокоды маркетолога',
        code: 200
    },
    {
        path: '/site_sale_2/edit/:promoId',
        exact: true,
        component: SiteSale2_Edit,
        title: 'Промокоды маркетолога',
        code: 200
    },
    {
        path: '/site_sale_2/stat',
        exact: true,
        component: SiteSale2_Stat,
        title: 'Промокоды маркетолога',
        code: 200
    },
    {
        path: '/site_sale_2/stat_list',
        exact: true,
        component: SiteSale2_StatList,
        title: 'Выписанные промики',
        code: 200
    },
    {
        path: '/drive_map_stat_all',
        exact: true,
        component: DriveMapStatAll,
        title: 'Курьеры на карте',
        code: 200
    },
    {
        path: '/driver_stat',
        exact: true,
        component: DriverStat,
        title: 'Статистика курьеров',
        code: 200
    },
    {
        path: '/concenter',
        exact: true,
        component: Concenter,
        title: 'Контакт-центр',
        code: 200
    },
    {
        path: '/socialnetwork',
        exact: true,
        component: SocialNetwork,
        title: 'Социальные сети',
        code: 200
    },
    
    
    
];