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
        if(this.stakeholdersController.stakeholders.data.length > 2){
            this.addScroll();
        }
        else{
            this.removeScroll();
        }

        this.stakeholdersColors = this.selectedDataset.stakeholders.data.map((stakeholder) => this.getRandomColor());
        this.investmentsColors = this.selectedDataset.investments.map((investment) => this.getRandomColor());
    }

    addScroll(){
        var stakholdersWrapperInterval = setInterval(function(){
            var stakholdersWrapper = document.querySelector(".pro_pdng.scrollable");
            var stakholders = document.querySelectorAll(".pro_pdng.scrollable .progress_div3.core.ng-scope")
            var firstStakholderHeight = stakholders[0].clientHeight;
            if(stakholdersWrapper && firstStakholderHeight > 0 && stakholders){
                var heightToSet = stakholders[0].clientHeight + stakholders[1].clientHeight;
                stakholdersWrapper.style.height = heightToSet+'px';
                stakholdersWrapper.style.overflowY = "scroll";
                clearInterval(stakholdersWrapperInterval)
            }
        }, 100);
    }

    removeScroll(){
        var stakholdersWrapperInterval = setInterval(function(){
            var stakholdersWrapper = document.querySelector(".pro_pdng.scrollable");
            var stakholders = document.querySelectorAll(".pro_pdng.scrollable .progress_div3.core.ng-scope")
            var firstStakholderHeight = stakholders[0].clientHeight;
            if(stakholdersWrapper && firstStakholderHeight > 0 && stakholders){
                stakholdersWrapper.style.height = 'auto';
                stakholdersWrapper.style.overflowY = "unset";
                clearInterval(stakholdersWrapperInterval)
            }
        }, 100);
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

        return Math.round(this.totalIncome * 10 / this.totalInvestment) / 10.0;
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

    showInvestmentModal() {
        this.newInvestment = {
            name: '',
            value: 0
        };
        this.investmentModal = $("#investmentModal");
        this.investmentModal.modal("show");
    }

    addInvestment(newInvestment) {
        this.selectedDataset.investments.push(newInvestment);
        this.investmentModal.modal("toggle");
        this.newInvestment = {};
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