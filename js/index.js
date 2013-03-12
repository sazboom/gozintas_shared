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
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }


};

function addGroup(){
	id = Gozintas.addGroup();
	addGroupElement(id);
}

function addGroupElement(id)
{
    $("<div id='topgroup-"+(id)+"-container' class='group-container'><div data-role='collapsible' data-content-theme='c' data-theme='a' id ='group-"+(id)+"' class='group-"+(id)+" visible' data-routing='group.html' style = 'width: 77%; float: left'><h3>Group "+(id)+"</h3></div><a href='#' data-transition='pop' data-role='button' data-inline='true' style='float: left; width: 20%;' data-icon='gear' data-theme='b' data-rel='popup' onclick='$(&quot;#extra-popup-"+(id)+"&quot;).popup(&quot;open&quot;)'></a><div data-role='popup' class='extra-popup' id='extra-popup-"+(id)+"' data-routing='extras.html'></div></div>").appendTo('.groups');
    loadPartials("#group-"+(id)+"[data-routing]", false);
    loadPartials("#extra-popup-"+(id)+"[data-routing]", false);
	}

function removeGroup()
{
    group_size = Gozintas.numOfGroups();
	if(group_size > 1)
    { 
        $("#topgroup-"+group_size+"-container").remove();
        console.log("Popped!")
        Gozintas.removeGroup()
        
    }
}

function addExtra()
{

}


function returnHome(changepage){
    Gozintas.reset();
    Gozintas.showSplitTipButtons();
    $(':input').val('');
    if(changepage){
        $.mobile.changePage("#page1")
    }
}
