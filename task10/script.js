(function($){

    $.fn.customTabs = function(options){

        const settings = $.extend({
            activeClass: "active-tab",
            animationSpeed: 400,
            defaultTab: 0
        }, options);

        return this.each(function(){

            const container = $(this);
            const tabs = container.find("[role='tab']");
            const contents = container.find(".tab-content");

            function activateTab(index, updateHash = true){

                tabs.removeClass(settings.activeClass);
                contents.hide();

                const selectedTab = tabs.eq(index);
                const targetId = selectedTab.data("tab");
                const targetContent = $("#" + targetId);

                selectedTab.addClass(settings.activeClass);
                targetContent.fadeIn(settings.animationSpeed);

                if(updateHash){
                    history.replaceState(null, null, "#" + targetId);
                }
            }

            /* Click */
            tabs.on("click", function(){
                activateTab($(this).index());
            });

            /* Keyboard Navigation */
            tabs.on("keydown", function(e){
                let index = $(this).index();

                if(e.key === "ArrowRight"){
                    activateTab((index + 1) % tabs.length);
                }

                if(e.key === "ArrowLeft"){
                    activateTab((index - 1 + tabs.length) % tabs.length);
                }

                if(e.key === "Enter" || e.key === " "){
                    activateTab(index);
                }
            });

            /* URL Hash Support */
            const hash = window.location.hash.substring(1);
            const hashTab = tabs.filter(`[data-tab="${hash}"]`);

            if(hash && hashTab.length){
                activateTab(hashTab.index(), false);
            } else {
                activateTab(settings.defaultTab);
            }

        });
    };

})(jQuery);


/* Initialize Plugin */
$(document).ready(function(){

    $(".tabs").customTabs({
        defaultTab: 0,
        animationSpeed: 500
    });

});