$(document).ready(function(){

    // Functions for the Top Bar in the new Additional Properties Sheet UI

    // Toggle the top menu list based on the state of the top menu open button
    // Using dynamic event binding using live/on
    var toggleTopMenuList = function(e){
      var elem = $("span.top-menu-open");

      if(elem.is(".active")){
        elem.removeClass("active");
        elem.closest(".top-menu").find("ul.top-menu-list").slideUp(400);

      }
      else{
        elem.addClass("active");
        elem.closest(".top-menu").find("ul.top-menu-list").slideDown(400);
      }
      if(e != undefined){
        e.stopPropagation();
      }
    };

    // Toggle the top more menu based on the state of the top more btn
    $("span.top-menu-more-btn").click(function(e){
      var elem = $(this);

      if(elem.is(".active")){
        elem.removeClass("active");
        elem.closest(".top-menu").find("div.top-menu-more").slideUp(100);
        $('div.wrapper.vbi-add-property-wrapper').unbind('click');
        $('.top-menu .top-menu-more').unbind('click');
      }
      else{
        elem.addClass("active");
        elem.closest(".top-menu").find("div.top-menu-more").slideDown(100);

         $('div.wrapper.vbi-add-property-wrapper').click(function(e) {
            elem.click();
            e.stopPropagation();
         });

         $('.top-menu .top-menu-more').click(function(e){
             e.stopPropagation();
         });
      }
      e.stopPropagation();
    });

    // Toggle the Collapse Uncollapse option in the category list
    var toggleCollapse = function(e){
      var elem = $(this), containerElem;
      elem.fadeOut(100);
      if(elem.is(".down")){
        elem.removeClass("down");

        containerElem = elem.next();
        if(containerElem.is(".prop-section-container")){
            containerElem.slideDown(200, function(){
                elem.addClass("up");
                containerElem.removeClass("collapsed").addClass("uncollapsed");
            });
        }else{
          elem.addClass("up");
        }

      }
      else if(elem.is(".up")){
        elem.removeClass("up");

        containerElem = elem.next();
        if(containerElem.is(".prop-section-container")){
            containerElem.slideUp(200, function(){
              elem.addClass("down");
              containerElem.removeClass("uncollapsed").addClass("collapsed");
            });
        }else{
            elem.addClass("down");
        }
      }
      elem.fadeIn(100);
    };

    // Toggle the active section selected
    var toggleActiveMenu = function(e){
      //swap the active

      var selectedItem = $(this);
      var activeItem = $(".top-menu .top-menu-active");

      var activeItemIndex = activeItem.attr("data-index");
      var selectedItemIndex = selectedItem.attr("data-index");

      if(activeItemIndex != selectedItemIndex){
        //Swap the activeItem name, index and class
        activeItem.attr("data-index", selectedItemIndex);
        activeItem.find(".top-menu-name").html(selectedItem.find(".top-menu-name").html());
        activeItem.find(".top-menu-name").attr("class", selectedItem.find(".top-menu-name").attr("class"));

        //Remove the hide attr from the list
        $('.top-menu-list .top-menu-item[data-index="' + activeItemIndex + '"]').removeClass("active");

        //Set the selectedItem as hidden
        selectedItem.addClass("active");

        //Switch the prop-section-container
        //Find the active prop-section-container
        $('.wrapper.vbi-add-property-wrapper .prop-section-container[data-section-index="' + activeItemIndex + '"]').removeClass("active");
        $('.wrapper.vbi-add-property-wrapper .prop-section-container[data-section-index="' + selectedItemIndex + '"]').addClass("active");
      }

      //Close the dropdown
      var menuButton = $("span.top-menu-open");

      if(menuButton.is(".active")){
        menuButton.click();
      }

    };

    //Backwards compatibility for live function
    if($(document).live !== undefined){
      $(".prop-section .prop-section-toggle").live("click",toggleCollapse);
      $(".prop-section .prop-section-title").live("click", function(e){
        $(this).parent().find(".prop-section-toggle").click();
        e.stopPropagation();
      });

      $("span.top-menu-open").live("click",toggleTopMenuList);

      $(".top-menu-list .top-menu-item").live("click", toggleActiveMenu);

    }
    else if($(document).on !== undefined){
      $(document).on("click", ".prop-section .prop-section-toggle", toggleCollapse);
      $(document).on("click", ".prop-section .prop-section-title", function(e){
        $(this).parent().find(".prop-section-toggle").click();
        e.stopPropagation();
      });

      $(document).on("click", "span.top-menu-open",  toggleTopMenuList);

      $(document).on("click", ".top-menu-list .top-menu-item",  toggleActiveMenu);
    }

    $(".top-menu-more .top-menu-more-item.collapse-all").click(function(e){

      //Get all the propsection toggles
      var propSectionToggles = $(".wrapper.vbi-add-property-wrapper .prop-section-container.active .prop-section-toggle");

      propSectionToggles.each(function(index, elem){
        if($(elem).is(".up")){
          $(document.body).trigger({
           type:   'click',
           target: $(elem)[0]
          });

          return;
        }
      });

      //Close the collapse box
      $(".wrapper.vbi-add-property-wrapper .top-menu-more-btn").click();
      e.stopPropagation();
    });


    $(".top-menu-more .top-menu-more-item.uncollapse-all").click(function(e){

      //Get all the propsection toggles
      var propSectionToggles = $(".wrapper.vbi-add-property-wrapper .prop-section-container.active .prop-section-toggle");

      propSectionToggles.each(function(index, elem){
        if($(elem).is(".down")){
          $(document.body).trigger({
           type:   'click',
           target: $(elem)[0]
          });

          return;
        }
      });

      //Close the collapse box
      $(".wrapper.vbi-add-property-wrapper .top-menu-more-btn").click();
      e.stopPropagation();
    });

    //Backwards compatibility for live function
    if($(document).live !== undefined){
    $('.property label').live('mouseover', function(event) { $(this).qtip({
        content: {
	    	title: function(event, api) {
	          // Retrieve content from ALT attribute of the $('.selector') element
	          return $(this).attr('data-name');
			}
        },
        position: {
         	my: 'top left',  // Position my top left...
            at: 'bottom left', // at the bottom right of...
            viewport: $(".wrapper.vbi-add-property-wrapper"),
            adjust:{
            	method:'none flipinvert'
            }
        },
        overwrite: false,
        show: {
          event: event.type,
          ready: true
        },
        style: {
        	classes: 'qtip-blue'
    	}
    }, event);
  });
	}else if($(document).on !== undefined){
		
    $(document).on('mouseover','.property label', function(event) { $(this).qtip({
        content: {
	    	title: function(event, api) {
	          // Retrieve content from ALT attribute of the $('.selector') element
	          return $(this).attr('data-name');
			}
        },
        position: {
         	my: 'top left',  // Position my top left...
            at: 'bottom left', // at the bottom right of...
            viewport: $(".wrapper.vbi-add-property-wrapper"),
            adjust:{
            	method:'none flipinvert'
            }
        },
        overwrite: false,
        show: {
          event: event.type,
          ready: true
        },
        style: {
        	classes: 'qtip-blue'
    	}
    }, event);
  });
		
	}
    //Bind the Search Keyup
    $(".top-search .top-search-input").keyup(function(e){
      var keyword = $(this).val();
    
      //get rid of spaces
      keyword = keyword.replace(/ /g,'');

      //Minimum length should be 3
      if(keyword.length<3 && keyword.length>0){
        return;
      }
      else if(keyword.length === 0){
        //Fire the close search event
        clearSearchResults();
        return;
      }

      //Switch the top-menu-active to Search Results & hide the menu and more button
      //$(".top-menu .top-menu-active").removeAttr("data-index");
      $(".top-menu .top-menu-active .top-menu-name").html("Search Results");
      $(".top-menu .top-menu-active").attr("data-index","-1");
      $(".top-menu .top-menu-active .top-menu-name").addClass("icon-search_results");

      //Hiding the buttons
      $(".top-menu .top-menu-open").hide();
      $(".top-menu .top-menu-more-btn").hide();

      //bring in the close button
      $(".top-search .top-search-close").show();

      //hide the open top-menu-list
      if($(".top-menu-open").is(".active")){
        toggleTopMenuList();
      }

      //If length is greater than 3, then start analyzing the attrs data-name, data-title, data-desc
      //on .property class

      var properties = $(".wrapper.vbi-add-property-wrapper .prop-section-container:not(.prop-search-container) .property");
      var searchProperties = $(".wrapper.vbi-add-property-wrapper .prop-search-container .property:not(.no-results)");

      //Build a rank based search, i.e. highest priority to existing search results, name exact, then name partial, then title and lastly description
      var search_results = []; 

      var searchRankBased = function(collection){
        //Iterating over the name for exact matches
        collection.each(function(index, elem){
          var propName = $(elem).attr("data-name");
          var propTitle = $(elem).attr("data-title");

          if(propTitle.toLowerCase() == keyword.toLowerCase()){
            if(search_results.indexOf(propName) == -1){
              search_results.push(propName);
            }
          }
        });

        //Iterating over the name for partial
        collection.each(function(index, elem){
          var propName = $(elem).attr("data-name");
          var propTitle = $(elem).attr("data-title");
          //get rid of spaces
          propName = propName.replace(/ /g,'');

          if(propTitle.toLowerCase().indexOf(keyword.toLowerCase()) != -1){
            //Check if existing
            if(search_results.indexOf(propName) == -1){
              search_results.push(propName);
            }
          }
        });

        //Iterating over the title for partial
        collection.each(function(index, elem){
          var propTitle = $(elem).attr("data-title");
          var propName = $(elem).attr("data-name");
          //get rid of spaces
          propTitle = propTitle.replace(/ /g,'');

          if(propTitle.toLowerCase().indexOf(keyword.toLowerCase()) != -1){
            //Check if existing
            if(search_results.indexOf(propName) == -1){
              search_results.push(propName);
            }
          }
        });
      }

      searchRankBased(searchProperties);
      searchRankBased(properties);

      //filter the search_results
      filterSearchResults(search_results);
      return;
    });

    //Call clearSearchResults on the Close button
    $(".top-search .top-search-close").click(function(e){
      $(".top-search .top-search-input").val("");
      clearSearchResults();
    });

    var clearSearchResults = function(){
      var propContainer = $(".wrapper.vbi-add-property-wrapper .prop-section-container:not(.prop-search-container)");
      var searchProperties = $(".wrapper.vbi-add-property-wrapper .prop-search-container .property:not(.no-results)");

      //Hiding the buttons
      $(".top-menu .top-menu-open").show();
      $(".top-menu .top-menu-more-btn").show();

      //bring in the close button
      $(".top-search .top-search-close").hide();

      //Hide the search results container
      $(".wrapper.vbi-add-property-wrapper .prop-search-container").removeClass("active");

      //Reattach the ones in the results
      //Reattach the ones which are now not in the search results
      searchProperties.each(function(index, elem){
        var propName = $(elem).attr("id").replace("prop-","");

        //detach and appendTo propContainer
        var detachedPropObj = $(elem).detach();

        //find the location-dummy for this property
        var locationDummy = propContainer.find('.location-dummy[data-name="' + propName + '"]');
        locationDummy.after(detachedPropObj);

        //remove the location dummy
        locationDummy.remove();
      });

      //Select the active element from the top-menu-list and click it
      var activeItem = $(".top-menu .top-menu-item.active").first();
      activeItem.click();

    };

    var filterSearchResults = function(results){
      //Search Results container
      var searchContainer = $(".prop-search-container");
      var propContainer = $(".wrapper.vbi-add-property-wrapper .prop-section-container:not(.prop-search-container)");
      var searchProperties = $(".wrapper.vbi-add-property-wrapper .prop-search-container .property:not(.no-results)");


      //If length of results is 0, show no results
      if(results.length===0){
        //Re-attach the existing results
        searchProperties.each(function(index, elem){
          var propName = $(elem).attr("id").replace("prop-","");

          //detach and appendTo propContainer
          var detachedPropObj = $(elem).detach();

          //find the location-dummy for this property
          var locationDummy = propContainer.find('.location-dummy[data-name="' + propName + '"]');
          locationDummy.after(detachedPropObj);

          //remove the location dummy
          locationDummy.remove();
        });

        searchContainer.find(".prop-section").html('<div class="property no-results"><label>Sorry, no results found.</label></div>');
        searchProperties = $(".wrapper.vbi-add-property-wrapper .prop-search-container .property:not(.no-results)");
      }
      else{
        //Remove the no results if results>0
        searchContainer.find(".no-results").remove();
      }

      //Reattach the ones which are now not in the search results
      searchProperties.each(function(index, elem){
        var propName = $(elem).attr("id").replace("prop-","");
        if(results.indexOf(propName) == -1){
          //detach and appendTo propContainer
          var detachedPropObj = $(elem).detach();

          //find the location-dummy for this property
          var locationDummy = propContainer.find('.location-dummy[data-name="' + propName + '"]');
          locationDummy.after(detachedPropObj);

          //remove the location dummy
          locationDummy.remove();

        }
      });


      //Loop through the search results
      for(i=0, len = results.length; i<len ; i++){
        var propSelector = "#prop-"+results[i];
        //If it already exists in the container no need to d anything
        if(searchContainer.find(propSelector).length>0){
          continue;
        }

        //Detach from original location and move it here
        var selectedProp = propContainer.find(propSelector);

        //append dummy span instead
        selectedProp.after('<span class="location-dummy" data-name="' + results[i] + '"></span>');
        var selectedPropObj = selectedProp.detach();

        searchContainer.find(".prop-section").append(selectedPropObj);

      }

      //Show the searchContainer
      if(!searchContainer.is(".active")){
        searchContainer.addClass("active");
      }
      //Hide the selected section
      $(".wrapper.vbi-add-property-wrapper .prop-section-container:not(.prop-search-container).active").removeClass("active");

    };

});



/* qTip2 v2.2.1 | Plugins: tips viewport | Styles: core basic | qtip2.com | Licensed MIT | Sun Sep 07 2014 23:21:12 */!
 function(a, b, c) { ! function(a) { "use strict"; jQuery && !jQuery.fn.qtip && a(jQuery) }(function(d) { "use strict"; function e(a, b, c, e) { this.id = c, this.target = a, this.tooltip = D, this.elements = { target: a }, this._id = Q + "-" + c, this.timers = { img: {} }, this.options = b, this.plugins = {}, this.cache = { event: {}, target: d(), disabled: C, attr: e, onTooltip: C, lastClass: "" }, this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = C } function f(a) { return a === D || "object" !== d.type(a) } function g(a) { return !(d.isFunction(a) || a && a.attr || a.length || "object" === d.type(a) && (a.jquery || a.then)) } function h(a) { var b, c, e, h; return f(a) ? C : (f(a.metadata) && (a.metadata = { type: a.metadata }), "content" in a && (b = a.content, f(b) || b.jquery || b.done ? b = a.content = { text: c = g(b) ? C : b } : c = b.text, "ajax" in b && (e = b.ajax, h = e && e.once !== C, delete b.ajax, b.text = function(a, b) { var f = c || d(this).attr(b.options.content.attr) || "Loading...", g = d.ajax(d.extend({}, e, { context: b })).then(e.success, D, e.error).then(function(a) { return a && h && b.set("content.text", a), a }, function(a, c, d) { b.destroyed || 0 === a.status || b.set("content.text", c + ": " + d) }); return h ? f : (b.set("content.text", f), g) }), "title" in b && (d.isPlainObject(b.title) && (b.button = b.title.button, b.title = b.title.text), g(b.title || C) && (b.title = C))), "position" in a && f(a.position) && (a.position = { my: a.position, at: a.position }), "show" in a && f(a.show) && (a.show = a.show.jquery ? { target: a.show } : a.show === B ? { ready: B } : { event: a.show }), "hide" in a && f(a.hide) && (a.hide = a.hide.jquery ? { target: a.hide } : { event: a.hide }), "style" in a && f(a.style) && (a.style = { classes: a.style }), d.each(P, function() { this.sanitize && this.sanitize(a) }), a) } function i(a, b) { for (var c, d = 0, e = a, f = b.split("."); e = e[f[d++]];) d < f.length && (c = e); return [c || a, f.pop()] } function j(a, b) { var c, d, e; for (c in this.checks) for (d in this.checks[c])(e = new RegExp(d, "i").exec(a)) && (b.push(e), ("builtin" === c || this.plugins[c]) && this.checks[c][d].apply(this.plugins[c] || this, b)) } function k(a) { return T.concat("").join(a ? "-" + a + " " : " ") } function l(a, b) { return b > 0 ? setTimeout(d.proxy(a, this), b) : void a.call(this) } function m(a) { this.tooltip.hasClass($) || (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this.timers.show = l.call(this, function() { this.toggle(B, a) }, this.options.show.delay)) } function n(a) { if (!this.tooltip.hasClass($) && !this.destroyed) { var b = d(a.relatedTarget), c = b.closest(U)[0] === this.tooltip[0], e = b[0] === this.options.show.target[0]; if (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this !== b[0] && "mouse" === this.options.position.target && c || this.options.hide.fixed && /mouse(out|leave|move)/.test(a.type) && (c || e)) try { a.preventDefault(), a.stopImmediatePropagation() } catch (f) {} else this.timers.hide = l.call(this, function() { this.toggle(C, a) }, this.options.hide.delay, this) } } function o(a) { !this.tooltip.hasClass($) && this.options.hide.inactive && (clearTimeout(this.timers.inactive), this.timers.inactive = l.call(this, function() { this.hide(a) }, this.options.hide.inactive)) } function p(a) { this.rendered && this.tooltip[0].offsetWidth > 0 && this.reposition(a) } function q(a, c, e) { d(b.body).delegate(a, (c.split ? c : c.join("." + Q + " ")) + "." + Q, function() { var a = w.api[d.attr(this, S)]; a && !a.disabled && e.apply(a, arguments) }) } function r(a, c, f) { var g, i, j, k, l, m = d(b.body), n = a[0] === b ? m : a, o = a.metadata ? a.metadata(f.metadata) : D, p = "html5" === f.metadata.type && o ? o[f.metadata.name] : D, q = a.data(f.metadata.name || "qtipopts"); try { q = "string" == typeof q ? d.parseJSON(q) : q } catch (r) {} if (k = d.extend(B, {}, w.defaults, f, "object" == typeof q ? h(q) : D, h(p || o)), i = k.position, k.id = c, "boolean" == typeof k.content.text) { if (j = a.attr(k.content.attr), k.content.attr === C || !j) return C; k.content.text = j } if (i.container.length || (i.container = m), i.target === C && (i.target = n), k.show.target === C && (k.show.target = n), k.show.solo === B && (k.show.solo = i.container.closest("body")), k.hide.target === C && (k.hide.target = n), k.position.viewport === B && (k.position.viewport = i.container), i.container = i.container.eq(0), i.at = new y(i.at, B), i.my = new y(i.my), a.data(Q)) if (k.overwrite) a.qtip("destroy", !0); else if (k.overwrite === C) return C; return a.attr(R, c), k.suppress && (l = a.attr("title")) && a.removeAttr("title").attr(ab, l).attr("title", ""), g = new e(a, k, c, !!j), a.data(Q, g), g } function s(a) { return a.charAt(0).toUpperCase() + a.slice(1) } function t(a, b) { var d, e, f = b.charAt(0).toUpperCase() + b.slice(1), g = (b + " " + pb.join(f + " ") + f).split(" "), h = 0; if (ob[b]) return a.css(ob[b]); for (; d = g[h++];) if ((e = a.css(d)) !== c) return ob[b] = d, e } function u(a, b) { return Math.ceil(parseFloat(t(a, b))) } function v(a, b) { this._ns = "tip", this.options = b, this.offset = b.offset, this.size = [b.width, b.height], this.init(this.qtip = a) } var w, x, y, z, A, B = !0, C = !1, D = null, E = "x", F = "y", G = "width", H = "height", I = "top", J = "left", K = "bottom", L = "right", M = "center", N = "flipinvert", O = "shift", P = {}, Q = "qtip", R = "data-hasqtip", S = "data-qtip-id", T = ["ui-widget", "ui-tooltip"], U = "." + Q, V = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "), W = Q + "-fixed", X = Q + "-default", Y = Q + "-focus", Z = Q + "-hover", $ = Q + "-disabled", _ = "_replacedByqTip", ab = "oldtitle", bb = { ie: function() { for (var a = 4, c = b.createElement("div"); (c.innerHTML = "<!--[if gt IE " + a + "]><i></i><![endif]-->") && c.getElementsByTagName("i")[0]; a += 1); return a > 4 ? a : 0 / 0 }(), iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || C }; x = e.prototype, x._when = function(a) { return d.when.apply(d, a) }, x.render = function(a) { if (this.rendered || this.destroyed) return this; var b, c = this, e = this.options, f = this.cache, g = this.elements, h = e.content.text, i = e.content.title, j = e.content.button, k = e.position, l = ("." + this._id + " ", []); return d.attr(this.target[0], "aria-describedby", this._id), f.posClass = this._createPosClass((this.position = { my: k.my, at: k.at }).my), this.tooltip = g.tooltip = b = d("<div/>", { id: this._id, "class": [Q, X, e.style.classes, f.posClass].join(" "), width: e.style.width || "", height: e.style.height || "", tracking: "mouse" === k.target && k.adjust.mouse, role: "alert", "aria-live": "polite", "aria-atomic": C, "aria-describedby": this._id + "-content", "aria-hidden": B }).toggleClass($, this.disabled).attr(S, this.id).data(Q, this).appendTo(k.container).append(g.content = d("<div />", { "class": Q + "-content", id: this._id + "-content", "aria-atomic": B })), this.rendered = -1, this.positioning = B, i && (this._createTitle(), d.isFunction(i) || l.push(this._updateTitle(i, C))), j && this._createButton(), d.isFunction(h) || l.push(this._updateContent(h, C)), this.rendered = B, this._setWidget(), d.each(P, function(a) { var b; "render" === this.initialize && (b = this(c)) && (c.plugins[a] = b) }), this._unassignEvents(), this._assignEvents(), this._when(l).then(function() { c._trigger("render"), c.positioning = C, c.hiddenDuringWait || !e.show.ready && !a || c.toggle(B, f.event, C), c.hiddenDuringWait = C }), w.api[this.id] = this, this }, x.destroy = function(a) { function b() { if (!this.destroyed) { this.destroyed = B; var a, b = this.target, c = b.attr(ab); this.rendered && this.tooltip.stop(1, 0).find("*").remove().end().remove(), d.each(this.plugins, function() { this.destroy && this.destroy() }); for (a in this.timers) clearTimeout(this.timers[a]); b.removeData(Q).removeAttr(S).removeAttr(R).removeAttr("aria-describedby"), this.options.suppress && c && b.attr("title", c).removeAttr(ab), this._unassignEvents(), this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = D, delete w.api[this.id] } } return this.destroyed ? this.target : (a === B && "hide" !== this.triggering || !this.rendered ? b.call(this) : (this.tooltip.one("tooltiphidden", d.proxy(b, this)), !this.triggering && this.hide()), this.target) }, z = x.checks = { builtin: { "^id$": function(a, b, c, e) { var f = c === B ? w.nextid : c, g = Q + "-" + f; f !== C && f.length > 0 && !d("#" + g).length ? (this._id = g, this.rendered && (this.tooltip[0].id = this._id, this.elements.content[0].id = this._id + "-content", this.elements.title[0].id = this._id + "-title")) : a[b] = e }, "^prerender": function(a, b, c) { c && !this.rendered && this.render(this.options.show.ready) }, "^content.text$": function(a, b, c) { this._updateContent(c) }, "^content.attr$": function(a, b, c, d) { this.options.content.text === this.target.attr(d) && this._updateContent(this.target.attr(c)) }, "^content.title$": function(a, b, c) { return c ? (c && !this.elements.title && this._createTitle(), void this._updateTitle(c)) : this._removeTitle() }, "^content.button$": function(a, b, c) { this._updateButton(c) }, "^content.title.(text|button)$": function(a, b, c) { this.set("content." + b, c) }, "^position.(my|at)$": function(a, b, c) { "string" == typeof c && (this.position[b] = a[b] = new y(c, "at" === b)) }, "^position.container$": function(a, b, c) { this.rendered && this.tooltip.appendTo(c) }, "^show.ready$": function(a, b, c) { c && (!this.rendered && this.render(B) || this.toggle(B)) }, "^style.classes$": function(a, b, c, d) { this.rendered && this.tooltip.removeClass(d).addClass(c) }, "^style.(width|height)": function(a, b, c) { this.rendered && this.tooltip.css(b, c) }, "^style.widget|content.title": function() { this.rendered && this._setWidget() }, "^style.def": function(a, b, c) { this.rendered && this.tooltip.toggleClass(X, !!c) }, "^events.(render|show|move|hide|focus|blur)$": function(a, b, c) { this.rendered && this.tooltip[(d.isFunction(c) ? "" : "un") + "bind"]("tooltip" + b, c) }, "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function() { if (this.rendered) { var a = this.options.position; this.tooltip.attr("tracking", "mouse" === a.target && a.adjust.mouse), this._unassignEvents(), this._assignEvents() } } } }, x.get = function(a) { if (this.destroyed) return this; var b = i(this.options, a.toLowerCase()), c = b[0][b[1]]; return c.precedance ? c.string() : c }; var cb = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i, db = /^prerender|show\.ready/i; x.set = function(a, b) { if (this.destroyed) return this; { var c, e = this.rendered, f = C, g = this.options; this.checks } return "string" == typeof a ? (c = a, a = {}, a[c] = b) : a = d.extend({}, a), d.each(a, function(b, c) { if (e && db.test(b)) return void delete a[b]; var h, j = i(g, b.toLowerCase()); h = j[0][j[1]], j[0][j[1]] = c && c.nodeType ? d(c) : c, f = cb.test(b) || f, a[b] = [j[0], j[1], c, h] }), h(g), this.positioning = B, d.each(a, d.proxy(j, this)), this.positioning = C, this.rendered && this.tooltip[0].offsetWidth > 0 && f && this.reposition("mouse" === g.position.target ? D : this.cache.event), this }, x._update = function(a, b) { var c = this, e = this.cache; return this.rendered && a ? (d.isFunction(a) && (a = a.call(this.elements.target, e.event, this) || ""), d.isFunction(a.then) ? (e.waiting = B, a.then(function(a) { return e.waiting = C, c._update(a, b) }, D, function(a) { return c._update(a, b) })) : a === C || !a && "" !== a ? C : (a.jquery && a.length > 0 ? b.empty().append(a.css({ display: "block", visibility: "visible" })) : b.html(a), this._waitForContent(b).then(function(a) { c.rendered && c.tooltip[0].offsetWidth > 0 && c.reposition(e.event, !a.length) }))) : C }, x._waitForContent = function(a) { var b = this.cache; return b.waiting = B, (d.fn.imagesLoaded ? a.imagesLoaded() : d.Deferred().resolve([])).done(function() { b.waiting = C }).promise() }, x._updateContent = function(a, b) { this._update(a, this.elements.content, b) }, x._updateTitle = function(a, b) { this._update(a, this.elements.title, b) === C && this._removeTitle(C) }, x._createTitle = function() { var a = this.elements, b = this._id + "-title"; a.titlebar && this._removeTitle(), a.titlebar = d("<div />", { "class": Q + "-titlebar " + (this.options.style.widget ? k("header") : "") }).append(a.title = d("<div />", { id: b, "class": Q + "-title", "aria-atomic": B })).insertBefore(a.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function(a) { d(this).toggleClass("ui-state-active ui-state-focus", "down" === a.type.substr(-4)) }).delegate(".qtip-close", "mouseover mouseout", function(a) { d(this).toggleClass("ui-state-hover", "mouseover" === a.type) }), this.options.content.button && this._createButton() }, x._removeTitle = function(a) { var b = this.elements; b.title && (b.titlebar.remove(), b.titlebar = b.title = b.button = D, a !== C && this.reposition()) }, x._createPosClass = function(a) { return Q + "-pos-" + (a || this.options.position.my).abbrev() }, x.reposition = function(c, e) { if (!this.rendered || this.positioning || this.destroyed) return this; this.positioning = B; var f, g, h, i, j = this.cache, k = this.tooltip, l = this.options.position, m = l.target, n = l.my, o = l.at, p = l.viewport, q = l.container, r = l.adjust, s = r.method.split(" "), t = k.outerWidth(C), u = k.outerHeight(C), v = 0, w = 0, x = k.css("position"), y = { left: 0, top: 0 }, z = k[0].offsetWidth > 0, A = c && "scroll" === c.type, D = d(a), E = q[0].ownerDocument, F = this.mouse; if (d.isArray(m) && 2 === m.length) o = { x: J, y: I }, y = { left: m[0], top: m[1] }; else if ("mouse" === m) o = { x: J, y: I }, (!r.mouse || this.options.hide.distance) && j.origin && j.origin.pageX ? c = j.origin : !c || c && ("resize" === c.type || "scroll" === c.type) ? c = j.event : F && F.pageX && (c = F), "static" !== x && (y = q.offset()), E.body.offsetWidth !== (a.innerWidth || E.documentElement.clientWidth) && (g = d(b.body).offset()), y = { left: c.pageX - y.left + (g && g.left || 0), top: c.pageY - y.top + (g && g.top || 0) }, r.mouse && A && F && (y.left -= (F.scrollX || 0) - D.scrollLeft(), y.top -= (F.scrollY || 0) - D.scrollTop()); else { if ("event" === m ? c && c.target && "scroll" !== c.type && "resize" !== c.type ? j.target = d(c.target) : c.target || (j.target = this.elements.target) : "event" !== m && (j.target = d(m.jquery ? m : this.elements.target)), m = j.target, m = d(m).eq(0), 0 === m.length) return this; m[0] === b || m[0] === a ? (v = bb.iOS ? a.innerWidth : m.width(), w = bb.iOS ? a.innerHeight : m.height(), m[0] === a && (y = { top: (p || m).scrollTop(), left: (p || m).scrollLeft() })) : P.imagemap && m.is("area") ? f = P.imagemap(this, m, o, P.viewport ? s : C) : P.svg && m && m[0].ownerSVGElement ? f = P.svg(this, m, o, P.viewport ? s : C) : (v = m.outerWidth(C), w = m.outerHeight(C), y = m.offset()), f && (v = f.width, w = f.height, g = f.offset, y = f.position), y = this.reposition.offset(m, y, q), (bb.iOS > 3.1 && bb.iOS < 4.1 || bb.iOS >= 4.3 && bb.iOS < 4.33 || !bb.iOS && "fixed" === x) && (y.left -= D.scrollLeft(), y.top -= D.scrollTop()), (!f || f && f.adjustable !== C) && (y.left += o.x === L ? v : o.x === M ? v / 2 : 0, y.top += o.y === K ? w : o.y === M ? w / 2 : 0) } return y.left += r.x + (n.x === L ? -t : n.x === M ? -t / 2 : 0), y.top += r.y + (n.y === K ? -u : n.y === M ? -u / 2 : 0), P.viewport ? (h = y.adjusted = P.viewport(this, y, l, v, w, t, u), g && h.left && (y.left += g.left), g && h.top && (y.top += g.top), h.my && (this.position.my = h.my)) : y.adjusted = { left: 0, top: 0 }, j.posClass !== (i = this._createPosClass(this.position.my)) && k.removeClass(j.posClass).addClass(j.posClass = i), this._trigger("move", [y, p.elem || p], c) ? (delete y.adjusted, e === C || !z || isNaN(y.left) || isNaN(y.top) || "mouse" === m || !d.isFunction(l.effect) ? k.css(y) : d.isFunction(l.effect) && (l.effect.call(k, this, d.extend({}, y)), k.queue(function(a) { d(this).css({ opacity: "", height: "" }), bb.ie && this.style.removeAttribute("filter"), a() })), this.positioning = C, this) : this }, x.reposition.offset = function(a, c, e) { function f(a, b) { c.left += b * a.scrollLeft(), c.top += b * a.scrollTop() } if (!e[0]) return c; var g, h, i, j, k = d(a[0].ownerDocument), l = !!bb.ie && "CSS1Compat" !== b.compatMode, m = e[0]; do "static" !== (h = d.css(m, "position")) && ("fixed" === h ? (i = m.getBoundingClientRect(), f(k, -1)) : (i = d(m).position(), i.left += parseFloat(d.css(m, "borderLeftWidth")) || 0, i.top += parseFloat(d.css(m, "borderTopWidth")) || 0), c.left -= i.left + (parseFloat(d.css(m, "marginLeft")) || 0), c.top -= i.top + (parseFloat(d.css(m, "marginTop")) || 0), g || "hidden" === (j = d.css(m, "overflow")) || "visible" === j || (g = d(m))); while (m = m.offsetParent); return g && (g[0] !== k[0] || l) && f(g, 1), c }; var eb = (y = x.reposition.Corner = function(a, b) { a = ("" + a).replace(/([A-Z])/, " $1").replace(/middle/gi, M).toLowerCase(), this.x = (a.match(/left|right/i) || a.match(/center/) || ["inherit"])[0].toLowerCase(), this.y = (a.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase(), this.forceY = !!b; var c = a.charAt(0); this.precedance = "t" === c || "b" === c ? F : E }).prototype; eb.invert = function(a, b) { this[a] = this[a] === J ? L : this[a] === L ? J : b || this[a] }, eb.string = function(a) { var b = this.x, c = this.y, d = b !== c ? "center" === b || "center" !== c && (this.precedance === F || this.forceY) ? [c, b] : [b, c] : [b]; return a !== !1 ? d.join(" ") : d }, eb.abbrev = function() { var a = this.string(!1); return a[0].charAt(0) + (a[1] && a[1].charAt(0) || "") }, eb.clone = function() { return new y(this.string(), this.forceY) }, x.toggle = function(a, c) { var e = this.cache, f = this.options, g = this.tooltip; if (c) { if (/over|enter/.test(c.type) && e.event && /out|leave/.test(e.event.type) && f.show.target.add(c.target).length === f.show.target.length && g.has(c.relatedTarget).length) return this; e.event = d.event.fix(c) } if (this.waiting && !a && (this.hiddenDuringWait = B), !this.rendered) return a ? this.render(1) : this; if (this.destroyed || this.disabled) return this; var h, i, j, k = a ? "show" : "hide", l = this.options[k], m = (this.options[a ? "hide" : "show"], this.options.position), n = this.options.content, o = this.tooltip.css("width"), p = this.tooltip.is(":visible"), q = a || 1 === l.target.length, r = !c || l.target.length < 2 || e.target[0] === c.target; return (typeof a).search("boolean|number") && (a = !p), h = !g.is(":animated") && p === a && r, i = h ? D : !!this._trigger(k, [90]), this.destroyed ? this : (i !== C && a && this.focus(c), !i || h ? this : (d.attr(g[0], "aria-hidden", !a), a ? (this.mouse && (e.origin = d.event.fix(this.mouse)), d.isFunction(n.text) && this._updateContent(n.text, C), d.isFunction(n.title) && this._updateTitle(n.title, C), !A && "mouse" === m.target && m.adjust.mouse && (d(b).bind("mousemove." + Q, this._storeMouse), A = B), o || g.css("width", g.outerWidth(C)), this.reposition(c, arguments[2]), o || g.css("width", ""), l.solo && ("string" == typeof l.solo ? d(l.solo) : d(U, l.solo)).not(g).not(l.target).qtip("hide", d.Event("tooltipsolo"))) : (clearTimeout(this.timers.show), delete e.origin, A && !d(U + '[tracking="true"]:visible', l.solo).not(g).length && (d(b).unbind("mousemove." + Q), A = C), this.blur(c)), j = d.proxy(function() { a ? (bb.ie && g[0].style.removeAttribute("filter"), g.css("overflow", ""), "string" == typeof l.autofocus && d(this.options.show.autofocus, g).focus(), this.options.show.target.trigger("qtip-" + this.id + "-inactive")) : g.css({ display: "", visibility: "", opacity: "", left: "", top: "" }), this._trigger(a ? "visible" : "hidden") }, this), l.effect === C || q === C ? (g[k](), j()) : d.isFunction(l.effect) ? (g.stop(1, 1), l.effect.call(g, this), g.queue("fx", function(a) { j(), a() })) : g.fadeTo(90, a ? 1 : 0, j), a && l.target.trigger("qtip-" + this.id + "-inactive"), this)) }, x.show = function(a) { return this.toggle(B, a) }, x.hide = function(a) { return this.toggle(C, a) }, x.focus = function(a) { if (!this.rendered || this.destroyed) return this; var b = d(U), c = this.tooltip, e = parseInt(c[0].style.zIndex, 10), f = w.zindex + b.length; return c.hasClass(Y) || this._trigger("focus", [f], a) && (e !== f && (b.each(function() { this.style.zIndex > e && (this.style.zIndex = this.style.zIndex - 1) }), b.filter("." + Y).qtip("blur", a)), c.addClass(Y)[0].style.zIndex = f), this }, x.blur = function(a) { return !this.rendered || this.destroyed ? this : (this.tooltip.removeClass(Y), this._trigger("blur", [this.tooltip.css("zIndex")], a), this) }, x.disable = function(a) { return this.destroyed ? this : ("toggle" === a ? a = !(this.rendered ? this.tooltip.hasClass($) : this.disabled) : "boolean" != typeof a && (a = B), this.rendered && this.tooltip.toggleClass($, a).attr("aria-disabled", a), this.disabled = !!a, this) }, x.enable = function() { return this.disable(C) }, x._createButton = function() { var a = this, b = this.elements, c = b.tooltip, e = this.options.content.button, f = "string" == typeof e, g = f ? e : "Close tooltip"; b.button && b.button.remove(), b.button = e.jquery ? e : d("<a />", { "class": "qtip-close " + (this.options.style.widget ? "" : Q + "-icon"), title: g, "aria-label": g }).prepend(d("<span />", { "class": "ui-icon ui-icon-close", html: "&times;" })), b.button.appendTo(b.titlebar || c).attr("role", "button").click(function(b) { return c.hasClass($) || a.hide(b), C }) }, x._updateButton = function(a) { if (!this.rendered) return C; var b = this.elements.button; a ? this._createButton() : b.remove() }, x._setWidget = function() { var a = this.options.style.widget, b = this.elements, c = b.tooltip, d = c.hasClass($); c.removeClass($), $ = a ? "ui-state-disabled" : "qtip-disabled", c.toggleClass($, d), c.toggleClass("ui-helper-reset " + k(), a).toggleClass(X, this.options.style.def && !a), b.content && b.content.toggleClass(k("content"), a), b.titlebar && b.titlebar.toggleClass(k("header"), a), b.button && b.button.toggleClass(Q + "-icon", !a) }, x._storeMouse = function(a) { return (this.mouse = d.event.fix(a)).type = "mousemove", this }, x._bind = function(a, b, c, e, f) { if (a && c && b.length) { var g = "." + this._id + (e ? "-" + e : ""); return d(a).bind((b.split ? b : b.join(g + " ")) + g, d.proxy(c, f || this)), this } }, x._unbind = function(a, b) { return a && d(a).unbind("." + this._id + (b ? "-" + b : "")), this }, x._trigger = function(a, b, c) { var e = d.Event("tooltip" + a); return e.originalEvent = c && d.extend({}, c) || this.cache.event || D, this.triggering = a, this.tooltip.trigger(e, [this].concat(b || [])), this.triggering = C, !e.isDefaultPrevented() }, x._bindEvents = function(a, b, c, e, f, g) { var h = c.filter(e).add(e.filter(c)), i = []; h.length && (d.each(b, function(b, c) { var e = d.inArray(c, a); e > -1 && i.push(a.splice(e, 1)[0]) }), i.length && (this._bind(h, i, function(a) { var b = this.rendered ? this.tooltip[0].offsetWidth > 0 : !1; (b ? g : f).call(this, a) }), c = c.not(h), e = e.not(h))), this._bind(c, a, f), this._bind(e, b, g) }, x._assignInitialEvents = function(a) { function b(a) { return this.disabled || this.destroyed ? C : (this.cache.event = a && d.event.fix(a), this.cache.target = a && d(a.target), clearTimeout(this.timers.show), void(this.timers.show = l.call(this, function() { this.render("object" == typeof a || c.show.ready) }, c.prerender ? 0 : c.show.delay))) } var c = this.options, e = c.show.target, f = c.hide.target, g = c.show.event ? d.trim("" + c.show.event).split(" ") : [], h = c.hide.event ? d.trim("" + c.hide.event).split(" ") : []; this._bind(this.elements.target, ["remove", "removeqtip"], function() { this.destroy(!0) }, "destroy"), /mouse(over|enter)/i.test(c.show.event) && !/mouse(out|leave)/i.test(c.hide.event) && h.push("mouseleave"), this._bind(e, "mousemove", function(a) { this._storeMouse(a), this.cache.onTarget = B }), this._bindEvents(g, h, e, f, b, function() { return this.timers ? void clearTimeout(this.timers.show) : C }), (c.show.ready || c.prerender) && b.call(this, a) }, x._assignEvents = function() { var c = this, e = this.options, f = e.position, g = this.tooltip, h = e.show.target, i = e.hide.target, j = f.container, k = f.viewport, l = d(b), q = (d(b.body), d(a)), r = e.show.event ? d.trim("" + e.show.event).split(" ") : [], s = e.hide.event ? d.trim("" + e.hide.event).split(" ") : []; d.each(e.events, function(a, b) { c._bind(g, "toggle" === a ? ["tooltipshow", "tooltiphide"] : ["tooltip" + a], b, null, g) }), /mouse(out|leave)/i.test(e.hide.event) && "window" === e.hide.leave && this._bind(l, ["mouseout", "blur"], function(a) { /select|option/.test(a.target.nodeName) || a.relatedTarget || this.hide(a) }), e.hide.fixed ? i = i.add(g.addClass(W)) : /mouse(over|enter)/i.test(e.show.event) && this._bind(i, "mouseleave", function() { clearTimeout(this.timers.show) }), ("" + e.hide.event).indexOf("unfocus") > -1 && this._bind(j.closest("html"), ["mousedown", "touchstart"], function(a) { var b = d(a.target), c = this.rendered && !this.tooltip.hasClass($) && this.tooltip[0].offsetWidth > 0, e = b.parents(U).filter(this.tooltip[0]).length > 0; b[0] === this.target[0] || b[0] === this.tooltip[0] || e || this.target.has(b[0]).length || !c || this.hide(a) }), "number" == typeof e.hide.inactive && (this._bind(h, "qtip-" + this.id + "-inactive", o, "inactive"), this._bind(i.add(g), w.inactiveEvents, o)), this._bindEvents(r, s, h, i, m, n), this._bind(h.add(g), "mousemove", function(a) { if ("number" == typeof e.hide.distance) { var b = this.cache.origin || {}, c = this.options.hide.distance, d = Math.abs; (d(a.pageX - b.pageX) >= c || d(a.pageY - b.pageY) >= c) && this.hide(a) } this._storeMouse(a) }), "mouse" === f.target && f.adjust.mouse && (e.hide.event && this._bind(h, ["mouseenter", "mouseleave"], function(a) { return this.cache ? void(this.cache.onTarget = "mouseenter" === a.type) : C }), this._bind(l, "mousemove", function(a) { this.rendered && this.cache.onTarget && !this.tooltip.hasClass($) && this.tooltip[0].offsetWidth > 0 && this.reposition(a) })), (f.adjust.resize || k.length) && this._bind(d.event.special.resize ? k : q, "resize", p), f.adjust.scroll && this._bind(q.add(f.container), "scroll", p) }, x._unassignEvents = function() { var c = this.options, e = c.show.target, f = c.hide.target, g = d.grep([this.elements.target[0], this.rendered && this.tooltip[0], c.position.container[0], c.position.viewport[0], c.position.container.closest("html")[0], a, b], function(a) { return "object" == typeof a }); e && e.toArray && (g = g.concat(e.toArray())), f && f.toArray && (g = g.concat(f.toArray())), this._unbind(g)._unbind(g, "destroy")._unbind(g, "inactive") }, d(function() { q(U, ["mouseenter", "mouseleave"], function(a) { var b = "mouseenter" === a.type, c = d(a.currentTarget), e = d(a.relatedTarget || a.target), f = this.options; b ? (this.focus(a), c.hasClass(W) && !c.hasClass($) && clearTimeout(this.timers.hide)) : "mouse" === f.position.target && f.position.adjust.mouse && f.hide.event && f.show.target && !e.closest(f.show.target[0]).length && this.hide(a), c.toggleClass(Z, b) }), q("[" + S + "]", V, o) }), w = d.fn.qtip = function(a, b, e) { var f = ("" + a).toLowerCase(), g = D, i = d.makeArray(arguments).slice(1), j = i[i.length - 1], k = this[0] ? d.data(this[0], Q) : D; return !arguments.length && k || "api" === f ? k : "string" == typeof a ? (this.each(function() { var a = d.data(this, Q); if (!a) return B; if (j && j.timeStamp && (a.cache.event = j), !b || "option" !== f && "options" !== f) a[f] && a[f].apply(a, i); else { if (e === c && !d.isPlainObject(b)) return g = a.get(b), C; a.set(b, e) } }), g !== D ? g : this) : "object" != typeof a && arguments.length ? void 0 : (k = h(d.extend(B, {}, a)), this.each(function(a) { var b, c; return c = d.isArray(k.id) ? k.id[a] : k.id, c = !c || c === C || c.length < 1 || w.api[c] ? w.nextid++ : c, b = r(d(this), c, k), b === C ? B : (w.api[c] = b, d.each(P, function() { "initialize" === this.initialize && this(b) }), void b._assignInitialEvents(j)) })) }, d.qtip = e, w.api = {}, d.each({ attr: function(a, b) { if (this.length) { var c = this[0], e = "title", f = d.data(c, "qtip"); if (a === e && f && "object" == typeof f && f.options.suppress) return arguments.length < 2 ? d.attr(c, ab) : (f && f.options.content.attr === e && f.cache.attr && f.set("content.text", b), this.attr(ab, b)) } return d.fn["attr" + _].apply(this, arguments) }, clone: function(a) { var b = (d([]), d.fn["clone" + _].apply(this, arguments)); return a || b.filter("[" + ab + "]").attr("title", function() { return d.attr(this, ab) }).removeAttr(ab), b } }, function(a, b) { if (!b || d.fn[a + _]) return B; var c = d.fn[a + _] = d.fn[a]; d.fn[a] = function() { return b.apply(this, arguments) || c.apply(this, arguments) } }), d.ui || (d["cleanData" + _] = d.cleanData, d.cleanData = function(a) { for (var b, c = 0; (b = d(a[c])).length; c++) if (b.attr(R)) try { b.triggerHandler("removeqtip") } catch (e) {} d["cleanData" + _].apply(this, arguments) }), w.version = "2.2.1", w.nextid = 0, w.inactiveEvents = V, w.zindex = 15e3, w.defaults = { prerender: C, id: C, overwrite: B, suppress: B, content: { text: B, attr: "title", title: C, button: C }, position: { my: "top left", at: "bottom right", target: C, container: C, viewport: C, adjust: { x: 0, y: 0, mouse: B, scroll: B, resize: B, method: "flipinvert flipinvert" }, effect: function(a, b) { d(this).animate(b, { duration: 200, queue: C }) } }, show: { target: C, event: "mouseenter", effect: B, delay: 90, solo: C, ready: C, autofocus: C }, hide: { target: C, event: "mouseleave", effect: B, delay: 0, fixed: C, inactive: C, leave: "window", distance: C }, style: { classes: "", widget: C, width: C, height: C, def: B }, events: { render: D, move: D, show: D, hide: D, toggle: D, visible: D, hidden: D, focus: D, blur: D } }; var fb, gb = "margin", hb = "border", ib = "color", jb = "background-color", kb = "transparent", lb = " !important", mb = !!b.createElement("canvas").getContext, nb = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i, ob = {}, pb = ["Webkit", "O", "Moz", "ms"]; if (mb) var qb = a.devicePixelRatio || 1, rb = function() { var a = b.createElement("canvas").getContext("2d"); return a.backingStorePixelRatio || a.webkitBackingStorePixelRatio || a.mozBackingStorePixelRatio || a.msBackingStorePixelRatio || a.oBackingStorePixelRatio || 1 }(), sb = qb / rb; else var tb = function(a, b, c) { return "<qtipvml:" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (b || "") + ' style="behavior: url(#default#VML); ' + (c || "") + '" />' }; d.extend(v.prototype, { init: function(a) { var b, c; c = this.element = a.elements.tip = d("<div />", { "class": Q + "-tip" }).prependTo(a.tooltip), mb ? (b = d("<canvas />").appendTo(this.element)[0].getContext("2d"), b.lineJoin = "miter", b.miterLimit = 1e5, b.save()) : (b = tb("shape", 'coordorigin="0,0"', "position:absolute;"), this.element.html(b + b), a._bind(d("*", c).add(c), ["click", "mousedown"], function(a) { a.stopPropagation() }, this._ns)), a._bind(a.tooltip, "tooltipmove", this.reposition, this._ns, this), this.create() }, _swapDimensions: function() { this.size[0] = this.options.height, this.size[1] = this.options.width }, _resetDimensions: function() { this.size[0] = this.options.width, this.size[1] = this.options.height }, _useTitle: function(a) { var b = this.qtip.elements.titlebar; return b && (a.y === I || a.y === M && this.element.position().top + this.size[1] / 2 + this.options.offset < b.outerHeight(B)) }, _parseCorner: function(a) { var b = this.qtip.options.position.my; return a === C || b === C ? a = C : a === B ? a = new y(b.string()) : a.string || (a = new y(a), a.fixed = B), a }, _parseWidth: function(a, b, c) { var d = this.qtip.elements, e = hb + s(b) + "Width"; return (c ? u(c, e) : u(d.content, e) || u(this._useTitle(a) && d.titlebar || d.content, e) || u(d.tooltip, e)) || 0 }, _parseRadius: function(a) { var b = this.qtip.elements, c = hb + s(a.y) + s(a.x) + "Radius"; return bb.ie < 9 ? 0 : u(this._useTitle(a) && b.titlebar || b.content, c) || u(b.tooltip, c) || 0 }, _invalidColour: function(a, b, c) { var d = a.css(b); return !d || c && d === a.css(c) || nb.test(d) ? C : d }, _parseColours: function(a) { var b = this.qtip.elements, c = this.element.css("cssText", ""), e = hb + s(a[a.precedance]) + s(ib), f = this._useTitle(a) && b.titlebar || b.content, g = this._invalidColour, h = []; return h[0] = g(c, jb) || g(f, jb) || g(b.content, jb) || g(b.tooltip, jb) || c.css(jb), h[1] = g(c, e, ib) || g(f, e, ib) || g(b.content, e, ib) || g(b.tooltip, e, ib) || b.tooltip.css(e), d("*", c).add(c).css("cssText", jb + ":" + kb + lb + ";" + hb + ":0" + lb + ";"), h }, _calculateSize: function(a) { var b, c, d, e = a.precedance === F, f = this.options.width, g = this.options.height, h = "c" === a.abbrev(), i = (e ? f : g) * (h ? .5 : 1), j = Math.pow, k = Math.round, l = Math.sqrt(j(i, 2) + j(g, 2)), m = [this.border / i * l, this.border / g * l]; return m[2] = Math.sqrt(j(m[0], 2) - j(this.border, 2)), m[3] = Math.sqrt(j(m[1], 2) - j(this.border, 2)), b = l + m[2] + m[3] + (h ? 0 : m[0]), c = b / l, d = [k(c * f), k(c * g)], e ? d : d.reverse() }, _calculateTip: function(a, b, c) { c = c || 1, b = b || this.size; var d = b[0] * c, e = b[1] * c, f = Math.ceil(d / 2), g = Math.ceil(e / 2), h = { br: [0, 0, d, e, d, 0], bl: [0, 0, d, 0, 0, e], tr: [0, e, d, 0, d, e], tl: [0, 0, 0, e, d, e], tc: [0, e, f, 0, d, e], bc: [0, 0, d, 0, f, e], rc: [0, 0, d, g, 0, e], lc: [d, 0, d, e, 0, g] }; return h.lt = h.br, h.rt = h.bl, h.lb = h.tr, h.rb = h.tl, h[a.abbrev()] }, _drawCoords: function(a, b) { a.beginPath(), a.moveTo(b[0], b[1]), a.lineTo(b[2], b[3]), a.lineTo(b[4], b[5]), a.closePath() }, create: function() { var a = this.corner = (mb || bb.ie) && this._parseCorner(this.options.corner); return (this.enabled = !!this.corner && "c" !== this.corner.abbrev()) && (this.qtip.cache.corner = a.clone(), this.update()), this.element.toggle(this.enabled), this.corner }, update: function(b, c) { if (!this.enabled) return this; var e, f, g, h, i, j, k, l, m = this.qtip.elements, n = this.element, o = n.children(), p = this.options, q = this.size, r = p.mimic, s = Math.round; b || (b = this.qtip.cache.corner || this.corner), r === C ? r = b : (r = new y(r), r.precedance = b.precedance, "inherit" === r.x ? r.x = b.x : "inherit" === r.y ? r.y = b.y : r.x === r.y && (r[b.precedance] = b[b.precedance])), f = r.precedance, b.precedance === E ? this._swapDimensions() : this._resetDimensions(), e = this.color = this._parseColours(b), e[1] !== kb ? (l = this.border = this._parseWidth(b, b[b.precedance]), p.border && 1 > l && !nb.test(e[1]) && (e[0] = e[1]), this.border = l = p.border !== B ? p.border : l) : this.border = l = 0, k = this.size = this._calculateSize(b), n.css({ width: k[0], height: k[1], lineHeight: k[1] + "px" }), j = b.precedance === F ? [s(r.x === J ? l : r.x === L ? k[0] - q[0] - l : (k[0] - q[0]) / 2), s(r.y === I ? k[1] - q[1] : 0)] : [s(r.x === J ? k[0] - q[0] : 0), s(r.y === I ? l : r.y === K ? k[1] - q[1] - l : (k[1] - q[1]) / 2)], mb ? (g = o[0].getContext("2d"), g.restore(), g.save(), g.clearRect(0, 0, 6e3, 6e3), h = this._calculateTip(r, q, sb), i = this._calculateTip(r, this.size, sb), o.attr(G, k[0] * sb).attr(H, k[1] * sb), o.css(G, k[0]).css(H, k[1]), this._drawCoords(g, i), g.fillStyle = e[1], g.fill(), g.translate(j[0] * sb, j[1] * sb), this._drawCoords(g, h), g.fillStyle = e[0], g.fill()) : (h = this._calculateTip(r), h = "m" + h[0] + "," + h[1] + " l" + h[2] + "," + h[3] + " " + h[4] + "," + h[5] + " xe", j[2] = l && /^(r|b)/i.test(b.string()) ? 8 === bb.ie ? 2 : 1 : 0, o.css({ coordsize: k[0] + l + " " + (k[1] + l), antialias: "" + (r.string().indexOf(M) > -1), left: j[0] - j[2] * Number(f === E), top: j[1] - j[2] * Number(f === F), width: k[0] + l, height: k[1] + l }).each(function(a) { var b = d(this); b[b.prop ? "prop" : "attr"]({ coordsize: k[0] + l + " " + (k[1] + l), path: h, fillcolor: e[0], filled: !!a, stroked: !a }).toggle(!(!l && !a)), !a && b.html(tb("stroke", 'weight="' + 2 * l + 'px" color="' + e[1] + '" miterlimit="1000" joinstyle="miter"')) })), a.opera && setTimeout(function() { m.tip.css({ display: "inline-block", visibility: "visible" }) }, 1), c !== C && this.calculate(b, k) }, calculate: function(a, b) { if (!this.enabled) return C; var c, e, f = this, g = this.qtip.elements, h = this.element, i = this.options.offset, j = (g.tooltip.hasClass("ui-widget"), {}); return a = a || this.corner, c = a.precedance, b = b || this._calculateSize(a), e = [a.x, a.y], c === E && e.reverse(), d.each(e, function(d, e) { var h, k, l; e === M ? (h = c === F ? J : I, j[h] = "50%", j[gb + "-" + h] = -Math.round(b[c === F ? 0 : 1] / 2) + i) : (h = f._parseWidth(a, e, g.tooltip), k = f._parseWidth(a, e, g.content), l = f._parseRadius(a), j[e] = Math.max(-f.border, d ? k : i + (l > h ? l : -h))) }), j[a[c]] -= b[c === E ? 0 : 1], h.css({ margin: "", top: "", bottom: "", left: "", right: "" }).css(j), j }, reposition: function(a, b, d) { function e(a, b, c, d, e) { a === O && j.precedance === b && k[d] && j[c] !== M ? j.precedance = j.precedance === E ? F : E : a !== O && k[d] && (j[b] = j[b] === M ? k[d] > 0 ? d : e : j[b] === d ? e : d) } function f(a, b, e) { j[a] === M ? p[gb + "-" + b] = o[a] = g[gb + "-" + b] - k[b] : (h = g[e] !== c ? [k[b], -g[b]] : [-k[b], g[b]], (o[a] = Math.max(h[0], h[1])) > h[0] && (d[b] -= k[b], o[b] = C), p[g[e] !== c ? e : b] = o[a]) } if (this.enabled) { var g, h, i = b.cache, j = this.corner.clone(), k = d.adjusted, l = b.options.position.adjust.method.split(" "), m = l[0], n = l[1] || l[0], o = { left: C, top: C, x: 0, y: 0 }, p = {}; this.corner.fixed !== B && (e(m, E, F, J, L), e(n, F, E, I, K), (j.string() !== i.corner.string() || i.cornerTop !== k.top || i.cornerLeft !== k.left) && this.update(j, C)), g = this.calculate(j), g.right !== c && (g.left = -g.right), g.bottom !== c && (g.top = -g.bottom), g.user = this.offset, (o.left = m === O && !!k.left) && f(E, J, L), (o.top = n === O && !!k.top) && f(F, I, K), this.element.css(p).toggle(!(o.x && o.y || j.x === M && o.y || j.y === M && o.x)), d.left -= g.left.charAt ? g.user : m !== O || o.top || !o.left && !o.top ? g.left + this.border : 0, d.top -= g.top.charAt ? g.user : n !== O || o.left || !o.left && !o.top ? g.top + this.border : 0, i.cornerLeft = k.left, i.cornerTop = k.top, i.corner = j.clone() } }, destroy: function() { this.qtip._unbind(this.qtip.tooltip, this._ns), this.qtip.elements.tip && this.qtip.elements.tip.find("*").remove().end().remove() } }), fb = P.tip = function(a) { return new v(a, a.options.style.tip) }, fb.initialize = "render", fb.sanitize = function(a) { if (a.style && "tip" in a.style) { var b = a.style.tip; "object" != typeof b && (b = a.style.tip = { corner: b }), /string|boolean/i.test(typeof b.corner) || (b.corner = B) } }, z.tip = { "^position.my|style.tip.(corner|mimic|border)$": function() { this.create(), this.qtip.reposition() }, "^style.tip.(height|width)$": function(a) { this.size = [a.width, a.height], this.update(), this.qtip.reposition() }, "^content.title|style.(classes|widget)$": function() { this.update() } }, d.extend(B, w.defaults, { style: { tip: { corner: B, mimic: C, width: 6, height: 6, border: B, offset: 0 } } }), P.viewport = function(c, d, e, f, g, h, i) { function j(a, b, c, e, f, g, h, i, j) { var k = d[f], s = u[a], t = v[a], w = c === O, x = s === f ? j : s === g ? -j : -j / 2, y = t === f ? i : t === g ? -i : -i / 2, z = q[f] + r[f] - (n ? 0 : m[f]), A = z - k, B = k + j - (h === G ? o : p) - z, C = x - (u.precedance === a || s === u[b] ? y : 0) - (t === M ? i / 2 : 0); return w ? (C = (s === f ? 1 : -1) * x, d[f] += A > 0 ? A : B > 0 ? -B : 0, d[f] = Math.max(-m[f] + r[f], k - C, Math.min(Math.max(-m[f] + r[f] + (h === G ? o : p), k + C), d[f], "center" === s ? k - x : 1e9))) : (e *= c === N ? 2 : 0, A > 0 && (s !== f || B > 0) ? (d[f] -= C + e, l.invert(a, f)) : B > 0 && (s !== g || A > 0) && (d[f] -= (s === M ? -C : C) + e, l.invert(a, g)), d[f] < q && -d[f] > B && (d[f] = k, l = u.clone())), d[f] - k } var k, l, m, n, o, p, q, r, s = e.target, t = c.elements.tooltip, u = e.my, v = e.at, w = e.adjust, x = w.method.split(" "), y = x[0], z = x[1] || x[0], A = e.viewport, B = e.container, D = (c.cache, { left: 0, top: 0 }); return A.jquery && s[0] !== a && s[0] !== b.body && "none" !== w.method ? (m = B.offset() || D, n = "static" === B.css("position"), k = "fixed" === t.css("position"), o = A[0] === a ? A.width() : A.outerWidth(C), p = A[0] === a ? A.height() : A.outerHeight(C), q = { left: k ? 0 : A.scrollLeft(), top: k ? 0 : A.scrollTop() }, r = A.offset() || D, ("shift" !== y || "shift" !== z) && (l = u.clone()), D = { left: "none" !== y ? j(E, F, y, w.x, J, L, G, f, h) : 0, top: "none" !== z ? j(F, E, z, w.y, I, K, H, g, i) : 0, my: l }) : D } }) }(window, document);