/* 
This whole precess seems deprecated at this point.  Binds a custom event to be executed off of document.deviceready.
Functions logs a message to console "report: devicready" and seeks out DOM elements #deviceready .pending which do not exist.

var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        alert(document.querySelector('#' + id + ' .pending'));
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};
*/
/*
$(document).ready(function(){
   $(' div#main').on({
     pagebeforeshow: function(event,ui) {
                       alert('This page is about to be shown: '+ ui.prevPage.attr('id'));        },         
     pageshow: function(event,ui) {
                       alert('This page was just hidden: '+ ui.prevPage.attr('id'));        },         
     pagebeforehide: function(event,ui) {
                       alert('This page is about to be hidden: '+ ui.nextPage.attr('id'));        },        
     pagehide: function(event,ui) {
                       alert('This page was just shown: '+ ui.nextPage.attr('id'));
                       }        
  }); 
});

$(document).ready(function(){
   $(' div#settings').on({
     pagebeforeshow: function(event,ui) {
                       alert('We are leaving: '+ ui.prevPage.attr('id'));        },         
     pageshow: function(event,ui) {
                       alert('This page was just hidden: '+ ui.prevPage.attr('id'));        },         
     pagebeforehide: function(event,ui) {
                       alert('This page is about to be hidden: '+ ui.nextPage.attr('id'));        },        
     pagehide: function(event,ui) {
                       alert('This page was just shown: '+ ui.nextPage.attr('id'));
                       }        
  }); 
});

$(function(){
  $('div#main').on('pagebeforecreate',function(event) {
    alert('Main page is about to be created');
  });
  $('div#main').on('pagecreate',function(event) {
    alert('Main page is about to be widgetized');
  });
  $('div#main').on('pageinit',function(event) {
    alert('Main page is about to be initialized');
  });  
  $('div#settings').on('pageinit',function(event) {
      alert('settings page is about to be initialized');
    });
});
*/



function addGroup() {
	id = Gozintas.addGroup();
	addGroupElement(id);
}

function addGroupElement(id) {
    $(ich.groupTopContainer({id:id})).appendTo('.groups');
    group = ich.groupContainer({id:id});
	$("#group-"+(id)).append(group);
	popup = ich.groupPopup();
	$("#extra-popup-"+(id)).append(popup);
	$("#topgroup-"+(id)+"-container").trigger('create');
}

function clearGroupElements() {

	$(".group-container").remove()
}

function removeGroup() {
    group_size = Gozintas.numOfGroups();
	if(group_size > 1)
    { 
        $("#topgroup-"+group_size+"-container").remove();
        console.log("Popped!")
        Gozintas.removeGroup()
        
    }
}

function addExtra() {

}


function returnHome(changepage) {
    Gozintas.reset();
    Gozintas.toggleMainButtons();
    $(':input').val('');
    if(changepage){
        $.mobile.changePage("#main")
    }
}

function turnPage(loc) {
	setTimeout(function(){
		document.location = loc;
	},500);
}	
