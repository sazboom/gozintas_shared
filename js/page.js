var Page = {
  pages: ['main','groups', 'groupsb', 'tip', 'receipt', 'receiptb','settings'],

  js: {

    main: {
			init: function() {
				
				tipRate = ich.tipRate();
				$('#main .tip-rate-class').append(tipRate);
				$('#main .tip-rate-class').trigger('change');
				console.log('Updating from local settings');
				Settings.updateUISettings("main");
				console.log('Loading Main Page');
				Page.js.main.load();
				console.log('Main Page Loaded');

			},
			
		  load: function() {
				console.log('Loading....');
				//Format data entered as a string into Currency
				$("#main #total-amount-input").on("change keyup", function() {
					Gozintas.total.amount = Gozintas.formatStringToCurrency($(this).val())
				})

				
				//Format data entered as a string into Currency
				$("#main #total-tax-amount-input").on("change keyup", function() {
					Gozintas.total.taxAmount = Gozintas.formatStringToCurrency($(this).val())
				})

				//Show buttons??
				$(".tabs-top").on('click', function(){
					Gozintas.toggleMainButtons(); 
				});

				//Add a number of groups coorisponding to dropdown.  
				//NOTE: This is a distructive selection.  Might need to 
				//improve this to be more friendly
				$("#main #group-num").on('change', function(){
					numWantedGroups = parseInt($("#main #group-num").val());
					Gozintas.clearGroups()
					for(var i = 0; i < numWantedGroups; i++){
						Gozintas.addGroup();
					}
					Gozintas.splitByGroup();
					turnPage('#groups');
				});

				//Select the number of people to split the bill evenly between
				$("#main #people-num").on('change', function(){
					numOfPeople = parseInt($("#main #people-num").val());
					Gozintas.peopleInParty = numOfPeople

					turnPage('#tip');

				});


				$("#main #tip-rate").on('change', function(){
					tipRate = parseFloat($("#main #tip-rate").val());
					Gozintas.tip.base = tipRate
					Page.js.receipt.unload();
					Page.js.receiptIndividual.load();
					Page.js.receipt.load();
					turnPage('#receipt');
				});

				$("#main #group-num").on('change', function(){
					numWantedGroups = parseInt($("#main #group-num").val());
					Gozintas.clearGroups()
					for(var i = 0; i < numWantedGroups; i++){
						Gozintas.addGroup();
					}
					Gozintas.splitByGroup();
					setTimeout(function(){
						document.location = '#groups';
					},1000);
				});

				$("#main #flat-rate-tip").on('click', function(){
					Settings.tipRate === "NA" ? Gozintas.tip.base = 0.15 : Gozintas.tip.base = parseFloat(Settings.tipRate); //FIX needs to be from settings
					Page.js.receipt.unload(); 
					Page.js.receiptIndividual.load();
					Page.js.receipt.load();
					turnPage('#receipt');
				});

				$("#main #multi-part-tip").on('click', function(){
					turnPage('#tip');
				});
		
				Gozintas.toggleMainButtons();
			},
		
			unload: function(){
			}
		}, // end main

		groups: {
			init: function() {

				//Add Group Elements onto the page for each group
				$("#groups").on('pagebeforecreate', function(){
					clearGroupElements()
					for(i=1;i<=Gozintas.numOfGroups();i++){
						addGroupElement(i);
					}
				});
				
				$("#container").on("change", ".group-container .group-nickname", function(){
					groupId = parseInt($(this).attr('data-group-id'));
					group = Gozintas.groups[groupId-1];
					group.nickname = $(this).val();
				});
				$("#container").on("change", ".group-container .people-in-group", function(){
					groupId = parseInt($(this).attr('data-group-id'));
					group = Gozintas.groups[groupId-1];
					peopleInGroup = parseInt($(this).val());
					group.peopleInGroup = peopleInGroup;
				})

				// Load Food Extra value into the group from the form field
				$("#container").on('pageshow pageaftershow pageafterload keyup change','#groups .extra-popup input#drinks-deserts-etc', function(){
				  groupId = parseInt($(this).parents('.extra-popup').attr('data-group-id'));
				  group = Gozintas.groups[groupId-1];
				  group.foodTotal = Gozintas.formatStringToCurrency($(this).val())
				})	

				// Load Wine Extra value into the group from the form field
				$("#container").on('pageshow pageaftershow pageafterload keyup change','#groups .extra-popup input#wine-amount', function(){
				  groupId = parseInt($(this).parents('.extra-popup').attr('data-group-id'));
				  group = Gozintas.groups[groupId-1];
				  group.wineTotal = Gozintas.formatStringToCurrency($(this).val())
				})
				
				// Load Carryout Extra value into the group from the form field
				$("#container").on('pageshow pageaftershow pageafterload keyup change','#groups .extra-popup input#carry-out-amount', function(){
				  groupId = parseInt($(this).parents('.extra-popup').attr('data-group-id'));
				  group = Gozintas.groups[groupId-1];
				  group.carryOutTotal = Gozintas.formatStringToCurrency($(this).val())
				})

				//Gozintas.handleKeyups(3);
			},
			
			load: function() {
		  },
    
			unload: function(){
			}
		}, // end groups

		groupsb: {
			init: function() {
				//Update view 
				$("#groupsb").on('pageshow',function(){
					
					//Bill Amount
					$("#groupsb #drinks-deserts-etc").val(Gozintas.total.billAmount());
					
					//Set people in Party
					$("#groupsb #people-in-party").focusout(function() {
						Gozintas.numPeopleToSplitBillBetween = parseInt($(this).val());
					});
				});
			},
			
			load: function() {

			},
   
			unload: function(){
			}
		}, // end groupsb

	  tip: {
			init: function() {

				tipRate = ich.tipRate();
				$('#tip .tip-rate-class').append(tipRate);
				$('#tip .tax_tip_rate').append(tipRate);
				$('#tip').trigger('change');

				Page.js.tip.load();
				
			},
			
			load: function() {
        /*
        Removed by Scott so that values were always update in Gozintas after "next" was clicked
        
				$("#tip #tip-rate").on('change', function(){
					tipRate = parseFloat($("#tip #tip-rate").val());
					Gozintas.tip.base = tipRate
				});
				$("#tip #tax-tip-rate").on('change', function(){
					taxTipRate = parseFloat($("#tip #tax-tip-rate").val());
					Gozintas.tip.tax = taxTipRate
				});
				*/

				$("#tip #next-button-tip").on('click', function(){
				  taxTipRate = parseFloat($("#tip #tax-tip-rate").val());
					Gozintas.tip.tax = taxTipRate
					
					tipRate = parseFloat($("#tip #tip-rate").val());
					Gozintas.tip.base = tipRate
				  
					Page.js.receipt.unload();
					Page.js.receiptIndividual.load();
					if(Gozintas.isSplitEvenly()){
						Page.js.receiptSplitEvenly.load();
					}
					else if(Gozintas.isGroupSplit()){
						Gozintas.groups.forEach(function(group,index,array){
							Page.js.receiptGroupSplit.load(group);
						});
					}
					Page.js.receipt.load();
				  
				  turnPage('#receipt');
				});
				
			},
      
			unload: function(){
			}
		}, // end tip

		receipt: {
			init: function() {
			},
			
			load: function() {
				$('#receipt .receipt').trigger('create');
			},
      
			unload: function(){
				$('#receipt .receipt').html('');
			}
		}, // end receipt

		receiptIndividual: {
			init: function() {
			},
			
			load: function() {
				receiptHTML = ich.receiptIndividual(Gozintas.individualData())
				$('#receipt .receipt').append(receiptHTML);
			},
      
			unload: function(){
			}
		}, // end receiptIndividual
		
		receiptSplitEvenly: {
			init: function() {
			},
			
			load: function() {
				receiptHTML = ich.receiptSplitEvenly(Gozintas.individualData())
				$('#receipt .receipt').append(receiptHTML);
			},

			unload: function(){
			}
		}, // end receiptSplitEvenly

		receiptGroupSplit: {
			init: function() {
			},
			
			load: function(group) {
				receiptHTML = ich.receiptGroupSplit(group)
				$('#receipt .receipt').append(receiptHTML);
			},
      
			unload: function(){
			}
		}, //end receiptGroupSplit

		receiptb: {
			init: function() {

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
			}
		}, //end receiptb

    extras: {
			init: function() {
				$("#extras").live(
					"pagebeforeshow", function(){
						$("#extras").live('pageshow click keyup', function(){
							parentClass = "#extras";
							wineTotal = parseFloat($(parentClass+" #wine-amount").val()).toFixed(2);
							carryOut = parseFloat($(parentClass+" #carry-out-amount").val()).toFixed(2);
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
			}
		}, // end extras

    settings: {
			init: function() {
			  
        tipRate = ich.tipRate();
        $('#settings #tip-rate, #settings #tax-tip-rate, #settings #extras-tip-rate').append(tipRate);
        
        Page.js.settings.load();
			},

			load: function() {
			  $('#settings #save-settings').on('click',function(){
			    
			    var tipRate;
			    var taxTipRate;
			    var extrasTipRate;
			    
			    tipRate = $("#settings #tip-rate").val();
			    taxTipRate = $("#settings #tax-tip-rate").val();
			    extrasTipRate = $("#settings #extras-tip-rate").val();
			    
			    window.localStorage.setItem("tipRate",tipRate);
			    Settings.tipRate = tipRate;
			    
			    window.localStorage.setItem("taxTipRate",taxTipRate);
			    Settings.taxTipRate = taxTipRate;
			    
			    window.localStorage.setItem("extrasTipRate",extrasTipRate);
			    Settings.extrasTipRate = extrasTipRate;
			  });
			},
      
			unload: function(){
			}
		} // end settings
  } // end js
} //end Page

$(document).ready(function() {
	Page.pages.forEach(function(element, index, array){
		Page.js[element].init()
	});

	$('div[data-role="page"]').each(function(index){
    $(this).on('pagebeforehide',function(event,ui) {
      Settings.updateUISettings(ui.nextPage.attr('id'));
    });
	});
});

