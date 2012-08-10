function localize(txt){
    if(!window.locale){
	window.locale = JSON.parse(localStorage.getItem('en-en'));
    }
    if(txt && window.locale[txt]){
	console.log(window.locale[txt])
	return window.locale[txt];
    } else {
	console.log(txt)
	return txt;
    }
}
$(document).ready(function(){
    $("a").each(function(){
	if(this.childNodes.length == 0 || (this.childNodes.length == 1 && this.childNodes[0].nodeName == "#text")){
	    this.innerText = localize(this.innerText);
	}
    });
    var list = chrome.extension.getBackgroundPage().foxyProxy.proxyList;
    console.log(list)
    $.each(list, function(i, proxy){
	console.log(proxy.data.type);
	if(proxy.data.enabled){
	    $("<li />").attr("id", "state-"+proxy.data.id).attr("proxyid", proxy.data.id).append(
		$("<a href='#'/>").text(localize("Use proxy") +" \"" + proxy.data.name + "\" "+localize("for all URLs")).css({
		    "color": proxy.data.color
		})
	    )
		.click(function(){
		    toogleRadioButton($(this).attr("proxyid"))
		})
		.insertBefore("li#state-disabled");
	}
    });
    $("#state-" + chrome.extension.getBackgroundPage().foxyProxy.state).addClass("navbar-checked");
    if(!chrome.extension.getBackgroundPage().foxyProxy.settings.enabledQA || chrome.extension.getBackgroundPage().foxyProxy.state=='disabled')
	$('#quickAdd').hide();
});
function options(data){
    chrome.extension.getBackgroundPage().foxyProxy.options(data);
}
function toogleRadioButton(id){
    $("li").removeClass("navbar-checked");
    $("#state-"+id).addClass("navbar-checked");
    chrome.extension.getBackgroundPage().foxyProxy.state = id;
    window.close();
}