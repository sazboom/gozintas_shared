var Page = {

	js : {
		page0: {
			init: function() {

			},

			load: function() {

			},

			unload: function(){
			},
		},


		main: {
			init: function() {
				
				//Standard load script for JS
				Gozintas.loadedPage = 'main';
				$("#main").on("pageshow", function(e,ui){
					loadPageJS(e,ui);
				});


				//Format data entered as a string into Currency
				$("#main #total_amount_input").on("change keyup", function() {
					Gozintas.total.amount = Gozintas.formatStringToCurrency($(this).val())
				})

				
				//Format data entered as a string into Currency
				$("#main #total_tax_amount_input").on("change keyup", function() {
					Gozintas.total.taxAmount = Gozintas.formatStringToCurrency($(this).val())
				})

				//Show buttons??
				$(".tabs-top").on('click', function(){
					Gozintas.showSplitTipButtons(); 
				});

				//Add a number of groups coorisponding to dropdown.  
				//NOTE: This is a distructive selection.  Might need to 
				//improve this to be more friendly
				$("#main #group_num").on('click change keyup', function(){
					numWantedGroups = parseInt($("#main #group_num").val());
					Gozintas.clearGroups()
					for(var i = 0; i < numWantedGroups; i++){
						Gozintas.addGroup();
					}
					Gozintas.splitByGroup();
					turnPage('#groups');
				});

				//Select the number of people to split the bill evenly between
				$("#main #people_num").on('click change keyup', function(){
					numOfPeople = parseInt($("#main #people_num").val());
					Gozintas.numPeopleToSplitBillBetween = numOfPeople

					turnPage('#receipt');

				});


				$("#main #group_num").on('click change keyup', function(){
					numWantedGroups = parseInt($("#main #group_num").val());
					Gozintas.clearGroups()
					for(var i = 0; i < numWantedGroups; i++){
						Gozintas.addGroup();
					}
					Gozintas.splitByGroup();
					setTimeout(function(){
						document.location = '#groups';
					},1000);
				});

				$("#main #group_num").on('click change keyup', function(){
					numWantedGroups = parseInt($("#main #group_num").val());
					Gozintas.clearGroups()
					for(var i = 0; i < numWantedGroups; i++){
						Gozintas.addGroup();
					}
					Gozintas.splitByGroup();
					setTimeout(function(){
						document.location = '#groups';
					},1000);
				});




			},
			load: function() {

			},

			unload: function(){
			},
		},

		groups: {
			init: function() {

				//Standard Page loader for JS
				$("#groups").on("pageshow", function(e,ui){
					loadPageJS(e,ui);
				});

				//Add Group Elements onto the page for each group
				$("#groups").on('pagebeforeshow', function(){
					clearGroupElements()
					for(i=1;i<=Gozintas.numOfGroups();i++){
						addGroupElement(i);
					}
				});

				// Show or hide Next buttons??
				$("#groups").live("pageshow keyup", function(){
					// disable = false;
					// total = 0;

					// $.each(Gozintas.groups, function(index,group){
					// 	console.log("#1"+group.carryOutTotal)
					// 	console.log("#2"+group.wineTotal)
					// 	console.log("#3"+group.foodTotal)
					// 	total = total + group.carryOutTotal + group.wineTotal + group.foodTotal
					// 	if( group.peopleInParty == 0 || isNaN(group.peopleInParty) || group.foodTotal < 0 || group.wineTotal < 0 || group.carryOutTotal < 0 ){
					// 		disable = true
					// 	}
					// })
					// if( +total > +Gozintas.total.amount){
					// 	disable = true;
					// }
					// if(disable == true){
					// 	$(".buttons").children().addClass('ui-disabled');
					// }else{
					// 	$(".buttons").children().removeClass('ui-disabled');
					// }
				});

				// Load Food Extra value into the group from the form field
				$("#container").on('pageshow pageaftershow pageafterload keyup change','#groups .extra-popup input#drinks_deserts_etc', function(){
				  groupId = parseInt($(this).parents('.extra-popup').attr('data-group-id'));
				  group = Gozintas.groups[groupId-1];
				  group.foodTotal = Gozintas.formatStringToCurrency($(this).val())
				})	

				// Load Wine Extra value into the group from the form field
				$("#container").on('pageshow pageaftershow pageafterload keyup change','#groups .extra-popup input#wine_amount', function(){
				  groupId = parseInt($(this).parents('.extra-popup').attr('data-group-id'));
				  group = Gozintas.groups[groupId-1];
				  group.wineTotal = Gozintas.formatStringToCurrency($(this).val())
				})
				
				// Load Carryout Extra value into the group from the form field
				$("#container").on('pageshow pageaftershow pageafterload keyup change','#groups .extra-popup input#carry_out_amount', function(){
				  groupId = parseInt($(this).parents('.extra-popup').attr('data-group-id'));
				  group = Gozintas.groups[groupId-1];
				  group.carryOutTotal = Gozintas.formatStringToCurrency($(this).val())
				})

				//Gozintas.handleKeyups(3);
			},
			load: function() {
		},

			unload: function(){
			},
		},



		groupsb: {
			init: function() {
				$("#groupsb").on("pageshow", function(e,ui){
					loadPageJS(e,ui);
				});

				//Update view 
				$("#groupsb").on('pageshow',function(){
					
					//Bill Amount
					$("#groupsb #drinks_deserts_etc").val(Gozintas.total.billAmount());
					
					//Set people in Party
					$("#groupsb #people_in_party").focusout(function() {
						Gozintas.numPeopleToSplitBillBetween = parseInt($(this).val());
					});
				});

				//Not sure why we are doing calculations here
				$("#groupsb").on('pageshow click keyup',function(){
						// parentClass = "#groupsb";
						// peopleInParty = parseFloat($(parentClass+" #people_in_party").val())
						// if(isNaN(peopleInParty)){
						// 	peopleInParty = 0
						// }
						// if(isNaN(peopleInParty)){
						// 	peopleInParty = 0
						// }
						// groups[0].peopleInParty = peopleInParty
						// groups[0].foodTotal = +Gozintas.total.amount - +Gozintas.total.taxAmount
						// newFoodTotal = Gozintas.total.amount-Gozintas.total.taxAmount-groups[0].wineTotal-groups[0].carryOutTotal -groups[0].reductionTotal;
						// groups[0].foodTotal = newFoodTotal
						// 
						// /*if(groups[0].foodTotal > 0){
						// 	groups[0].extras =true;
						// }else{
						// 	groups[0].extras = false
						// }*/

						// console.log(newFoodTotal)
						// $("#groupsb #drinks_deserts_etc").val(+newFoodTotal.toFixed(2));
						// if( +newFoodTotal.toFixed(2) < 0 || isNaN(peopleInParty) || (peopleInParty <= 0) ){
						// 		$(".buttons").children().addClass('ui-disabled');
						// }else{
						// 		$(".buttons").children().removeClass('ui-disabled');
						// }
					
				})

			},
			load: function() {

			},

			unload: function(){
			},
		},

		page3: {
			init: function() {
				$("#page3").on("pageshow", function(e,ui){
					loadPageJS(e,ui);
				});

				$("#page3").live(
					"pagebeforeshow",
					function(){
						//Gozintas.showPageFourPercentages();
						//Gozintas.showPageFourButton();
						$("#page3 #tip_rate").focusout(function() {
							Gozintas.tip.general = parseFloat($(this).val());
						});
						$("#page3 #tax_tip_rate").focusout(function() {
							Gozintas.tip.tax = parseFloat($(this).val());
						});
						$("#page3 #wine_tip_rate").focusout(function() {
							Gozintas.tip.wine = parseFloat($(this).val());
						});
						$("#page3 #carry_tip_rate").focusout(function() {
							Gozintas.tip.carryout = parseFloat($(this).val());
						});
						$("#page3 #tax_tip_rate").focusout(function() {
							Gozintas.tip.tax = parseFloat($(this).val());
						});
					}
				);


			},
			load: function() {

			},

			unload: function(){
			},
		},

		receipt: {
			init: function() {
				$("#receipt").on("pageshow", function(e,ui){
					loadPageJS(e,ui);
				});

				$("#receipt").live(
					"pagebeforeshow",
					function () {
						Gozintas.calculatePeopleInParty()
						Gozintas.calculateTotalWithoutReduction()
						Gozintas.individual.total = (+Gozintas.total.withoutReduction/Gozintas.peopleInParty).toFixed(2)
						Gozintas.individual.tax = (+Gozintas.total.taxAmount/Gozintas.peopleInParty).toFixed(2)
						Gozintas.calculateTaxAndTotal()

						for(var i=0; i<groups.length; i++){
							five_foodTotal = (+groups[i].total- +groups[i].taxTotal - +groups[i].foodTotal - groups[i].carryOutTotal - groups[i].wineTotal).toFixed(2)
							five_tipTotal = ((+five_foodTotal)*Gozintas.tip.general + +groups[i].foodTotal*Gozintas.tip.general + +groups[i].carryOutTotal*Gozintas.tip.carryout + +groups[i].wineTotal*Gozintas.tip.wine + +groups[i].taxTotal*Gozintas.tip.tax).toFixed(2)
							five_finalTotal = +groups[i].total + +five_tipTotal;
							$("#receipt #group-"+(i+1)+" #individuals_in_party").val(groups[i].peopleInParty)
							$("#receipt #group-"+(i+1)+" #total").val(five_finalTotal)
							$("#receipt #group-"+(i+1)+" .food_total label").text("Bill Total ("+(Gozintas.tip.general*100).toFixed()+"% tip rate)")
							$("#receipt #group-"+(i+1)+" #food_total").val(+five_foodTotal)
							
						   $("#receipt #group-"+(i+1)+" #drinks_deserts_amount_container label").text("Drinks/Deserts/Etc ("+(Gozintas.tip.general*100).toFixed()+"% tip rate)")

						   $("#receipt #group-"+(i+1)+" #wine_amount_container label").text("Wine ("+(Gozintas.tip.wine*100).toFixed()+"% tip rate)")

						   $("#receipt #group-"+(i+1)+" #carry_out_amount_container label").text("Carry-out for group ("+(Gozintas.tip.carryout*100).toFixed()+"% tip rate)")
							$("#receipt #group-"+(i+1)+" #total_individual").val((+five_finalTotal/+groups[i].peopleInParty).toFixed(2))
							$("#receipt #group-"+(i+1)+" .tax_total label").text("Tax for group ("+(Gozintas.tip.tax*100).toFixed()+"% tip rate)")
							$("#receipt #group-"+(i+1)+" #tax_total").val(+groups[i].taxTotal)
							
							$("#receipt #group-"+(i+1)+" #tip_total").val(five_tipTotal)
							$("#receipt #group-"+(i+1)+" #tip_individual").val((five_tipTotal/groups[i].peopleInParty).toFixed(2))
							Gozintas.showPageFiveGroupInputs(i);
						}
					}
				);

			},
			load: function() {

			},

			unload: function(){
			},
		},


		receiptb: {
			init: function() {
				$("#receiptb").on("pageshow", function(e,ui){
					loadPageJS(e,ui);
				});

				$("#receiptb").live(
					"pagebeforeshow",
					function () {
						if(Gozintas.billPath == "determine-tip" || (Gozintas.billPath == "split-tip" && Gozintas.splitBy == "individual")){
							groups[0].foodTotal = +Gozintas.total.amount - +Gozintas.total.taxAmount
						}

						Gozintas.showPageFiveBInputs();
					}
				);
			},
			load: function() {

			},

			unload: function(){
			},
		},

        extras: {
			init: function() {
				$("#extras").on("pageshow", function(e,ui){
					loadPageJS(e,ui);
				});

				$("#extras").live(
					"pagebeforeshow", function(){
						$("#extras").live('pageshow click keyup', function(){
							parentClass = "#extras";
							wineTotal = parseFloat($(parentClass+" #wine_amount").val()).toFixed(2);
							carryOut = parseFloat($(parentClass+" #carry_out_amount").val()).toFixed(2);
							if(isNaN(carryOut)){
								carryOut = 0;
							}
							if(isNaN(wineTotal)){
								wineTotal = 0;
							}
							groups[0].wineTotal = wineTotal;
							groups[0].carryOutTotal = carryOut;
							if(groups[0].wineTotal > 0){
								groups[0].wine = true;
							}else{
								groups[0].wine = false;
							}
							if(groups[0].carryOutTotal > 0){
								groups[0].carryout = true;
							}else{
								groups[0].carryout = false;
							}

						});

					}
				);

			},
			load: function() {

			},

			unload: function(){
			},
		},

        settings: {
			init: function() {
				$("#settings").on("pageshow", function(e,ui){
					loadPageJS(e,ui);
				});

			},

			load: function() {
			},
			unload: function(){
			},
		}

	}

}



