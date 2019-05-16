import "./stakeholders.scss";

class StakeholdersController {
  init() {
    this.setCurrentStakeholder(0);
  }

  slideStakeholder(isNext) {
    let newIndex =
      (this.stakeholders.data.length +
        this.currentStakeholderIndex +
        (isNext ? 1 : -1)) %
      this.stakeholders.data.length;
    this.setCurrentStakeholder(newIndex);
  }

  setCurrentStakeholder(index) {
    this.currentStakeholderIndex = index;
    this.currentStakeholder = this.stakeholders.data[index];
    this.totalDollarValue = this.calculateTotalDollarValue(
      this.currentStakeholder
    );
  }

  calculateDollarValue(quantifiable) {
    return (
      quantifiable.dollarValue *
      this.stakeholders.multiplier *
      this.currentStakeholder.number
    );
  }

  calculateTotalDollarValue(stakeholder) {
    return stakeholder.dollarQuantifiables.reduce(
      (accumulator, currentValue) =>
        accumulator +
        (currentValue.isPositive
          ? this.calculateDollarValue(currentValue)
          : -this.calculateDollarValue(currentValue)),
      0
    );
  }

  $onChanges(changesObj) {
    this.init();
  }
}

export default {
  templateUrl: "components/communitiesImpacted/stakeholders/stakeholders.html",
  controller: StakeholdersController,
  bindings: {
    stakeholders: "<",
    staticResources: "<"
  }
};
