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
const { CatWork } = require( '../src/components/cat_work' );
const { AppWorkPoint } = require( '../src/components/app_work_point' );
const { AppWork } = require( '../src/components/app_work' );
const { AppWorkShow } = require( '../src/components/app_work_show' );
const { SiteStatMarc } = require( '../src/components/site_stat_marc' );
const { AdvertisingCompany } = require( '../src/components/advertising_company' );
const { RasBillAndCook } = require( '../src/components/ras_bill_and_cook' );
const { SkladItemsModule } = require( '../src/components/sklad_items_module' );
const { SiteUserManager } = require( '../src/components/site_user_manager' );


//AdvertisingCompany_

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
    {
        path: '/cat_work',
        exact: true,
        component: CatWork,
        title: 'Категории уборок',
        code: 200
    },
    {
        path: '/app_work_point',
        exact: true,
        component: AppWorkPoint,
        title: 'Уборки на точке',
        code: 200
    },
    {
        path: '/app_work',
        exact: true,
        component: AppWork,
        title: 'Время уборок',
        code: 200
    },
    {
        path: '/app_work_show',
        exact: true,
        component: AppWorkShow,
        title: 'Просмотр уборок',
        code: 200
    },
    {
        path: '/site_stat_marc',
        exact: true,
        component: SiteStatMarc,
        title: 'Статистика маркетолога',
        code: 200
    },
    {
        path: '/advertising_company',
        exact: true,
        component: AdvertisingCompany,
        title: 'Рекламные компании',
        code: 200
    },
    {
        path: '/ras_bill_and_cook',
        exact: true,
        component: RasBillAndCook,
        title: 'Расход от ревизии до числа',
        code: 200
    },
    {
        path: '/sklad_items_module',
        exact: true,
        component: SkladItemsModule,
        title: 'Товары склада',
        code: 200
    },
    {
        path: '/site_user_manager',
        exact: true,
        component: SiteUserManager,
        title: 'Сотрудники',
        code: 200
    },
    
    
];