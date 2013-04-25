var Settings = {
  tipRate: window.localStorage.getItem("tipRate") ? window.localStorage.getItem("tipRate") : "NA",
  taxTipRate: window.localStorage.getItem("taxTipRate") ? window.localStorage.getItem("taxTipRate") : "NA",
  extrasTipRate: window.localStorage.getItem("extrasTipRate") ? window.localStorage.getItem("extrasTipRate") : "NA",
  
  updateUISettings: function(page){
    this.updateFlatTip(page);
    this.updateTipSelect(page);
  },
  
  updateFlatTip: function(page){
    var flatTip = this.tipRate === "NA"? "15" : (parseFloat(this.tipRate)*100).toString();
    $('#'+page+' #flat-rate-tip').html('Flat ' + flatTip + '%');
    $('#'+page+' #flat-rate-tip').prev('span').html('<span class="ui-btn-text">Flat ' + flatTip + '%</span>');
  },

  updateTipSelect: function(page) {
    if(!($('#'+page+' #flat-rate-tip').length)) {
      
      $('#'+page+' #tip-rate option').removeAttr("selected");
      $('#'+page+' #tip-rate option[value="' + this.tipRate + '"]').attr("selected","selected");
      $('#'+page+' #tip-rate').selectmenu("refresh");
      
      $('#'+page+' #tax-tip-rate option').removeAttr("selected");
      $('#'+page+' #tax-tip-rate option[value="' + this.taxTipRate + '"]').attr("selected","selected");
      $('#'+page+' #tax-tip-rate').selectmenu("refresh");
      
      $('#'+page+' #extras-tip-rate option').removeAttr("selected");
      $('#'+page+' #extras-tip-rate option[value="' + this.extrasTipRate + '"]').attr("selected","selected");
      $('#'+page+' #extras-tip-rate').selectmenu("refresh");
    }
    else{
      return;
    }
  },
  tipString: function(){
    return (this.tipRate*100).toString() + "%";
  }
}