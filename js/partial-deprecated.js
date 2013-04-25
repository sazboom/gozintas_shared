//FILE DEPRECATED AND NO LONGER INCLUDED

$(document).ready(function() {
	loadPartials("*[data-routing]",true);
});

function moreStuff(router, onReady){
	var router_default = "*[data-routing]";
	router_array = router.split(" ");
	if(onReady==true){
		trigger_create = false;
	}else{
		trigger_create = true;
	}
	router.trim();
    if($(router).size()==0){
   		return 0;
    }else{
	  $(router).each(function(){
		var link = $(this).data("routing");
		var that = this
		$.ajax({
			url: "partials/_"+link, 
			dataType:'html',
			async: false,
			success: function(data){
				$(that).append(data);
				var newRouter = "#"+$(that).attr('id')+" *[data-routing]"
				loadPartials(newRouter,onReady);
				if(trigger_create){
					$(that).trigger('create');
					$(that).parent().trigger('create');
					$(that).parent().parent().trigger('create');
				}else{
					$(that).trigger('pagebeforeload');
				}
				initPageJS(that)
			}
		});
	  });
	}
}

function loadPartials(router, onReady){
	onReady = typeof onReady !== 'undefined' ? onReady : false;
	moreStuff(router,onReady);
	$('select').each(function(){
		$(this).selectmenu();
		$(this).selectmenu('refresh',true);
	});
}

function initPageJS(selector){
	page = $(selector).data('pagejs')
	if(page){
		console.log('Initializing JS for '+page+'..');
		Page.js[page]['init']()
		console.log('Done.');
	}
}

function loadPageJS(e,ui){
	currentPage = $(e.target).attr('data-url')
	prevPage = $(ui.prevPage[0]).attr('id')
	if(currentPage){
		console.log('Loading JS for '+currentPage+'..');
		Page.js[currentPage]['load']()
		console.log('Done.');
	}
	if(prevPage){
		console.log('Unloading JS for '+prevPage+'..');
		unloadPageJS(prevPage)
		console.log('Done.');
	}
}

function unloadPageJS(page){
	Page.js[page]['unload']()
}
