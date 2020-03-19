import angular from 'angular';

import {NavbarComponent} from './navbar.component';
import {SearchBarComponent} from './search-bar.component';

export const NavbarModule = angular.module('NavbarModule', [])
    .component('searchBar', SearchBarComponent)
    .component('navbar', NavbarComponent)
    .name;