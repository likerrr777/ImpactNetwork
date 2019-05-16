import "./socialImpact.scss";
import StakeholdersComponent from "../../communitiesImpacted/stakeholders/stakeholders";

class SocialImpactController {
  init() {
    if (!this.yearsData) return;

    let StakeholdersController = StakeholdersComponent.controller;
    this.stakeholdersController = new StakeholdersController();

    this.sroiMultiplier = 1;
    this.selectedYear = this.yearsData[0];
    this.changeDataset(this.selectedYear.dataset[0]);

    this.stakeholdersController.stakeholders = {}; //todo
  }

  changeYear(year) {
    this.selectedYear = year;
  }

  changeDataset(dataset) {
    if (!dataset) return;

    this.selectedDataset = dataset;

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
