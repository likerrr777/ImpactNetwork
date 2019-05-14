function StakeholdersController() {
  this.$onInit = function() {
    var ctrl = this;

    setCurrentStakeholder(0);
    ctrl.sroiMultiplier = 1;
    ctrl.totalDollarValue = calculateTotalDollarValue();

    function setCurrentStakeholder(index) {
      ctrl.currentStakeholderIndex = index;
      ctrl.currentStakeholder = ctrl.stakeholders.data[index];
    }

    function calculateTotalDollarValue() {
      return 0;
    }
  };
}

angular.module("MainApp").component("stakeholders", {
  templateUrl: "components/communitiesImpacted/stakeholders/stakeholders.html",
  controller: StakeholdersController,
  bindings: {
    stakeholders: "<"
  }
});
