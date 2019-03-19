var app = angular.module('MainApp', ["ng-fusioncharts"]);

app.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);

        for (var i = 0; i < total; i++) {
            input.push(i);
        }

        return input;
    };
});

app.controller('MainCtrl', function ($scope, $http) {
    $scope.mapclickfun = mapclickfun;
    $scope.output = [];
    $scope.social_chart_arr = [];
    $scope.selcountry = {};
    $scope.search_org = search_org;
    $scope.search_milestone = search_milestone;
    $scope.updatecountryinfo = updatecountryinfo;
    $scope.dopopover = dopopover;
    $scope.outcome = [];
    $scope.obj1 = {};
    $scope.obj2 = {};
    $scope.outcomehighlight = outcomehighlight;
    $scope.showformaula = showformaula;
    $scope.Funding_rasing_GraphPlotting1 = [];
    $scope.Investment_Bottom_Block = [];
    $scope.Social_Returns_Bottom_Block = [];
    $scope.impact_fg = {};
    $scope.Measurable_Outcomes1 = [];
    $scope.investmentChart = [];
    $scope.socialinvst_container = [];
    $scope.countrylist = [];
    $scope.countrylist_new = [];
    $scope.CountryName = [];
    $scope.country_ListofItems = [];
    $scope.ttlinvestment = 0;
    $scope.multiplycm = 1;
    $scope.ttlsocialinvestment = 0;

    $http.get("inpact-network-ui-json.json")
        .then(function (response) {
            $scope.projectData = response.data;

            $scope.ProjSec = response.data.ProjectSection;

            $scope.overview = response.data.Overview;

            $scope.gallery = response.data.Overview.Gallery;

            $scope.time_line = response.data.Overview.TimelineInfo;
            $scope.TimelineInsight = response.data.Overview.TimelineInsight;

            $scope.fundInfo = response.data.Overview.Funding_Information;

            $scope.partners = response.data.Overview.Partnership_Organizations;
            $scope.partnerInsgt = response.data.Overview.Partnership_Organizations_Insight;

            $scope.outcomeInfo = response.data.Overview.Outputs_Outcomes_Info.Listing;
            $scope.outcomeInfoSupportedProjects = $scope.outcomeInfo.filter(function (element) {
                return element.isSupported;
            });
            $scope.leftpr = $scope.outcomeInfo.length - $scope.outcomeInfoSupportedProjects.length;

            $scope.comments = response.data.Overview.Insight;

            ///Second Page

            $scope.secpage = response.data.Theory_of_Change;

            $scope.th_summary = $scope.secpage.Summary_Section.Summary;

            $scope.th_insight = $scope.secpage.Summary_Section.Insight;

            $scope.blockIns = $scope.secpage.Summary_Section_Block.Insight;

            $scope.inputs = $scope.secpage.Summary_Section_Block.Input.Points;

            $scope.activites = $scope.secpage.Summary_Section_Block.Activities.Points;

            $scope.Intoutputs = $scope.secpage.Summary_Section_Block.IntendentOutput.Points;

            $scope.Intoutcomes = $scope.secpage.Summary_Section_Block.IntendentOutcomes.Points;
            $scope.following = following;
            $scope.follow = 'Follow';
            $scope.is_following = false;

            function following() {
                $scope.follow = 'Following';

                $scope.ProjSec.TotalFollower = $scope.ProjSec.TotalFollower + '';
                if ($scope.ProjSec.TotalFollower.indexOf(',') != -1) {
                    var t = parseInt($scope.ProjSec.TotalFollower.replace(',', ''));
                } else {
                    var t = $scope.ProjSec.TotalFollower;
                }
                t = parseInt(t);
                if (!$scope.is_following) {
                    $scope.is_following = true;
                    t = t + 1 + '';


                    $scope.ProjSec.TotalFollower = t.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");


                } else {
                    t = t - 1 + '';
                    $scope.follow = 'Follow';
                    $scope.is_following = false;
                    $scope.ProjSec.TotalFollower = t.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                }
                //$scope.ProjSec.TotalFollower = t.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            }
            $scope.keyAss = $scope.secpage.Key_Assumptions;
            $scope.solutions = $scope.secpage.Solutions;

            $scope.problms = $scope.secpage.Problem_Statements;
            selectProject(0);


            ///New Code For project detail circle section         

            $scope.outputs = response.data.Overview.Outputs_Outcomes_Info.Project_Output_Section;
            $scope.outputs_tag_ = {};
            $scope.outcomes_tag_ = {};
            $.each($scope.outputs, function (kry, dt) {

                $scope.outputs_tag_[kry] = {};
                $.each(dt.Tags, function (ky, t) {
                    $scope.outputs_tag_[kry][ky] = false;
                });
            });
            $scope.outcomes = response.data.Overview.Outputs_Outcomes_Info.Project_Outcomes_Section;
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
            $scope.teams_insight = $scope.projectData.People_Partnership.TeamMember_Insight;

            $scope.list_org = $scope.projectData.People_Partnership.Listing;
            $scope.part_insight = $scope.projectData.People_Partnership.People_Partnership_Insight;

            $scope.orgSlider = orgSlidersplit($scope.list_org, 3);

            showDesc($scope.list_org[0], 0);

            $.each($scope.outputs, function (key, dt) {
                $scope.obj2[dt.Project_Output_Primary_Key] = false;
            });


            //Funding and Risk  
            $scope.fundSec = $scope.projectData.Fund_and_Risk.Funding_Round_Section;
            $scope.fund_ins = $scope.projectData.Fund_and_Risk.Fund_and_Risk_Insight;

            $scope.fundSecAmnt = $scope.projectData.Fund_and_Risk.Funding_Amount_Section;

            $scope.fundSourc = $scope.projectData.Fund_and_Risk.Source_of_Funding.Listing;
            $scope.notesInv = $scope.projectData.Fund_and_Risk.Notes_for_Investor;
            $scope.notes_ins = $scope.projectData.Fund_and_Risk.Notes_for_Investor_Insight;

            $scope.fundgraph = $scope.projectData.Fund_and_Risk.Funding_rasing_over_the_period_of_time;

            $scope.sustain = $scope.projectData.Fund_and_Risk.Sustainability;
            $scope.social_color = [];
            $scope.financialxls = $scope.projectData.Fund_and_Risk.Financial_Management.Listing;
            $scope.financialInsght = $scope.projectData.Fund_and_Risk.Financial_Management.Financial_Insight;
            $scope.circle_title = $scope.projectData.Fund_and_Risk.Financial_Management_Chart.CenterCircle;
            $scope.circle_tIcon = $scope.projectData.Fund_and_Risk.Financial_Management_Chart.CenterCircleIcon;
            $scope.circle_tDesc = $scope.projectData.Fund_and_Risk.Financial_Management_Chart.CenterCirclePopoverText;
            $scope.FinancialChartInsight = $scope.projectData.Fund_and_Risk.Financial_Management_Chart.FinancialChartInsight;

            $scope.circle_Listing = $scope.projectData.Fund_and_Risk.Financial_Management_Chart.Listing;
            dopopover($scope.circle_Listing[0].CirclePopoverText, $scope.circle_Listing[0].CircleIcon, $scope.circle_Listing[0].CircleText);

            ///Chart code 
            $scope.countryChart = response.data.Communities_And_Impact.List_of_Communities[0].Community.Community_Basic_Info[0].ListofItems;
            $scope.measure_clc = response.data.Communities_And_Impact.List_of_Communities[0].Community.Community_Basic_Info[0].measurable_clc;
            $scope.Investment = response.data.Communities_And_Impact.Investment_Bottom_Block;
            $.each($scope.Investment.Listing, function (k, dt) {
                $scope.intotal = $scope.intotal + parseInt(dt.Value);
            });
            $scope.CountryName = response.data.Communities_And_Impact.List_of_Communities[0].Community.Community_Basic_Info[0].CountryName;
            $scope.CommunityName = response.data.Communities_And_Impact.List_of_Communities[0].Community.Community_Basic_Info[0].CommunityName;
            
            $.each(response.data.Communities_And_Impact.List_of_Communities, function (ky, dty) {

                $scope.selcountry[dty.Community.Community_Basic_Info[0].CountryName] = '';
                $scope.selcountry[dty.Community.Community_Basic_Info[0].CountryName] = false;


            });

            $scope.invstChart = response.data.Communities_And_Impact.Investment_Bottom_Block.Listing;
            $scope.invest_color = [];
            $.each($scope.invstChart, function (ky, dty) {
                $scope.ttlinvestment += parseInt(dty.Value);
                var c = getRandomColor();
                $scope.invest_color.push({
                    'color': c
                });
                $scope.investmentChart.push({
                    label: dty.Label,
                    value: dty.Value,
                    color: c
                });

            });

            $scope.socialinvestChart = response.data.Communities_And_Impact.Social_Returns_Bottom_Block;
            $scope.socialinvestChartProgressbar = response.data.Communities_And_Impact.Social_Returns_Bottom_Block[0].Measurable_Outcomes.Listing;

            ///Uvaish
            $scope.Community_Insights = response.data.Communities_And_Impact.Community_Insights;

            $scope.Impact_Reports = response.data.Communities_And_Impact.Impact_Reports.Listing;
            //Investment_Bottom_Block
            $scope.Investment_Bottom_Block = response.data.Communities_And_Impact.Investment_Bottom_Block.Listing;

            $scope.List_of_Communities = response.data.Communities_And_Impact.List_of_Communities;
            $.each($scope.List_of_Communities, function (key, dty) {
                $scope.Country_name = $scope.List_of_Communities[key].Community.Community_Basic_Info[0].CountryName;
                $scope.Latitude = $scope.List_of_Communities[key].Community.Community_Basic_Info[0].Latitude;
                $scope.Longitude = $scope.List_of_Communities[key].Community.Community_Basic_Info[0].Longitude;
                $scope.Country_value = $scope.List_of_Communities[key].Community.Community_Basic_Info[0].Countryvalue;
                $scope.countrylist.push({
                    id: $scope.Country_name,
                    value: $scope.Country_value
                });
                $scope.countrylist_new.push({
                    latLng: [$scope.Latitude, $scope.Longitude],
                    name: $scope.Country_name
                });

            });
            $scope.mesure = {};
            mapclickfun(0);

            //Social Returns Bottom Block
            $scope.Social_Returns_Bottom_Block = response.data.Communities_And_Impact.Social_Returns_Bottom_Block;
            $scope.dototal1 = 0;

            $.each($scope.Social_Returns_Bottom_Block, function (ky, dty) {

                if (dty.Shown_by_default == "TRUE") {

                    $scope.mesure[ky] = {};

                    $scope.impact_fg[ky] = {};
                    $.each($scope.Social_Returns_Bottom_Block[ky].Measurable_Outcomes.Listing, function (i, vs) {
                        // $scope.valu =  $scope.Social_Returns_Bottom_Block[ky].Measurable_Outcomes.Listing[i].Value*$scope.Social_Returns_Bottom_Block[ky].Value*60;

                        $scope.ttlsocialinvestment += parseInt($scope.valu);
                        $scope.impact_fg[ky][i] = false;

                        $scope.Social_Returns_Bottom_Block[ky].Measurable_Outcomes.Listing[i].Value = eval($scope.measure_clc[ky].Value);

                        vs.pers = $scope.Social_Returns_Bottom_Block[ky].Measurable_Outcomes.Listing[i].Value * $scope.Social_Returns_Bottom_Block[ky].Value * $scope.measure_clc[ky].mul;
                        $scope.social_chart_arr.push(vs);
                        $scope.dototal1 += $scope.Social_Returns_Bottom_Block[ky].Measurable_Outcomes.Listing[i].Value * $scope.Social_Returns_Bottom_Block[ky].Value * $scope.measure_clc[ky].mul;

                        $scope.valu = vs.pers;
                        var c = getRandomColor();

                        $scope.social_color.push({
                            'color': c
                        });
                        $scope.socialinvst_container.push({
                            label: vs.Outcome_Definition,
                            value: $scope.valu,
                            color: c

                        });
                    });
                }

            });
            $scope.social_chart = response.data.Communities_And_Impact.Social_Returns_Bottom_Block;
            $.each($scope.Social_Returns_Bottom_Block, function (k, v) {
                if (v.Shown_by_default == 'TRUE') {
                    $.each(v.Measurable_Outcomes.Listing, function (k1, v1) {

                        v1.pers = (v1.Value * v.Value) * $scope.measure_clc[k1].mul;
                    })

                }
            });

            ///To date calculate day
            $scope.timeDiffInMinutes = function (date) {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd
                }
                if (mm < 10) {
                    mm = '0' + mm
                }
                today = yyyy + '/' + mm + '/' + dd;
                $scope.today = today;
                var date2 = new Date(today);
                var date1 = new Date(date);
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                $scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
                return $scope.dayDifference;
            }
            $scope.dateMonth = function (date) {

                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const d = new Date(date);

                return d.getDate() + ' ' + months[d.getMonth()];
            }

            $scope.Funding_rasing_GraphPlotting = $scope.projectData.Fund_and_Risk.Funding_rasing_over_the_period_of_time.GraphPlotting;
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
        $scope.country_ListofItems = $scope.List_of_Communities[index].Community.Community_Basic_Info[0].ListofItems;
        $scope.CountryName = $scope.List_of_Communities[index].Community.Community_Basic_Info[0].CountryName;
        $scope.CommunityName = $scope.List_of_Communities[index].Community.Community_Basic_Info[0].CommunityName;
        $scope.CountryIcons = $scope.List_of_Communities[index].Community.Community_Basic_Info[0].CountryIcons;
        $scope.selcountry[$scope.CountryName] = true;

    }

    function showInvest() {
        $("#investModal").modal("show");
    }

    function getSelReturn() {

        $scope.Social_Returns_Bottom_Block_new = [];
        var html = ''

        $("input:checkbox[name=socialExtra]:checked").each(function () {
            var d = $scope.Social_Returns_Bottom_Block[$(this).val()];
            d.Shown_by_default = "TRUE";
            $.each(d.Measurable_Outcomes.Listing, function (k1, v1) {
                $scope.social_chart_arr.push(v1)
            });
            // $scope.Social_Returns_Bottom_Block.push(d);

            $.each(d.Measurable_Outcomes.Listing, function (i, vs) {
                $scope.total += (vs.Value * vs.Quantified_multiplication_value);
            });
            $('#auto_height').animate({
                height: '+=110'
            }, 500);

        });
        $scope.socialinvst_container = [];
        //$scope.social_chart_arr=[];
        $scope.socialinvestChartProgressbar = [];

        $scope.ttlsocialinvestment = 0;

        var i1 = 0;
        $.each($scope.Social_Returns_Bottom_Block, function (ky, dty) {

            if (dty.Shown_by_default == "TRUE") {
                if (typeof $scope.impact_fg[ky] === 'undefined') {
                    $scope.impact_fg[ky] = {};
                }
                $.each($scope.Social_Returns_Bottom_Block[ky].Measurable_Outcomes.Listing, function (i, vs) {
                    //$scope.valu = (vs.Value * vs.Quantified_multiplication_value);
                    $scope.valu = $scope.Social_Returns_Bottom_Block[ky].Measurable_Outcomes.Listing[i].Value * $scope.Social_Returns_Bottom_Block[ky].Value * $scope.measure_clc[ky].mul;
                    dty.pers = $scope.valu;
                    $scope.social_chart_arr[ky].pers = $scope.valu;
                    $scope.ttlsocialinvestment += parseInt($scope.valu);
                    if (typeof $scope.impact_fg[ky] === 'undefined') {
                        $scope.impact_fg[ky][i] = false;
                    }
                    if (typeof $scope.social_color[i1] !== 'undefined' && typeof $scope.social_color[i1].color !== 'undefined') {



                        $scope.socialinvst_container.push({
                            label: vs.Outcome_Definition,
                            value: $scope.valu,
                            color: $scope.social_color[i1].color

                        });

                    } else {
                        var c = getRandomColor();

                        $scope.social_color.push({
                            'color': c
                        });
                        $scope.socialinvst_container.push({
                            label: vs.Outcome_Definition,
                            value: $scope.valu,
                            color: c

                        });
                    }
                    $scope.socialinvestChartProgressbar.push({
                        Outcome_Definition: vs.Outcome_Definition,
                        Value: $scope.valu
                    });
                    i1 = i1 + 1;
                });

                setTimeout(function () {
                    $('#investment_container svg').attr('height', '275');
                    $('#socialinvst_container svg').attr('height', '275');

                    socialinvstFusionCharts($scope.ttlsocialinvestment, $scope.socialinvst_container);
                }, 1000);
                dototal();
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

                t['id'] = key;

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

    // Org data

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
        $('.box1').css("border", "1px solid #07c776");
        $('.box1').removeClass("boxselect");
        /*$('#item_'+key1).css("border","1px solid red");*/
        $('#item_' + key1).addClass("boxselect");
    }
    //get comment
    function mileStCmnt(cmnt) {
        $('.maile_stone_moal').modal('show');

        $scope.milst_cmnt = cmnt;
    }
    $scope.mileStTask = mileStTask;

    function mileStTask(task) {
        $('.milestone_task').modal('show');

        $scope.milst_task = task;
    }
    $scope.mileStAttach = mileStAttach;

    function mileStAttach(attach) {
        $('.milestone_attach').modal('show');

        $scope.milst_attach = attach;
    }

    function testGal(url) {
        $('#image-gallery').modal('show');
        $('#image-gallery-image').attr('src', url);
    }

    function search_org(val) {
        var d = orgSlidersplit($scope.list_org, 3);
        $scope.orgSlider = [];
        var f = [];
        if (val != '') {

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
        var d = $scope.milestone1
        $scope.milestone = [];
        var f = [];
        if (val != '') {
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

    $scope.myDataSource = {

        "chart": {

            "caption": "Funding Over Time(in millions)",

            "numberprefix": "$",

            "rotatelabels": "0",

            "theme": "fusion"
        },

        "data": $scope.Funding_rasing_GraphPlotting1

    };

    function updatecountryinfo(name) {
        $scope.social_chart_arr = [];
        $.each($scope.List_of_Communities, function (key, dt) {
            if (dt.Community.Community_Basic_Info[0].CountryName == name) {
                $scope.country_ListofItems = [];
                $scope.CountryName = name;
                $scope.CommunityName = dt.Community.Community_Basic_Info[0].CommunityName;
                $scope.CountryIcons = dt.Community.Community_Basic_Info[0].CountryIcons
                $scope.measure_clc = dt.Community.Community_Basic_Info[0].measurable_clc
                if (!$scope.selcountry[name]) {
                    $scope.multiplycm = dt.Community.Community_Basic_Info[0].ListofItemsMultiplevalue;
                }
                $scope.country_ListofItems = dt.Community.Community_Basic_Info[0].ListofItems;
                $.each($scope.Social_Returns_Bottom_Block, function (ky, d) {
                    if (d.Shown_by_default == 'TRUE') {
                        $.each(d.Measurable_Outcomes.Listing, function (i, vs) {

                            $scope.Social_Returns_Bottom_Block[ky].Measurable_Outcomes.Listing[i].Value = eval($scope.measure_clc[ky].Value);

                            vs.pers = $scope.Social_Returns_Bottom_Block[ky].Measurable_Outcomes.Listing[i].Value * $scope.Social_Returns_Bottom_Block[ky].Value * $scope.measure_clc[ky].mul;
                            $scope.social_chart_arr.push(vs);
                            $scope.dototal1 += $scope.Social_Returns_Bottom_Block[ky].Measurable_Outcomes.Listing[i].Value * $scope.Social_Returns_Bottom_Block[ky].Value * $scope.measure_clc[ky].mul;
                            $scope.valu = vs.pers;
                            var c = getRandomColor();

                            $scope.social_color.push({
                                'color': c
                            });
                            $scope.socialinvst_container.push({
                                label: vs.Outcome_Definition,
                                value: $scope.valu,
                                color: c

                            });
                        });
                    }
                });

            }
        });
        getSelReturn()
    }


    $scope.dototal1 = 0;
    $scope.dototal = dototal;

    function dototal() {
        $scope.dototal1 = 0;
        $.each($scope.Social_Returns_Bottom_Block, function (ke, d) {
            if (d.Shown_by_default == 'TRUE') {
                $.each(d.Measurable_Outcomes.Listing, function (key, dt1) {
                    $scope.dototal1 += ($scope.Social_Returns_Bottom_Block[ke].Measurable_Outcomes.Listing[key].Value * $scope.Social_Returns_Bottom_Block[ke].Value) * $scope.measure_clc[ke].mul;
                });
            }
        });
    }

    function updatetotal(val, i) {
        getSelReturn();
        dototal();
    }
    dototal();
    $scope.changeoutcomes = changeoutcomes;

    function changeoutcomes(val, index) {

        $.each($scope.Social_Returns_Bottom_Block, function (ke, d) {
            if (d.Shown_by_default == 'TRUE') {
                $.each(d.Measurable_Outcomes.Listing, function (key, dt1) {
                    //$scope.Social_Returns_Bottom_Block[index].Measurable_Outcomes.Listing[key].Value = val*//;
                });
            }
        });
        dototal();
        getSelReturn();
    }

    $scope.invests = invests;

    function invests(val, key) {


        $scope.Investment.Listing[key].Value = val;

        $.each($scope.Investment.Listing, function (k, dt) {

            if (k == key) {

                if (val == '') {
                    val = parseInt(0);
                }
            }
        });
        intotals();
        $.each($scope.Investment.Listing, function (k, dt) {

            $scope.Investment.Listing[k].color = $scope.invest_color[k].color;
        });
        //This function effected graph on-blur
        getinputvalue();
    }
    $scope.intotals = $scope.intotals;

    function intotals() {
        $scope.intotal = 0;
        $.each($scope.Investment.Listing, function (k, dt) {
            if (dt.Value !== '') {
                $scope.intotal += parseInt(dt.Value);
            }
        });
    }
    $scope.abc = abc;

    function abc() {
        $("#investmentModal").modal("show");
    }
    // $scope.tooltips = tooltips;    
    // function tooltips(val) {
    //   $('#close').html('<div class="alert"  style="background-color: #ececec;width: 136px;min-height: 70px;border-radius: 0px;border: 1px solid #ececec;    padding: 5px 10px 0px 0px; display: block;"><a href="#" data-dismiss="alert" aria-label="close" class="close">×</a><strong><span id="tooltips" style="padding: 18px 0px 0px 11px;">'+val+'</span></strong></div>');
    //   $('.ale rt').css('display','block');
    //     }
    $scope.getinputvalue = getinputvalue;

    function getinputvalue() {
        var text = $('#text1').val();
        var value = $('#value1').val();
        if (text != '' && value != '') {
            $scope.ttlinvestment += parseInt(value);
            $scope.ttlinvestment += parseInt(value);
            var c = getRandomColor();
            $scope.invest_color.push({
                'color': c
            });
            $scope.Investment.Listing.push({
                Label: text,
                Value: value,
                color: c
            });
            intotals();
            $('#text1').val('');
            $('#value1').val('');
        }
        aa($scope.intotal, $scope.Investment.Listing);
        $("#investmentModal").modal("hide");
        setTimeout(function () {
            $('#investment_container svg').attr('height', '275');
            $('#socialinvst_container svg').attr('height', '275');
        }, 300);
    }


    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});