import Home from '../components/Home.vue';
// import Stock from '../components/stocks/Stock.vue';
import Stocks from '../components/stocks/Stocks.vue';
import Portfolio from '../components/portfolio/Portfolio.vue';
// import Stock2 from '../components/portfolio/Stock.vue';

export const routes = [
    {path: '', component: Home, name: 'home'},
    {path: '/stocks', component: Stocks, name: 'stocks'},
    {path: '/portfolio', component: Portfolio, name: 'portfolio'},
    {path: '*', redirect: {name: 'home'}}
];