/*
 * jQuery wikipedia-tooltip plugin version 0.1
 *
 * http://finndorby.com/
 * Copyright (c) 2012 finn dorby
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {
	$.fn.wiki_tooltip = function(settings) {
		// Settings to configure the jQuery lightBox plugin how you like
		settings = jQuery.extend({
		wiki_lang : 'en',
		in_delay : 0,
		out_delay : 3000,
		in_speed : 500,
		out_speed : 500
		},settings);
	 var tooltip = $('<div id="wiki_container"></div>');
    $('body').append(tooltip);
	$(".wikihover").hover(function(m){
	$("#wiki_container").html("");							   
	$("#wiki_container").css('display','none');	
	$("#wiki_container").css('opacity','1');	
			var _t = m.pageY + 10;
        	var _l = m.pageX + 10;
        	tooltip.css({ 'top':_t, 'left':_l }); 
      title = $(this).attr('rel');
	  title = title.replace(' ','_');
	  	var x;
		if(x) {x = null; x.abort(); }
	     x = $.ajax({
        url: 'http://'+settings.wiki_lang+'.wikipedia.org/w/api.php',
        data: {
          	action:'parse',
		    prop:'text',
          	page:title,
          	format:'json'
        },
        dataType:'jsonp',
        success: function(data) {
          //wikipage = $("<div>"+data.parse.text['*']+"<div>").children('p:first');
		  wikipage = $("<div>"+data.parse.text['*']+"<div>").children('p:lt(1)');
          wikipage.find('sup').remove();
          wikipage.find('a').each(function() {
            $(this)
              .attr('href', 'http://'+settings.wiki_lang+'.wikipedia.org'+$(this).attr('href'))
              .attr('target','wikipedia');
          });
          $("#wiki_container").html(wikipage);
          $("#wiki_container").append("<a href='http://"+settings.wiki_lang+".wikipedia.org/wiki/"+title+"' target='wikipedia'>Mehr auf Wikipedia</a>");
		  	$("#wiki_container").stop(true, true).delay(settings.in_delay).fadeIn(settings.in_speed);
		  
        }
      });
    },
	function(){
		$("#wiki_container").clearQueue();
  		$("#wiki_container").stop();
		$("#wiki_container").delay(settings.out_delay).fadeOut(settings.out_speed);
		
		});
	}
})(jQuery);
