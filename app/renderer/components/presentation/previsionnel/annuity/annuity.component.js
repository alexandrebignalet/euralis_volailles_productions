import template from './annuity.component.html';

export const AnnuityComponent = {
  bindings: {
    investments: '<',
    investmentChosen: '=',
    duration: '=',
    interest: '='
  },
  template
};
