import "./stakeholders.scss";

class StakeholdersController {
    init() {
        if(!this.stakeholders) return;
        
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

    calculateDollarValue(quantifiable, stakeholder) {
        stakeholder = stakeholder || this.currentStakeholder;
        return (
            quantifiable.dollarValue *
            this.stakeholders.multiplier *
            stakeholder.number
        );
    }

    calculateTotalDollarValue(stakeholder) {
        stakeholder = stakeholder || this.currentStakeholder;
        return stakeholder.dollarQuantifiables.reduce(
            (accumulator, currentValue) =>
                accumulator +
                (currentValue.isPositive
                    ? this.calculateDollarValue(currentValue, stakeholder)
                    : -this.calculateDollarValue(currentValue, stakeholder)),
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
