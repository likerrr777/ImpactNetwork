import "./socialImpact.scss";
import StakeholdersComponent from "../../communitiesImpacted/stakeholders/stakeholders";

class SocialImpactController {
  constructor() {
    let StakeholdersController = StakeholdersComponent.controller;
    this.stakeholdersController = new StakeholdersController();
  }

  init() {
    if (!this.yearsData) return;

    this.selectedYear = this.yearsData[0];
    this.changeDataset(this.selectedYear.dataset[0]);
  }

  changeYear(year) {
    this.selectedYear = year;
    this.changeDataset(this.selectedYear.dataset[0]);
  }

  changeDataset(dataset) {
    if (!dataset) return;

    this.selectedDataset = dataset;
    this.stakeholdersController.stakeholders = this.selectedDataset.stakeholders;

    this.sroiMultiplier = this.calculateSroiMultiplier(this.selectedDataset);

    this.positiveQuantifiablesNumber = this.selectedDataset.stakeholders.data.reduce(
      (accumulator, stakeholder) => {
        return (
          accumulator +
          stakeholder.quantifiables.filter(p => p.isPositive).length
        );
      },
      0
    );

    this.negativeQuantifiablesNumber = this.selectedDataset.stakeholders.data.reduce(
      (accumulator, stakeholder) => {
        return (
          accumulator +
          stakeholder.quantifiables.filter(p => !p.isPositive).length
        );
      },
      0
    );

    this.positiveNonQuantifiablesNumber = this.selectedDataset.stakeholders.data.reduce(
      (accumulator, stakeholder) => {
        return (
          accumulator +
          stakeholder.nonQuantifiables.filter(p => p.isPositive).length
        );
      },
      0
    );

    this.negativeNonQuantifiablesNumber = this.selectedDataset.stakeholders.data.reduce(
      (accumulator, stakeholder) => {
        return (
          accumulator +
          stakeholder.nonQuantifiables.filter(p => !p.isPositive).length
        );
      },
      0
    );
  }

  calculateSroiMultiplier(dataset) {
    this.totalIncome = dataset.stakeholders.data.reduce((accumulator, stakeholder) => {
      return accumulator + this.stakeholdersController.calculateTotalDollarValue(stakeholder);
    }, 0);

    this.totalInvestment = dataset.investments.reduce((accumulator, investment) => {
      return accumulator + parseInt(investment.value);
    }, 0);

    return Math.round((this.totalIncome / this.totalInvestment) * 10) / 10;
  }

  onViewImpactClick() {
    document.querySelector('a[href="#communitiesImctd"]').click();
  }

  $onChanges(changesObj) {
    this.init();
  }
}

export default {
  templateUrl: "components/overview/socialImpact/socialImpact.html",
  controller: SocialImpactController,
  bindings: {
    yearsData: "<",
    staticResources: "<"
  }
};
