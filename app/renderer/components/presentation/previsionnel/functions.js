export const DEFAULT_INVESTMENT_CHOOSEN = 'none';
export const NO_INVESTMENT_ANNUITY = 0;

export function processInvestmentAnnuity(investment, { duration, interest }) {
  return investment !== DEFAULT_INVESTMENT_CHOOSEN
    ? investment.getAnnuity(duration, interest)
    : NO_INVESTMENT_ANNUITY;
}
