import "./socialImpact.scss";
import StakeholdersComponent from "../../communitiesImpacted/stakeholders/stakeholders";

class SocialImpactController {
  init() {
    let StakeholdersController = StakeholdersComponent.controller;
    this.stakeholdersController = new StakeholdersController();

    this.stakeholdersController.stakeholders = {}; //todo
  }

  $onChanges(changesObj) {
    this.init();
  }
}

export default {
  templateUrl: "components/overview/socialImpact/socialImpact.html",
  controller: SocialImpactController,
  bindings: {
    socialImpact: "<"
  }
};
