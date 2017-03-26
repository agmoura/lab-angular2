/**
 * Menu data mock
 */
export class MenuMock {
    static root = [
        {
            name: 'dashboard',
            title: 'Dashboard',
            faIcon: 'fa-tachometer',
            link: '/dashboard'
        },
        {
            name: 'masterdata',
            title: 'Cadastro',
            faIcon: 'fa-pencil-square-o',
            // Sub menu, only one level (Match Material Design)
            sub: [
                {
                    name: 'categoriaObjetivo',
                    title: 'Categoria Objetivo (New)',
                    link: '/masterdata/categoriaObjetivo'
                },
                {
                    name: 'escopo',
                    title: 'Escopo',
                    link: '/entity/escopo'
                },
                {
                    name: 'categoriaObjetivo',
                    title: 'Categoria Objetivo',
                    link: '/entity/categoriaObjetivo'
                },
                {
                    name: 'objetivo',
                    title: 'Objetivo',
                    link: '/entity/objetivo'
                },
                {
                    name: 'classificacaoRisco',
                    title: 'Classificacao Risco',
                    link: '/entity/classificacaoRisco'
                },
                {
                    name: 'categoriaRisco',
                    title: 'Categoria Risco',
                    link: '/entity/categoriaRisco'
                },
                {
                    name: 'entidade',
                    title: 'Entidade',
                    link: '/entity/entidade'
                },
                {
                    name: 'auditLog',
                    title: 'Audit Log',
                    link: '/entity/auditLog'
                }
            ]
        },
        {
            name: 'icon',
            title: 'Icon',
            faIcon: 'fa-check-circle-o',
            sub: [
                {
                    name: 'material_icons',
                    title: 'Material Icons',
                    link: '/icon-material'
                },
                {
                    name: 'fontawesome',
                    title: 'Font Awesome',
                    link: '/icon-fontawesome'
                },
                {
                    name: 'weather_icons',
                    title: 'Weather Icons',
                    link: '/icon-weather'
                }
            ]
        },
        {
            name: 'apps',
            title: 'Apps',
            faIcon: 'fa-rocket',
            sub: [
                {
                    name: 'calendar',
                    title: 'Calendar',
                    link: '/apps-calendar'
                },
                {
                    name: 'explorer',
                    title: 'Explorer',
                    link: '/apps-explorer'
                },
                {
                    name: 'mail',
                    title: 'Mail',
                    link: '/apps-mail'
                }
            ]
        },
        {
            name: 'maps',
            title: 'Maps',
            faIcon: 'fa-map-marker',
            notifyContent: '2',
            notifyClass: 'bg-warn label',
            sub: [
                {
                    name: 'google_maps',
                    title: 'Google Maps',
                    link: '/maps-google'
                },
                {
                    name: 'vector_maps',
                    title: 'Vector Maps',
                    link: '/maps-vector'
                }
            ]
        },
        {
            name: 'forms',
            title: 'Forms',
            notifyContent: '5',
            notifyClass: 'bg-accent label',
            faIcon: 'fa-pencil-square-o',
            sub: [
                {
                    name: 'forms_validation',
                    title: 'Validation Forms',
                    link: '/forms-validation'
                },
                {
                    name: 'forms_wizard',
                    title: 'Wizard Forms',
                    link: '/forms-wizard'
                },
                {
                    name: 'forms_autocomplete',
                    title: 'Autocomplete',
                    link: '/forms-autocomplete'
                },
                {
                    name: 'forms_upload',
                    title: 'Upload',
                    link: '/forms-upload'
                },
                {
                    name: 'forms_tree',
                    title: 'Tree',
                    link: '/forms-tree'
                },
            ]
        },
        {
            name: 'tables',
            title: 'Tables',
            faIcon: 'fa-table',
            sub: [
                {
                    name: 'basic',
                    title: 'Basic',
                    link: '/tables-basic'
                },
                {
                    name: 'dynamic',
                    title: 'Dynamic',
                    link: '/tables-dynamic'
                },
            ]
        },
        {
            name: 'charts',
            title: 'Charts',
            faIcon: 'fa-line-chart',
            notifyContent: '3',
            notifyClass: 'bg-warn label',
            sub: [
                {
                    name: 'chartjs',
                    title: 'Chart.js',
                    link: '/charts-chartjs'
                },
                {
                    name: 'peity',
                    title: 'Peity',
                    link: '/charts-peity'
                },
            ]
        },
        {
            name: 'pages',
            title: 'Pages',
            faIcon: 'fa-pagelines',
            sub: [
                {
                    name: 'signin',
                    title: 'Sign In',
                    link: '/pages-signin'
                },
                {
                    name: 'signup',
                    title: 'Sign Up',
                    link: '/pages-signup'
                },
                {
                    name: 'error',
                    title: 'Error',
                    link: '/pages-error'
                },
                {
                    name: 'notfound',
                    title: 'Not Found',
                    link: '/pages-notfound'
                },
                {
                    name: 'lockscreen',
                    title: 'Lockscreen',
                    link: '/pages-lockscreen'
                },
                {
                    name: 'invoice',
                    title: 'Invoice',
                    link: '/pages-invoice'
                },
            ]
        },
        {
            name: 'layout',
            title: 'Layout',
            faIcon: 'fa-columns',
            sub: [
                {
                    name: 'flex',
                    title: 'Flex',
                    link: '/layout-flex'
                },
                {
                    name: 'tabs',
                    title: 'Tabs',
                    link: '/layout-tabs'
                },
                {
                    name: 'edges',
                    title: 'Edges',
                    link: '/layout-edges'
                },
                {
                    name: 'cards',
                    title: 'Cards',
                    link: '/layout-cards'
                },
                {
                    name: 'fullscreen',
                    title: 'Fullscreen',
                    link: '/layout-fullscreen'
                },
            ]
        },
    ];
}
