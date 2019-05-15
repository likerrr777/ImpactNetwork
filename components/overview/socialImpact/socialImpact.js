import "./socialImpact.scss";
import StakeholdersComponent from "../../communitiesImpacted/stakeholders/stakeholders";

class SocialImpactController {
  init() {
    let StakeholdersController = StakeholdersComponent.controller;
    this.stakeholdersController = new StakeholdersController();

    this.sroiMultiplier = 1;
    this.selectedYear = this.yearsData[0];
    this.selectedDataset = this.selectedYear.dataset[0];

    this.stakeholdersController.stakeholders = {}; //todo
  }

  changeYear(year) {
    this.selectedYear = year;
  }

  changeDataset(dataset) {
    this.selectedDataset = dataset;

    this.positiveQuantifiablesNumber = this.selectedDataset.stakeholders.reduce((accumulator, stakeholder) => {
      return accumulator + stakeholder.data.quantifiables.filter(p => p.isPositive).length;
    }, 0);

    this.negativeQuantifiablesNumber = this.selectedDataset.stakeholders.reduce((accumulator, stakeholder) => {
      return accumulator + stakeholder.data.quantifiables.filter(p => !p.isPositive).length;
    }, 0);

    this.positiveNonQuantifiablesNumber = this.selectedDataset.stakeholders.reduce((accumulator, stakeholder) => {
      return accumulator + stakeholder.data.nonQuantifiables.filter(p => p.isPositive).length;
    }, 0);

    this.negativeNonQuantifiablesNumber = this.selectedDataset.stakeholders.reduce((accumulator, stakeholder) => {
      return accumulator + stakeholder.data.nonQuantifiables.filter(p => !p.isPositive).length;
    }, 0);
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
