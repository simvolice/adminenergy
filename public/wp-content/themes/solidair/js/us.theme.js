/**
 * UpSolution Widget: w-search
 */
(function ($) {
	"use strict";

	$.fn.wSearch = function(){
		return this.each(function(){
			var $this = $(this),
				$form = $this.find('.w-form'),
				$input = $form.find('input[name="s"]'),
				focusTimer = null;

			var show = function(){
				$form.addClass('active');
				focusTimer = setTimeout(function(){
					$input.focus();
				}, 300);
			};

			var hide = function(){
				clearTimeout(focusTimer);
				$form.removeClass('active');
				$input.blur();
			};

			$this.find('.w-search-open').click(show);
			$this.find('.w-search-close').click(hide);
			$input.keyup(function(e) {
				if (e.keyCode == 27) hide();
			});

		});
	};

	$(function(){
		jQuery('.w-search.layout_popup').wSearch();
	});
})(jQuery);

/**
 * UpSolution Widget: w-tabs
 */
jQuery(function($){
	$('.w-tabs').wTabs();
});

/**
 * UpSolution Widget: w-blog
 */
jQuery(function($){
	$('.w-blog').wBlog();
});

/**
 * UpSolution Widget: w-portfolio
 */
jQuery(function($){
	$('.w-portfolio').wPortfolio();
});
