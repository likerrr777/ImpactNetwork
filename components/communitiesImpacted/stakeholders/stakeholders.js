function StakeholdersController() {
    this.$onInit = function () {
        var ctrl = this;
        ctrl.setCurrentStakeholder = setCurrentStakeholder;
        ctrl.calculateDollarValue = calculateDollarValue;
        ctrl.calculateTotalDollarValue = calculateTotalDollarValue;
        ctrl.slideStakeholder = slideStakeholder;

        ctrl.sroiMultiplier = 1;
        ctrl.setCurrentStakeholder(0);

        function setCurrentStakeholder(index) {
            ctrl.currentStakeholderIndex = index;
            ctrl.currentStakeholder = ctrl.stakeholders.data[index];
            ctrl.totalDollarValue = calculateTotalDollarValue(ctrl.currentStakeholder);
        };

        function calculateDollarValue(quantifiable) {
            return quantifiable.dollarValue * ctrl.stakeholders.multiplier * ctrl.currentStakeholder.number;
        };

        function calculateTotalDollarValue(stakeholder) {
            return stakeholder.dollarQuantifiables.reduce((accumulator, currentValue) =>
                accumulator + (currentValue.isPositive ? calculateDollarValue(currentValue) : -calculateDollarValue(currentValue)), 0);
        };

        function slideStakeholder(isNext) {
            let newIndex = (ctrl.stakeholders.data.length + ctrl.currentStakeholderIndex + (isNext ? 1 : -1)) % ctrl.stakeholders.data.length;
            setCurrentStakeholder(newIndex);
        };
    };
}

angular.module("MainApp").component("stakeholders", {
    templateUrl: "components/communitiesImpacted/stakeholders/stakeholders.html",
    controller: StakeholdersController,
    bindings: {
        stakeholders: "<"
    }
});
