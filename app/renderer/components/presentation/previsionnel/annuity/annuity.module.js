import {AnnuityComponent} from "./annuity.component";
import {AnnuityLineDirective} from "./annuity-line.directive";

export const AnnuityModule = angular.module('AnnuityModule', [])
  .component('annuity', AnnuityComponent)
  .directive('annuityLine', () => AnnuityLineDirective)
  .name;
