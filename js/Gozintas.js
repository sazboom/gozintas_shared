function Group () {
    this.wine = false
    this.reductions = false
    this.extras = false
    this.carryout = false
    this.nickname = ''
    this.peopleInGroup = 0
    this.foodTotal = 0
    this.wineTotal = 0
    this.carryOutTotal = 0
    this.reductionTotal = 0
    this.tipTotal = 0
    this.total = 0
    this.taxTotal = 0
}

var groups = [new Group()]

var Gozintas = {
	groups : [],
	numPeopleToSplitBillBetween: 0,
	billPath: 'split-bill',
	peopleInParty : 1,
	simpleTipRate : 0,
	individualData: function(){
		return {
			billAmount : this.formatFloatIntoCurrency(this.total.billAmount()),
			taxAmount : this.formatFloatIntoCurrency(this.total.taxAmount),
			billTotal : this.formatFloatIntoCurrency(this.total.amount),
			totalTip : this.formatFloatIntoCurrency(this.calculateTip()),
			baseTip : this.formatFloatIntoCurrency(this.calculateBaseTip()),
			taxTip : this.formatFloatIntoCurrency(this.calculateTaxTip()),
			baseTipRate: this.formatDecmialToPercent(this.tip.base),
			taxTipeRate: this.formatDecmialToPercent(this.tip.tax),
			totalToPay: this.formatFloatIntoCurrency(this.calculateTotalToPay()),
			peopleInParty: this.calculateTotalPeople(),
			totalTipSplitEvenly: this.formatFloatIntoCurrency(this.calculateTotalTipSplitEvenly()),
			totalToPaySplitEvenly: this.formatFloatIntoCurrency(this.calculateTotalToPaySplitEvenly()),
		}
	},

	billModifier : { /* If any of the groups have wine, reductions, or extras, these will be set to true. If none of them have wine, reductions, or extras, these will be set to false. Also defined on a per group basis above in the groups variable*/
		wine : false,
		reductions : false,
		extras : false
	},
	total : {       /* Used to store the tax and amount from page two, and calculate the "reduced" price to divide by the group, taking into account reductions */
		withoutReduction : 0,
		taxAmount : 0,
		amount : 0,
		billAmount: function(){
			return (this.amount - this.taxAmount)
		}
	},
	individual : {  /* Defines the amount per individual that should be paid in a party*/
		total : 0.00, /*total amount per individual*/
		tax : 0.00,   /*tax amount per individual*/
		tip : 0.00    /*tip amount per individual*/
	},
	tip : {         /* Defines the separate tip rates */
		base : 0.15,  /*percent, used for food tip and drink/desert/etc tip*/
		wine : 0,     /*percent, used for wine tip*/
		carryout : 0, /*percent, used for carryout tip*/
		tax : 0.15       /*percent, used for tax tip*/
	},


//Calculations
//
//
	calculateTotalPeople: function(){
		if(this.groups == []){
			return this.peopleInParty
		}
		else
		{
			people = 0;
			this.groups.forEach(function(elem, index, array){
				people += elem.peopleInGroup;
			});
			return people
		}
	},
	calculateBaseTip: function(){
		return (this.total.billAmount() * this.tip.base)
	},
	calculateTaxTip: function(){
		return (this.total.taxAmount * this.tip.tax)
	},
	calculateTotalTip: function(){
		return (this.total.amount * this.tip.base)
	},
	calculateTip: function(){
		if(this.tip.tax > 0){
			return this.calculateBaseTip() + this.calculateTaxTip()		
		} 
		else
		{
			return this.calculateTotalTip() 
		}
	},

	calculateTotalToPay: function(){
		return this.calculateTip() + this.total.amount
	},

	calculateTipIndividual: function(){
		/*Takes calculateTip above and divides it by the number of people in the groups party*/
		if(groups.length == 1){
			return parseFloat(this.calculateTip()/(+groups[0].peopleInParty)).toFixed(2)
		}else{
			return 0
		}
	},

	calculateTotalTipSplitEvenly: function(){
		if (this.peopleInParty > 1) {
			return (this.calculateTip() / this.peopleInParty)
		}
		else
		{
			return this.calculateTip()
		}
	},

	calculateTotalToPaySplitEvenly: function(){
		if (this.peopleInParty > 1) {
			return (this.calculateTotalToPay() / this.peopleInParty)
		}
		else
		{
			return this.calculateTotalToPay()
		}
	},



//Paths
//


	splitBillPath : function() {
		this.billPath = 'split-bill';
		$("body").addClass('split-class').removeClass('tip-class');
	},
	determineTipPath :  function() {
		this.billPath = 'determine-tip';
		$("body").addClass('tip-class').removeClass('split-class');
	},
	isOnSplitBillPath : function() {
		return this.billPath == 'split-bill'
	},
	isOnDetermineTipPath : function(){
		return this.billpath == 'determine-tip'
	},
	splitByIndividual : function() {
		this.splitBy = 'individual'
        groups.length = 1
        var new_group = new Group();
        new_group.peopleInParty = 1;
        groups[0] = new_group;
	},
	splitByGroup : function() {
		this.splitBy = 'group'
	},
	isSplitingByIndividual : function(){
		return this.splitBy == 'individual'
	},
	isSplitingByGroup : function(){
		return this.splitPath == 'group'
	},
	toggleMainButtons : function(){
	    if(this.isOnSplitBillPath()){
	        showButton = ".split-link";
	        hideButton = ".tip-link";
	    }else{
	        showButton = ".tip-link";
	        hideButton = ".split-link";
	    }
	    $(showButton).show();
	    $(hideButton).hide();
	},

//Boolean
//


	isGroupSplit : function(){
		return (this.isOnSplitBillPath() && this.groups.length != 0)
	},

	isSplitEvenly : function(){
		return !this.isGroupSplit()
	},





	reset: function(){
		Gozintas.billPath = "split-bill";
		Gozintas.splitBy = 'individual';
		Gozintas.peopleInParty = 0;
		Gozintas.billModifier.wine = false;
		Gozintas.billModifier.reductions = false;
		Gozintas.billModifier.extras = false;
		Gozintas.total.withoutReduction = 0;
		Gozintas.total.taxAmount = 0;
		Gozintas.total.amount = 0;
		Gozintas.individual.total = 0.00;
		Gozintas.individual.tax = 0.00;
		Gozintas.individual.tip = 0.00;
		Gozintas.tip.general = 0.15;
		Gozintas.tip.wine = 0.15;
		Gozintas.tip.carryout = 0.15;
		Gozintas.tip.tax = 0.15;

		group_size_to_delete = $("#groups .group-container").size()
		for(var i = 0; i < group_size_to_delete; i++){
			$("#groups .group-container").remove();
		}
		delete groups;
		Gozintas.groups = [];

	},


	setBillModifierBooleans : function(){
		if(groups[0].extras == true){
			Gozintas.billModifier.extras = true
		}

		if(groups[0].wine == true){
			Gozintas.billModifier.wine = true
		}
	},


//Format

	formatStringToCurrency: function(str){
		return this.formatFloatToTwoPointDecimal(parseFloat(str))
	},

	formatFloatToTwoPointDecimal: function(float){
		return parseFloat(float.toFixed(2))
	},


	formatDecmialToPercent: function(decimal){
		return (decimal * 100).toString() + "%"
	},

	formatFloatIntoCurrency: function(float){
		return "$" + this.formatFloatToTwoPointDecimal(float).toString()
	},




	numOfGroups : function(){
		return this.groups.length
	},

	addGroup : function() {
		this.groups.push(new Group())
		return this.numOfGroups();
	},
	
	removeGroup : function() {
		if(this.numOfGroups() > 0){
			this.groups.pop()
		}
	},

	clearGroups : function(){
		this.groups = []
	},

	clearEntry:  function(){
		console.log('TODO - does nothing atm');
	}


}
