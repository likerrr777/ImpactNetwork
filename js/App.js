import "../css/styles.scss";
import SocialImpactComponent from "../components/overview/socialImpact/socialImpact";
import StakeholderComponent from "../components/communitiesImpacted/stakeholders/stakeholders";
import SocialReturnComponent from "../components/communitiesImpacted/socialReturn/socialReturn";


let app = angular
  .module("MainApp", ["ng-fusioncharts"])
  .component("socialImpact", SocialImpactComponent)
  .component("stakeholders", StakeholderComponent)
  .component("socialReturn", SocialReturnComponent);

app.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
}])

app.filter("range", function () {
  return function (input, total) {
    total = parseInt(total);

    for (var i = 0; i < total; i++) {
      input.push(i);
    }

    return input;
  };
});

app.controller("MainCtrl", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    $scope.mapclickfun = mapclickfun;
    $scope.output = [];
    $scope.social_chart_arr = [];
    $scope.selcountry = {};
    $scope.search_org = search_org;
    $scope.search_milestone = search_milestone;
    $scope.changeCountry = changeCountry;
    $scope.dopopover = dopopover;
    $scope.outcome = [];
    $scope.obj1 = {};
    $scope.obj2 = {};
    $scope.outcomehighlight = outcomehighlight;
    $scope.Funding_rasing_GraphPlotting1 = [];
    $scope.impact_fg = {};
    $scope.MeasurableOutcomes1 = [];
    $scope.investmentChart = [];
    $scope.socialReturnContainer = [];
    $scope.countrylist = [];
    $scope.countrylist_new = [];
    $scope.CountryName = [];
    $scope.countryItemsList = [];
    $scope.ttlinvestment = 0;
    $scope.multiplycm = 1;
    $scope.ttlsocialinvestment = 0;


    
    let dataSourceUrl = $location.search().dataSource || "inpact-network-ui-json.json";

    let request = {
      method: "GET",
      url: dataSourceUrl
    };
    $http(request)
      .then(function (response) {
        $scope.projectData = response.data;

        $scope.ProjSec = response.data.ProjectSection;

        $scope.overview = response.data.Overview;

        $scope.gallery = response.data.Overview.Gallery;

        $scope.time_line = response.data.Overview.TimelineInfo;
        $scope.TimelineInsight = response.data.Overview.TimelineInsight;

        $scope.fundInfo = response.data.Overview.Funding_Information;

        $scope.partners = response.data.Overview.Partnership_Organizations;
        $scope.partnerInsgt =
          response.data.Overview.Partnership_Organizations_Insight;

        $scope.outcomeInfo =
          response.data.Overview.Outputs_Outcomes_Info.Listing;
        $scope.goalTitle =
          response.data.Overview.Outputs_Outcomes_Info.GoalTitle;
        $scope.outcomeInfoSupportedProjects = $scope.outcomeInfo.filter(
          function (element) {
            return element.isSupported;
          }
        );
        $scope.leftpr =
          $scope.outcomeInfo.length -
          $scope.outcomeInfoSupportedProjects.length;

        $scope.comments = response.data.Overview.Insight;

        ///Second Page

        $scope.secpage = response.data.Theory_of_Change;

        $scope.th_summary = $scope.secpage.Summary_Section.Summary;

        $scope.th_insight = $scope.secpage.Summary_Section.Insight;

        $scope.blockIns = $scope.secpage.Summary_Section_Block.Insight;

        $scope.inputs = $scope.secpage.Summary_Section_Block.Input.Points;

        $scope.activites =
          $scope.secpage.Summary_Section_Block.Activities.Points;

        $scope.Intoutputs =
          $scope.secpage.Summary_Section_Block.IntendentOutput.Points;

        $scope.Intoutcomes =
          $scope.secpage.Summary_Section_Block.IntendentOutcomes.Points;
        $scope.follow = "Follow";
        $scope.is_following = false;

        $scope.keyAss = $scope.secpage.Key_Assumptions;
        $scope.solutions = $scope.secpage.Solutions;

        $scope.problms = $scope.secpage.Problem_Statements;
        selectProject(0);

        ///New Code For project detail circle section

        $scope.outputs =
          response.data.Overview.Outputs_Outcomes_Info.Project_Output_Section;
        $scope.outputs_tag_ = {};
        $scope.outcomes_tag_ = {};
        $.each($scope.outputs, function (kry, dt) {
          $scope.outputs_tag_[kry] = {};
          $.each(dt.Tags, function (ky, t) {
            $scope.outputs_tag_[kry][ky] = false;
          });
        });
        $scope.outcomes =
          response.data.Overview.Outputs_Outcomes_Info.Project_Outcomes_Section;
        $.each($scope.outcomes, function (kry, dt) {
          $scope.outcomes_tag_[kry] = {};
          $.each(dt.Tags, function (ky, t) {
            $scope.outcomes_tag_[kry][ky] = false;
          });
        });
        $scope.intotal = 0;
        selectProj($scope.outcomeInfoSupportedProjects[0]);
        //End

        //Mile Stone page

        $scope.milestone = $scope.projectData.Milestones.Listing;
        $scope.milestone_insite = $scope.projectData.Milestones.Insight;
        $scope.milestone1 = $scope.projectData.Milestones.Listing;

        $scope.teams = $scope.projectData.People_Partnership.TeamMember;
        $scope.teams_insight =
          $scope.projectData.People_Partnership.TeamMember_Insight;

        $scope.list_org = $scope.projectData.People_Partnership.Listing;
        $scope.part_insight =
          $scope.projectData.People_Partnership.People_Partnership_Insight;

        $scope.orgSlider = orgSlidersplit($scope.list_org, 3);

        showDesc($scope.list_org[0], 0);

        $.each($scope.outputs, function (key, dt) {
          $scope.obj2[dt.Project_Output_Primary_Key] = false;
        });

        //Funding and Risk
        $scope.fundSec = $scope.projectData.Fund_and_Risk.Funding_Round_Section;
        $scope.fund_ins =
          $scope.projectData.Fund_and_Risk.Fund_and_Risk_Insight;

        $scope.fundSecAmnt =
          $scope.projectData.Fund_and_Risk.Funding_Amount_Section;

        $scope.fundSourc =
          $scope.projectData.Fund_and_Risk.Source_of_Funding.Listing;
        $scope.notesInv = $scope.projectData.Fund_and_Risk.Notes_for_Investor;
        $scope.notes_ins =
          $scope.projectData.Fund_and_Risk.Notes_for_Investor_Insight;

        $scope.fundgraph =
          $scope.projectData.Fund_and_Risk.Funding_rasing_over_the_period_of_time;

        $scope.sustain = $scope.projectData.Fund_and_Risk.Sustainability;
        $scope.social_color = [];
        $scope.financialxls =
          $scope.projectData.Fund_and_Risk.Financial_Management.Listing;
        $scope.financialInsght =
          $scope.projectData.Fund_and_Risk.Financial_Management.Financial_Insight;
        $scope.circle_title =
          $scope.projectData.Fund_and_Risk.Financial_Management_Chart.CenterCircle;
        $scope.circle_tIcon =
          $scope.projectData.Fund_and_Risk.Financial_Management_Chart.CenterCircleIcon;
        $scope.circle_tDesc =
          $scope.projectData.Fund_and_Risk.Financial_Management_Chart.CenterCirclePopoverText;
        $scope.FinancialChartInsight =
          $scope.projectData.Fund_and_Risk.Financial_Management_Chart.FinancialChartInsight;

        $scope.circle_Listing =
          $scope.projectData.Fund_and_Risk.Financial_Management_Chart.Listing;
        dopopover(
          $scope.circle_Listing[0].CirclePopoverText,
          $scope.circle_Listing[0].CircleIcon,
          $scope.circle_Listing[0].CircleText
        );

        ///Chart code
        $scope.countryChart =
          response.data.CommunitiesImpactedPage.Communities[0].ListofItems;
        $scope.community = response.data.CommunitiesImpactedPage.Communities[0];
        $scope.selectedYear = $scope.community.years[0];
        $scope.selectedDataset = $scope.selectedYear.dataset[0];
        $scope.CountryName =
          response.data.CommunitiesImpactedPage.Communities[0].CountryName;
        $scope.CommunityName =
          response.data.CommunitiesImpactedPage.Communities[0].CommunityName;

        $.each(response.data.CommunitiesImpactedPage.Communities, function (
          ky,
          dty
        ) {
          $scope.selcountry[dty.CountryName] = "";
          $scope.selcountry[dty.CountryName] = false;
        });

        $scope.CommunityInsights =
          response.data.CommunitiesImpactedPage.CommunityInsights;

        $scope.Impact_Reports =
          response.data.CommunitiesImpactedPage.Impact_Reports.Listing;

        $scope.Communities = response.data.CommunitiesImpactedPage.Communities;
        $.each($scope.Communities, function (key, dty) {
          $scope.Country_name = $scope.Communities[key].CountryName;
          $scope.Latitude = $scope.Communities[key].Latitude;
          $scope.Longitude = $scope.Communities[key].Longitude;
          $scope.Country_value = $scope.Communities[key].Countryvalue;
          $scope.countrylist.push({
            id: $scope.Country_name,
            value: $scope.Country_value
          });
          $scope.countrylist_new.push({
            latLng: [$scope.Latitude, $scope.Longitude],
            name: $scope.Country_name
          });
        });
        mapclickfun(0);

        $scope.Funding_rasing_GraphPlotting =
          $scope.projectData.Fund_and_Risk.Funding_rasing_over_the_period_of_time.GraphPlotting;
        $.each($scope.Funding_rasing_GraphPlotting, function (ky, dty) {
          $scope.Funding_rasing_GraphPlotting1.push({
            label: dty.Year,
            value: dty.Amount
          });
        });
      })
      .then(function () {
        communitiesImpacted();
      });

    $scope.following = following;
    $scope.timeDiffInMinutes = timeDiffInMinutes;
    $scope.dateMonth = dateMonth;
    $scope.selectProject = selectProject;
    $scope.hight_outcome = hight_outcome;
    $scope.showDesc = showDesc;
    $scope.mileStCmnt = mileStCmnt;
    $scope.testGal = testGal;
    $scope.selectProj = selectProj;
    $scope.impact_fg = {};

    $scope.myDataSource = {
      chart: {
        caption: "Funding Over Time(in millions)",
        numberprefix: "$",
        rotatelabels: "0",
        theme: "fusion"
      },

      data: $scope.Funding_rasing_GraphPlotting1
    };

    function following() {
      $scope.follow = "Following";

      $scope.ProjSec.TotalFollower = $scope.ProjSec.TotalFollower + "";
      if ($scope.ProjSec.TotalFollower.indexOf(",") != -1) {
        var t = parseInt($scope.ProjSec.TotalFollower.replace(",", ""));
      } else {
        var t = $scope.ProjSec.TotalFollower;
      }
      t = parseInt(t);
      if (!$scope.is_following) {
        $scope.is_following = true;
        t = t + 1 + "";

        $scope.ProjSec.TotalFollower = t.replace(
          /(\d)(?=(\d\d\d)+(?!\d))/g,
          "$1,"
        );
      } else {
        t = t - 1 + "";
        $scope.follow = "Follow";
        $scope.is_following = false;
        $scope.ProjSec.TotalFollower = t.replace(
          /(\d)(?=(\d\d\d)+(?!\d))/g,
          "$1,"
        );
      }
    }

    function timeDiffInMinutes(date) {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = yyyy + "/" + mm + "/" + dd;
      $scope.today = today;
      var date2 = new Date(today);
      var date1 = new Date(date);
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    function dateMonth(date) {
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      const d = new Date(date);

      return d.getDate() + " " + months[d.getMonth()];
    }

    function dopopover(val, icon, actv) {
      $scope.slect_vl = val;
      $scope.selct_icon = icon;
      $scope.activeCircle = actv;
    }

    $scope.showtag = showtag;

    function showtag(idx, index) {
      $.each($scope.outputs_tag_[idx], function (kry, dt) {
        $scope.outputs_tag_[idx][kry] = false;
      });
      $scope.outputs_tag_[idx][index] = true;
    }
    $scope.showoutcomestag = showoutcomestag;
    $scope.closeouttag = closeouttag;

    function closeouttag(idx, index) {
      $scope.outputs_tag_[idx][index] = false;
    }

    $scope.closeoutcometag = closeoutcometag;
    function closeoutcometag(idx, index) {
      $scope.outcomes_tag_[idx][index] = false;
    }

    function showoutcomestag(idx, index) {
      $.each($scope.outcomes_tag_[idx], function (kry, dt) {
        $scope.outcomes_tag_[idx][kry] = false;
      });
      $scope.outcomes_tag_[idx][index] = true;
    }

    function mapclickfun(index) {
      $scope.countryItemsList = $scope.Communities[index].ListofItems;
      $scope.CountryName = $scope.Communities[index].CountryName;
      $scope.CommunityName = $scope.Communities[index].CommunityName;
      $scope.CountryIcons = $scope.Communities[index].CountryIcons;
      $scope.selcountry[$scope.CountryName] = true;
    }

    function selectProject(index) {
      $scope.output = $scope.outcomeInfo[index].Project_Output_Section;
      var x = [];

      $scope.obj = {};

      $.each($scope.output, function (key, dt) {
        $scope.obj[key] = false;

        x.push(dt.Outcome);

        $.each(dt.Outcome, function (ky, t) {
          t["id"] = key;

          $scope.outcome.push(t);
        });
      });
    }

    function hight_outcome(index) {
      $.each($scope.obj, function (ky, t) {
        $scope.obj[ky] = false;
      });

      $scope.obj[index] = true;
    }

    function orgSlidersplit(arr, size) {
      var newArr = [];

      for (var i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
      }

      return newArr;
    }

    function showDesc(item, key1) {
      $scope.desc = item.Description;
      $scope.item_roles = item.RoleInvolved;

      $scope.tags = item.Tags;
      $(".box1").css("border", "1px solid #07c776");
      $(".box1").removeClass("boxselect");
      $("#item_" + key1).addClass("boxselect");
    }

    function mileStCmnt(cmnt) {
      $(".maile_stone_moal").modal("show");

      $scope.milst_cmnt = cmnt;
    }
    $scope.mileStTask = mileStTask;

    function mileStTask(task) {
      $(".milestone_task").modal("show");

      $scope.milst_task = task;
    }
    $scope.mileStAttach = mileStAttach;

    function mileStAttach(attach) {
      $(".milestone_attach").modal("show");

      $scope.milst_attach = attach;
    }

    function testGal(url) {
      $("#image-gallery").modal("show");
      $("#image-gallery-image").attr("src", url);
    }

    function search_org(val) {
      var d = orgSlidersplit($scope.list_org, 3);
      $scope.orgSlider = [];
      var f = [];
      if (val != "") {
        $.each(d, function (key, dt) {
          $.each(dt, function (k, d1) {
            if (d1.Title.indexOf(val) != -1) {
              f.push(d1);
            }
          });
        });
        $scope.orgSlider.push(f);
      } else {
        $scope.orgSlider = d;
      }
    }

    function search_milestone(val) {
      var d = $scope.milestone1;
      $scope.milestone = [];
      var f = [];
      if (val != "") {
        $.each(d, function (key, dt) {
          if (dt.MainTitle.indexOf(val) != -1) {
            $scope.milestone.push(dt);
          }
        });
      } else {
        $scope.milestone = d;
      }
    }

    function selectProj(proj) {
      if (proj) {
        $scope.project = proj.Project_Name;
        $scope.Project_Primary_key = proj.Project_Primary_key;
        $scope.Project_Icon = proj.Project_Icon;
        $scope.Project_Insight = proj.Project_Insight;
        $scope.Proj_ID = proj.Proj_ID;

        $.each($scope.obj1, function (ky, t) {
          $scope.obj1[ky] = false;
        });

        $scope.obj1[proj.Project_Primary_key] = true;

        $scope.goalItems = proj.goalItems;
      }
    }

    function outcomehighlight(proj, pt) {
      $.each($scope.obj1, function (ky, t) {
        $scope.obj1[ky] = false;
      });
      $scope.obj1[pt] = true;
      $.each($scope.obj2, function (ky, t) {
        $scope.obj2[ky] = false;
      });

      $scope.obj2[proj] = true;
    }

    function changeCountry(name) {
      var community = $scope.Communities.find(el => el.CountryName === name);
      if (community) {
        $scope.community = community;
        $scope.selectedYear = community.years[0];
        $scope.selectedDataset = $scope.selectedYear.dataset[0];
        $scope.CountryName = community.CountryName;
        $scope.CommunityName = community.CommunityName;
        $scope.CountryIcons = community.CountryIcons;
      }
    }
  }
]);
