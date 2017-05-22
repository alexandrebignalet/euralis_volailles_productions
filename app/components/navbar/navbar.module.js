import angular from 'angular';

import {NavbarComponent} from './navbar.component';

export const NavbarModule = angular.module('NavbarModule', [])
    .component('navbar', NavbarComponent)
    .name;