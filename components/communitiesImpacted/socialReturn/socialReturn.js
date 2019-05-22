import "./socialReturn.scss";
import StakeholdersComponent from "../stakeholders/stakeholders";

class SocialReturnController {
    constructor() {
        let StakeholdersController = StakeholdersComponent.controller;
        this.stakeholdersController = new StakeholdersController();
    }

    init() {
        if (!this.yearsData) return;

        this.changeYear(this.yearsData[0])
    }

    changeYear(year) {
        if (!year) return;

        this.selectedYear = year;
        this.changeDataset(this.selectedYear.dataset[0]);
    }

    changeDataset(dataset) {
        if (!dataset || this.selectedDataset === dataset) return;

        this.selectedDataset = dataset;
        this.stakeholdersController.stakeholders = this.selectedDataset.stakeholders;

        this.stakeholdersColors = this.selectedDataset.stakeholders.data.map((stakeholder) => this.getRandomColor());
        this.investmentsColors = this.selectedDataset.investments.map((investment) => this.getRandomColor());
    }

    updateSocialReturnsChart() {
        let socialReturnContainer = this.selectedDataset.stakeholders.data.map((stakeholder, index) => {
            return {
                label: stakeholder.name,
                value: this.stakeholdersController.calculateTotalDollarValue(stakeholder),
                color: this.stakeholdersColors[index]
            }
        });

        InitSocialReturnFusionChart(this.totalIncome, socialReturnContainer);
    }

    updateInvestmentChart() {
        let investments = this.selectedDataset.investments.map((investment, index) => {
            return {
                Label: investment.name,
                Value: investment.value,
                color: this.investmentsColors[index]
            }
        });

        initInvestmentFusionChart(this.totalInvestment, investments);
    }

    calculateSroiMultiplier(dataset) {
        dataset = dataset || this.selectedDataset;
        if (!dataset) return;

        this.totalIncome = this.calculateTotalIncome(dataset);
        this.totalInvestment = this.calculateTotalInvestment(dataset);

        this.updateSocialReturnsChart();
        this.updateInvestmentChart();

        return Math.round(this.totalIncome * 100 / this.totalInvestment);
    }

    calculateTotalIncome(dataset) {
        dataset = dataset || this.selectedDataset;
        return dataset.stakeholders.data.reduce((accumulator, stakeholder) => {
            return accumulator + this.stakeholdersController.calculateTotalDollarValue(stakeholder);
        }, 0);
    }

    calculateTotalInvestment(dataset) {
        dataset = dataset || this.selectedDataset;
        return dataset.investments.reduce((accumulator, investment) => {
            return accumulator + parseInt(investment.value);
        }, 0);
    }

    calculateStakeholderValuePercent(stakeholder) {
        return Math.round((this.stakeholdersController.calculateTotalDollarValue(stakeholder) * 100 / this.totalIncome))
    }

    calculateInvestmentValuePercent(investment) {
        return Math.round((investment.value * 100 / this.totalInvestment))
    }

    getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    $onChanges(changesObj) {
        this.init();
    }
}

export default {
    templateUrl: "components/communitiesImpacted/socialReturn/socialReturn.html",
    controller: SocialReturnController,
    bindings: {
        yearsData: "<",
        staticResources: "<"
    }
};