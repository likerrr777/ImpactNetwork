var app = angular.module("MainApp", ["ng-fusioncharts"]);

app.filter("range", function () {
  return function (input, total) {
    total = parseInt(total);

    for (var i = 0; i < total; i++) {
      input.push(i);
    }

    return input;
  };
});

app.controller("MainCtrl", function ($scope, $http) {
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
  $scope.showformaula = showformaula;
  $scope.Funding_rasing_GraphPlotting1 = [];
  $scope.Investments = [];
  $scope.SocialReturns = [];
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

  $http
    .get("inpact-network-ui-json.json")
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

      $scope.outcomeInfo = response.data.Overview.Outputs_Outcomes_Info.Listing;
      $scope.outcomeInfoSupportedProjects = $scope.outcomeInfo.filter(function (
        element
      ) {
        return element.isSupported;
      });
      $scope.leftpr =
        $scope.outcomeInfo.length - $scope.outcomeInfoSupportedProjects.length;

      $scope.comments = response.data.Overview.Insight;

      ///Second Page

      $scope.secpage = response.data.Theory_of_Change;

      $scope.th_summary = $scope.secpage.Summary_Section.Summary;

      $scope.th_insight = $scope.secpage.Summary_Section.Insight;

      $scope.blockIns = $scope.secpage.Summary_Section_Block.Insight;

      $scope.inputs = $scope.secpage.Summary_Section_Block.Input.Points;

      $scope.activites = $scope.secpage.Summary_Section_Block.Activities.Points;

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
      $scope.updatetotal = updatetotal;
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
      $scope.fund_ins = $scope.projectData.Fund_and_Risk.Fund_and_Risk_Insight;

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
      $scope.Investments = response.data.CommunitiesImpactedPage.Investments;
      $.each($scope.Investments, function (k, dt) {
        $scope.intotal = $scope.intotal + parseInt(dt.Value);
      });
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

      $scope.invstChart = response.data.CommunitiesImpactedPage.Investments;
      $scope.invest_color = [];
      $.each($scope.invstChart, function (ky, dty) {
        $scope.ttlinvestment += parseInt(dty.Value);
        var c = getRandomColor();
        $scope.invest_color.push({
          color: c
        });
        $scope.investmentChart.push({
          label: dty.Label,
          value: dty.Value,
          color: c
        });
      });

      $scope.CommunityInsights =
        response.data.CommunitiesImpactedPage.CommunityInsights;

      $scope.Impact_Reports =
        response.data.CommunitiesImpactedPage.Impact_Reports.Listing;
      //Investments
      $scope.Investments = response.data.CommunitiesImpactedPage.Investments;

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

      //Social Returns Bottom Block
      $scope.SocialReturns = $scope.selectedDataset.SocialReturns;
      performMeasurableOutcomeOverride();
      $scope.socialReturnValue = 0;

      $.each($scope.SocialReturns, function (ky, dty) {
        if (dty.Shown_by_default) {
          $scope.impact_fg[ky] = {};
          $.each($scope.SocialReturns[ky].MeasurableOutcomes, function (i, vs) {
            var value = calculateSocialReturnItemValue(ky, i);
            $scope.ttlsocialinvestment += value;
            vs.pers = value;
            $scope.valu = vs.pers;
            $scope.social_chart_arr.push(vs);
            $scope.socialReturnValue += value;
            $scope.impact_fg[ky][i] = false;

            var color = getRandomColor();

            $scope.social_color.push({
              color: color
            });
            $scope.socialReturnContainer.push({
              label: vs.Outcome_Definition,
              value: value,
              color: color
            });
          });
        }
      });

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
  $scope.showInvest = showInvest;
  $scope.hight_outcome = hight_outcome;
  $scope.showDesc = showDesc;
  $scope.mileStCmnt = mileStCmnt;
  $scope.testGal = testGal;
  $scope.selectProj = selectProj;
  $scope.impact_fg = {};
  $scope.getSelReturn = getSelReturn;
  $scope.closeformula = closeformula;
  $scope.calculateSocialReturnValue = calculateSocialReturnValue;
  $scope.calculateSocialReturnItemValue = calculateSocialReturnItemValue;
  $scope.changeoutcomes = changeoutcomes;

  $scope.myDataSource = {
    chart: {
      caption: "Funding Over Time(in millions)",
      numberprefix: "$",
      rotatelabels: "0",
      theme: "fusion"
    },

    data: $scope.Funding_rasing_GraphPlotting1
  };

  $scope.socialReturnValue = calculateSocialReturnValue();

  function performMeasurableOutcomeOverride() {
    $scope.SocialReturns.forEach(function (item) {
      item.MeasurableOutcomes.forEach(function (outcome) {
        outcome.Value = item.measurable_clc.Value;
      });
    });
  }

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

  function closeformula(idx, index) {
    $scope.impact_fg[idx][index] = false;
  }

  function showformaula(idx, index) {
    $.each($scope.impact_fg[idx], function (key, dt) {
      $scope.impact_fg[idx][key] = false;
    });
    $scope.impact_fg[idx][index] = true;
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

  function showInvest() {
    $("#investModal").modal("show");
  }

  function getSelReturn() {
    $scope.SocialReturns_new = [];
    var html = "";

    $("input:checkbox[name=socialExtra]:checked").each(function () {
      var d = $scope.SocialReturns[$(this).val()];
      d.Shown_by_default = true;
      $.each(d.MeasurableOutcomes, function (k1, v1) {
        $scope.social_chart_arr.push(v1);
      });

      $.each(d.MeasurableOutcomes, function (i, vs) {
        $scope.total += vs.Value * vs.Quantified_multiplication_value;
      });
      $("#auto_height").animate(
        {
          height: "+=110"
        },
        500
      );
    });
    $scope.socialReturnContainer = [];

    $scope.ttlsocialinvestment = 0;

    var i1 = 0;
    $.each($scope.SocialReturns, function (ky, dty) {
      if (dty.Shown_by_default) {
        $scope.impact_fg[ky] = $scope.impact_fg[ky] || {};
        $.each($scope.SocialReturns[ky].MeasurableOutcomes, function (i, vs) {
          var value = calculateSocialReturnItemValue(ky, i);
          dty.pers = value;
          $scope.social_chart_arr[ky].pers = value;
          $scope.ttlsocialinvestment += parseInt(value);
          if (typeof $scope.impact_fg[ky] === "undefined") {
            $scope.impact_fg[ky][i] = false;
          }
          if (
            typeof $scope.social_color[i1] !== "undefined" &&
            typeof $scope.social_color[i1].color !== "undefined"
          ) {
            $scope.socialReturnContainer.push({
              label: vs.Outcome_Definition,
              value: value,
              color: $scope.social_color[i1].color
            });
          } else {
            var c = getRandomColor();

            $scope.social_color.push({
              color: c
            });
            $scope.socialReturnContainer.push({
              label: vs.Outcome_Definition,
              value: value,
              color: c
            });
          }
          i1 = i1 + 1;
        });

        setTimeout(function () {
          $("#investmentContainer svg").attr("height", "275");
          $("#socialReturnContainer svg").attr("height", "275");

          InitSocialReturnFusionChart(
            $scope.ttlsocialinvestment,
            $scope.socialReturnContainer
          );
        }, 1000);
        $scope.socialReturnValue = calculateSocialReturnValue();
      }
    });
    $("#investModal").modal("hide");
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

      $scope.updateSocialReturnSection();
    }
  }

  $scope.updateSocialReturnSection = function (selectedDataset) {
    if($scope.selectedDataset === selectedDataset) {
      return;
    }

    if(selectedDataset) {
      $scope.selectedDataset = selectedDataset;
    }
    
    $scope.SocialReturns = $scope.selectedDataset.SocialReturns;
    $scope.social_chart_arr = [];
    performMeasurableOutcomeOverride();
    if (!$scope.selcountry[name]) {
      $scope.multiplycm = $scope.community.ListofItemsMultiplevalue;
    }
    $scope.countryItemsList = $scope.community.ListofItems;

    $.each($scope.SocialReturns, function (ky, d) {
      if (d.Shown_by_default) {
        $.each(d.MeasurableOutcomes, function (i, vs) {
          var value = calculateSocialReturnItemValue(ky, i);
          vs.pers = value;
          $scope.social_chart_arr.push(vs);
          $scope.socialReturnValue += value;
          var c = getRandomColor();

          $scope.social_color.push({
            color: c
          });
          $scope.socialReturnContainer.push({
            label: vs.Outcome_Definition,
            value: value,
            color: c
          });
        });
      }
    });

    getSelReturn();
  }

  $scope.onYearChange = function(selectedYear) {
    if(selectedYear) {
      $scope.selectedYear = selectedYear;
      $scope.updateSocialReturnSection($scope.selectedYear.dataset[0]);
    }
  };

  function calculateSocialReturnValue() {
    var socialReturnValue = 0;

    $scope.SocialReturns.forEach(function (item, index) {
      if (item.Shown_by_default) {
        item.MeasurableOutcomes.forEach(function (outcome) {
          socialReturnValue +=
            outcome.Value * item.Value * item.measurable_clc.mul;
        });
      }
    });

    return socialReturnValue;
  }

  function calculateSocialReturnItemValue(socialIndex, outcomeIndex) {
    return (
      $scope.SocialReturns[socialIndex].MeasurableOutcomes[outcomeIndex].Value *
      $scope.SocialReturns[socialIndex].Value *
      $scope.SocialReturns[socialIndex].measurable_clc.mul
    );
  }

  function updatetotal(val, i) {
    getSelReturn();
    $scope.socialReturnValue = calculateSocialReturnValue();
  }

  function changeoutcomes(val, index) {
    $scope.socialReturnValue = calculateSocialReturnValue();
    getSelReturn();
  }

  $scope.invests = invests;

  function invests(val, key) {
    $scope.Investments[key].Value = val;

    $.each($scope.Investments, function (k, dt) {
      if (k == key) {
        if (val == "") {
          val = parseInt(0);
        }
      }
    });
    intotals();
    $.each($scope.Investments, function (k, dt) {
      $scope.Investments[k].color = $scope.invest_color[k].color;
    });
    //This function effected graph on-blur
    getinputvalue();
  }
  $scope.intotals = $scope.intotals;

  function intotals() {
    $scope.intotal = 0;
    $.each($scope.Investments, function (k, dt) {
      if (dt.Value !== "") {
        $scope.intotal += parseInt(dt.Value);
      }
    });
  }
  $scope.showInvestmentModal = showInvestmentModal;

  function showInvestmentModal() {
    $("#investmentModal").modal("show");
  }

  $scope.getinputvalue = getinputvalue;

  function getinputvalue() {
    var text = $("#text1").val();
    var value = $("#value1").val();
    if (text != "" && value != "") {
      $scope.ttlinvestment += parseInt(value);
      $scope.ttlinvestment += parseInt(value);
      var c = getRandomColor();
      $scope.invest_color.push({
        color: c
      });
      $scope.Investments.push({
        Label: text,
        Value: value,
        color: c
      });
      intotals();
      $("#text1").val("");
      $("#value1").val("");
    }
    initInvestmentFusionChart($scope.intotal, $scope.Investments);
    $("#investmentModal").modal("hide");
    setTimeout(function () {
      $("#investmentContainer svg").attr("height", "275");
      $("#socialReturnContainer svg").attr("height", "275");
    }, 300);
  }

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});
