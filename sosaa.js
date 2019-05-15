(function($) {
  Drupal.behaviors.mySosaa = {
    attach: function (context, settings) {
      //code starts 

      /**
       * Removes the Views Ajax scrolling.
       */
      if (Drupal.ajax) Drupal.ajax.prototype.commands.viewsScrollTop = null;

      /** 
       * Call-up form function. 
       */      
      function setFields() {  
        $("input[id*='other'], option[id*='other']").each(function (index) {
          var str = this.id;
          var no_str = this.id;
          str = str.replace("other", "otext");
          no_str = no_str.replace("other", "notext");
          if ($(this).is(':checked') || $(this).is(':selected')) {
            $('label[for="' + str + '"]').addClass("required");
            $('label[for="' + str + '"]').children('strong').show();
            $('#' + str).attr("required", "required");
            $('#' + str).removeAttr("disabled");

            $('label[for="' + no_str + '"]').removeClass("required");
            $('label[for="' + no_str + '"]').children('strong').hide();
            $('#' + no_str).removeAttr("required");
            $('#' + no_str).attr("disabled", "disabled");
          } else {
            $('label[for="' + str + '"]').removeClass("required");
            $('label[for="' + str + '"]').children('strong').hide();
            $('#' + str).removeAttr("required");
            $('#' + str).attr("disabled", "disabled");

            $('label[for="' + no_str + '"]').addClass("required");
            $('label[for="' + no_str + '"]').children('strong').show();
            $('#' + no_str).attr("required", "required");
            $('#' + no_str).removeAttr("disabled");
          }
        });
        function goToAnchor(anchor) {
          var loc = document.location.toString().split('#')[0];
          document.location = loc + '#' + anchor;
          return false;
        }
    
        //Reset of sum, values and whatnot
        $('input[id^="cell_price-"]').each(function () {
          var val = parseFloat(this.value);
          var row = this.id.split('-')[1];
          if (this.value != "" && !isNaN(val)) {
            var qty = parseInt($('#cell_qty-' + row).val());
            if (!isNaN(qty) && qty != 0) {
              $('#cell_sub-' + row).val((qty * val).toFixed(2));
            } else {
              $('#cell_sub-' + row).val((0).toFixed(2));
            }
          } else {
            $('#cell_sub-' + row).val("");
          }
        });
        var total = 0;
        $('input[id^="cell_sub-"]').each(function () {
          var val = parseFloat(this.value);
          if (this.value != "" && !isNaN(val)) {
            total += val;
          }
        });
        $('#cell_total').val(total.toFixed(2));
        $('#field9').val(total.toFixed(2));
        var revided_total = total;
        $('#field8').each(function () {
          var val = parseFloat(this.value);
          if (this.value != "" && !isNaN(val)) {
            revided_total += val;
          }
        });
        $('#field10').val(revided_total.toFixed(2));
      }

      /**
       * This sets up the additional text.
       */
      var helper_text_array = [
        // (My Agreements)
        { 
          field_name: 'Key word search',
          field_id: '#filter-filter-search_api_views_fulltext label', 
          field_helper_text: Drupal.t('Keyword Search allows Boolean operators AND, OR, NOT (in all caps) along with quotation marks ("…"). Visit the Search tips page for more information. '), 
          field_placehoder_id: '', 
          field_placehoder_text: '',
          field_description_id: '', 
          field_description_text: '' 
        },
        { 
          field_name: 'Filter your results',
          field_id: '#edit-secondary-main header.panel-heading h3', 
          field_helper_text: Drupal.t('Apply one or more filters to refine your search results.'), 
          field_placehoder_id: '', 
          field_placehoder_text: '',
          field_description_id: '', 
          field_description_text: '' 
        },
        { 
          field_name: 'Departments/Agencies/Crown corporations',
          field_id: '.pane-facetapi-almg8a3hcmt1inc0hsfz1lfhojw0tdm5 h4', 
          field_helper_text: Drupal.t('Select a department to refine your search results. You will always see agreements by "Public Services and Procurement Canada (PSPC)," since PSPC procures on behalf of other government departments.'),
          field_placehoder_id: '',
          field_placehoder_text: '',
          field_description_id: '', 
          field_description_text: '' 
        },
        { 
          field_name: 'Region of delivery',
          field_id: '.pane-facetapi-g0gb9e049kwspngd1sg11fopl80ax0cb h4', 
          field_helper_text: Drupal.t('Select a region of delivery to refine your search results. Some results (for example a province or territory) will include results for "Canada" since these agreements are available to all regions.'),
          field_placehoder_id: '', 
          field_placehoder_text: '',
          field_description_id: '', 
          field_description_text: '' 
        },
        { 
          field_name: 'Mandatory commodities',
          field_id: '.pane-facetapi-r4wxguez2e0yh0qtrcroluvoevi9mkmd h4', 
          field_helper_text: Drupal.t("Select one of the Treasury Board of Canada's 12 mandatory commodities, if applicable, to refine your search results."), 
          field_placehoder_id: '', 
          field_placehoder_text: '',
          field_description_id: '', 
          field_description_text: '' 
        },
        { 
          field_name: 'Authorized provincial/territorial users',
          field_id: '.pane-facetapi-x7dcbdz1ia3tueixqy4ozp4o3u267evh h4', 
          field_helper_text: Drupal.t('The "Non-Federal Authorized Provincial/Territorial User" refers to Canadian provincial and territorial government authorized entities which procures goods or services, as specifically identified in the Procurement Instrument.'), 
          field_placehoder_id: '', 
          field_placehoder_text: '',
          field_description_id: '', 
          field_description_text: '' 
        },
        { 
          field_name: 'Canadian Collaborative Procurement Initiative (CCPI)',
          field_id: '.pane-facetapi-umtiesy0qyn2rp6delww1ypsjnzb80yp h4', 
          field_helper_text: Drupal.t('Participants are comprised of provincial and territorial governments who signed a Master User agreement with Public Services Procurement Canada (PSPC), enabling them to use Government of Canada procurement instruments to procure goods and services. Benefits include better pricing, terms and conditions and savings in administrative costs.'), 
          field_placehoder_id: '', 
          field_placehoder_text: '',
          field_description_id: '', 
          field_description_text: '' 
        },
        // (My Workspace)
        { 
          field_name: 'Title',
          field_id: '#filter-filter-title_field_value label', 
          field_helper_text: Drupal.t('Use a space to separate multiple entries. You can also include partial entries, for example "ACTIVE GEAR" instead of "ACTIVE GEAR CO OF CANADA LTD (W8486-162848/001/HS)."'), 
          field_placehoder_id: '#views-exposed-form-wetkit-og-all-user-group-content-wetkit-og-my-workspace #edit-title-field-value', 
          field_placehoder_text: Drupal.t('Ex. "DELL CANADA..."'), 
          field_description_id: '', 
          field_description_text: '' 
        },
        { 
          field_name: 'Commodity',
          field_id: '#filter-filter-field_code_value label', 
          field_helper_text: Drupal.t('Type a Goods and Service Identification Number (GSIN). Use a space to separate multiple entries. You can also include partial entries, for example "N75" instead of "N7510."'), 
          field_placehoder_id: '#edit-field-code-value', 
          field_placehoder_text: Drupal.t('Ex. "N7010"'), 
          field_description_id: '', 
          field_description_text: '' 
        },
        { 
          field_name: 'Group',
          field_id: '#filter-filter-local_group_filter label', 
          field_helper_text: Drupal.t('You can include partial entries, for example "B" instead of "BB-ML."'),
          field_placehoder_id: '#edit-local-group-filter', 
          field_placehoder_text: Drupal.t('Ex. "MD"'), 
          field_description_id: '', 
          field_description_text: '' 
        },
        { 
          field_name: 'Status',
          field_id: '', 
          field_helper_text: '', 
          field_placehoder_id: '', 
          field_placehoder_text: '', 
          field_description_id: 'filter-filter-state', 
          field_description_text: Drupal.t('Use "Ctrl" to select multiple items.')
        },
        { 
          field_name: 'Type',
          field_id: '', 
          field_helper_text: '', 
          field_placehoder_id: '', 
          field_placehoder_text: '', 
          field_description_id: 'filter-filter-combine_select', 
          field_description_text: Drupal.t('Use "Ctrl" to select multiple items.')
        },
        { 
          field_name: 'Authorized provincial/territorial users',
          field_id: '#filter-filter-combine_select_1 label',
          field_helper_text: Drupal.t('The "Non-Federal Authorized Provincial/Territorial User" refers to Canadian provincial and territorial government authorized entities which procures goods or services, as specifically identified in the Procurement Instrument.'), 
          field_placehoder_id: '', 
          field_placehoder_text: '', 
          field_description_id: 'filter-filter-combine_select_1', 
          field_description_text: Drupal.t('Use "Ctrl" to select multiple items.')
        },
        {
          field_name: 'Contact name',
          field_id: '',
          field_helper_text: '',
          field_placehoder_id: '#edit-field-contact-name-value',
          field_placehoder_text: Drupal.t('Ex. "John Doe"'),
          field_description_id: '',
          field_description_text: ''
        },
        { 
          field_name: 'Operations',
          field_id: '#views-form-wetkit-og-all-user-group-content-wetkit-og-my-workspace #edit-select legend span', 
          field_helper_text: Drupal.t('Select items from the list and use these buttons for bulk operations.'), 
          field_placehoder_id: '',
          field_placehoder_text: '', 
          field_description_id: '', 
          field_description_text: '' 
        },
        // (My Groups)
        { 
          field_name: 'Group name',
          field_id: '#edit-title-field-value-wrapper label', 
          field_helper_text: Drupal.t('You can include partial entries, for example "B" instead of "BB-ML."'),
          field_placehoder_id: '#views-exposed-form-wetkit-og-groups-wetkit-og-groups-my-groups #edit-title-field-value', 
          field_placehoder_text: Drupal.t('Ex. "MD"'), 
          field_description_id: '', 
          field_description_text: '' 
        },
        { 
          field_name: 'Commodities',
          field_id: '#edit-field-code-value-wrapper label', 
          field_helper_text: Drupal.t('Type a Goods and Service Identification Number (GSIN). Use a space to separate multiple entries. You can also include partial entries, for example "N75" instead of "N7510."'), 
          field_placehoder_id: '', 
          field_placehoder_text: '',
          field_description_id: '', 
          field_description_text: '' 
        },
        { 
          field_name: 'Contact email',
          field_id: '', 
          field_helper_text: '', 
          field_placehoder_id: '#edit-field-contact-email-email', 
          field_placehoder_text: Drupal.t('Ex. "example@canada.ca"'),
          field_description_id: '', 
          field_description_text: '' 
        },
        { 
          field_name: 'Operations',
          field_id: '#views-form-wetkit-og-groups-wetkit-og-groups-my-groups #edit-select legend span', 
          field_helper_text: Drupal.t('Select items from the list and use this button for bulk operations.'),
          field_placehoder_id: '',
          field_placehoder_text: '', 
          field_description_id: '', 
          field_description_text: '' 
        },
        { 
          field_name: 'User (required)',
          field_id: '', 
          field_helper_text: '', 
          field_placehoder_id: '#edit-og-user #edit-name', 
          field_placehoder_text: Drupal.t('Ex. "John Doe (John.Doe@canada.ca)"'),
          field_description_id: '', 
          field_description_text: '' 
        },
        // (Agreement view)
        {
          field_name: 'Minimum value',
          field_id: '.view-display-id-details_pane .views-label-field-min-call-up-revision-id',
          field_helper_text: Drupal.t('The "Minimum value" of a standing offer refers to "Minimum call-up limitation", while "Minimum value" of a supply arrangement refers to "Minimum contract value".'),
          field_placehoder_id: '',
          field_placehoder_text: '',
          field_description_id: '',
          field_description_text: ''
        },
        {
          field_name: 'Maximum value',
          field_id: '.view-display-id-details_pane .views-label-field-max-call-up-revision-id',
          field_helper_text: Drupal.t('The "Maximum value" of a standing offer refers to "Maximum call-up limitation", while "Maximum value" of a supply arrangement refers to "Maximum contract value".'),
          field_placehoder_id: '',
          field_placehoder_text: '',
          field_description_id: '',
          field_description_text: ''
        },
        {
          field_name: 'Authorized provincial/territorial users',
          field_id: '.view-display-id-details_pane .views-label-field-authorized-prov-terr-user-revision-id',
          field_helper_text: Drupal.t('The "Non-Federal Authorized Provincial/Territorial User" refers to Canadian provincial and territorial government authorized entities which procures goods or services, as specifically identified in the Procurement Instrument.'),
          field_placehoder_id: '',
          field_placehoder_text: '',
          field_description_id: '',
          field_description_text: ''
        },
        // (Agreement edit)
        {
          field_name: 'Minimum value',
          field_id: '#sosa-node-form #edit-field-min-call-up-und-0-value-label',
          field_helper_text: Drupal.t('The "Minimum value" of a standing offer refers to "Minimum call-up limitation", while "Minimum value" of a supply arrangement refers to "Minimum contract value".'),
          field_placehoder_id: '',
          field_placehoder_text: '',
          field_description_id: '',
          field_description_text: ''
        },
        {
          field_name: 'Maximum value',
          field_id: '.view-display-id-sosa_prepopulated_fields .views-label-field-max-call-up-revision-id',
          field_helper_text: Drupal.t('The "Maximum value" of a standing offer refers to "Maximum call-up limitation", while "Maximum value" of a supply arrangement refers to "Maximum contract value".'),
          field_placehoder_id: '',
          field_placehoder_text: '',
          field_description_id: '',
          field_description_text: ''
        },
        {
          field_name: 'Keyword ENG',
          field_id: '#edit-field-metatag-keywords-en-0-value-label',
          field_helper_text: Drupal.t('Please enter a comma-separated list of keywords about the page.'),
          field_placehoder_id: '',
          field_placehoder_text: '',
          field_description_id: '',
          field_description_text: ''
        },
        {
          field_name: 'Keyword FR',
          field_id: '#edit-field-metatag-keywords-fr-0-value-label',
          field_helper_text: Drupal.t('Please enter a comma-separated list of keywords about the page.'),
          field_placehoder_id: '',
          field_placehoder_text: '',
          field_description_id: '',
          field_description_text: ''
        },
        {
          field_name: 'Authorized provincial/territorial users',
          field_id: '#edit-field-authorized-prov-terr-user-und-label',
          field_helper_text: Drupal.t('The "Non-Federal Authorized Provincial/Territorial User" refers to Canadian provincial and territorial government authorized entities which procures goods or services, as specifically identified in the Procurement Instrument.'),
          field_placehoder_id: '',
          field_placehoder_text: '',
          field_description_id: '',
          field_description_text: ''
        },
        { // price list
	      field_name: 'Authorized provincial/territorial users',
	      field_id: '[id^="edit-field-price-lists-und-"][id$="-field-supdoc-auth-prov-users-und-label"]',
	      field_helper_text: Drupal.t('The "Non-Federal Authorized Provincial/Territorial User" refers to Canadian provincial and territorial government authorized entities which procures goods or services, as specifically identified in the Procurement Instrument.'),
	      field_placehoder_id: '',
	      field_placehoder_text: '',
	      field_description_id: '',
	      field_description_text: ''
        },
      ]
      for (i = 0; i < helper_text_array.length; i++) {
        if (helper_text_array[i].field_id != '') {
          var exists = 0 != $(helper_text_array[i].field_id+' a.tooltip').length; 
          if (exists) {
          }else{
            $(helper_text_array[i].field_id).append('<a href="#" class="tooltip"><span class="tooltiptext">' + helper_text_array[i].field_helper_text + '</span></a>');
          }
        }
        if (helper_text_array[i].field_placehoder_id != '') {
          $(helper_text_array[i].field_placehoder_id).attr("placeholder", helper_text_array[i].field_placehoder_text);
        }
        if (helper_text_array[i].field_description_id != '') {
          var exists = 0 != $('#' + helper_text_array[i].field_description_id + '--description').length; 
          if (exists) {
          }else{
            $('#' + helper_text_array[i].field_description_id + ' label').after('<div id="' + helper_text_array[i].field_description_id + '--description" class="help-block">' + helper_text_array[i].field_description_text + '</div>');
          }
        }
      }
      $('a.tooltip').click(function(e){
        e.preventDefault();
      });

      /**
       * onClick event for Show More buttons.
       */
      $('.facetapi-limit-link').click(function(e) {
        var thisUL = $(this).siblings('ul');
        thisUL.find('li[style*="display: list-item"]:first')
          .children('a')
          .focus(); 
      });

      /**
       * onClick event for Facet Reset button.
       */
      $('#facet-reset-button').click(function(e) {
        e.stopPropagation();
        var current_url = window.location.href; //Get the current URL
        var url_array = current_url.split('?'); //Split into the URL and the Query String
        var old_url = url_array[0]; //Set the URL
        var query_string = url_array[1]; //Set the querry string. 
        var query_array = (query_string != undefined)? query_string.split('&') : null; //Get each querry
        var new_url = '?'; //Start setting the new URL
        query_array.forEach(function(element) {
          if (element.indexOf('f%5B', 0) === 0) { //If the querry is NOT from the facets, write it to the new URL
          }else{
            new_url = new_url + '&' + element; 
          }
        });
        new_url = new_url.replace("?&", "?"); //Clean the new Querry String
        window.location.href = old_url+new_url; //Go to the URL
      });

      /**
       * Set pill style on focus
       * pillFocusIn and pillFocus out are also used below, for the my-agreements page
       */
      function pillFocusIn(e) {
        var li = e.delegateTarget;
        $(li).addClass('focus');
      }
      function pillFocusOut(e) {
        var li = e.delegateTarget;
        $(li).removeClass('focus');
      }
      // pill focus style for local_multiselect. Keeping it here because the style is currently common.
      $('.local-multiselect-selected-wrapper li').focusin(pillFocusIn).focusout(pillFocusOut);

      /*$('#edit-submit-wetkit-search-api').click(function(e){ //Capture the click and see if we should scroll
        window.editsubmitwetkitsearchapiclick = true;
      });*/

      $(document).ready(function() {
        /** Disable the Client Support checkbox. #25761
         * The check box can not be selected for the bulk operations, 
         * the wetkit_og_form_views_form_wetkit_og_groups_wetkit_og_groups_my_groups_alter 
         * function prevents this, this script is for aesthetics. 
         */
        $("input[type=checkbox][value=7183]").attr("disabled", true);

        // Disable the Reset Filters button unless there are checked filters.
        $("#facet-reset-button").attr("disabled", "disabled");

        // Update the Provincial facets to select the Canada facet as well. 
        $("#facetapi-facet-search-apinode-index-block-field-delivery-pointreverse-hierarchy ul a.facetapi-inactive").each(function(a){
          var prov_href = $(this).attr('href'),
              canada = 'field_delivery_point%2524reverse_hierarchy%3A1693';
          if (prov_href.search(canada)<0){
            prov_href = prov_href + '&f%5B20%5D=' + canada;
            $(this).attr('href', prov_href);
          }
        });

        //Apply external link information to the My accounts button. 
        var my_account_text = Drupal.t('This link will take you to an external site.');
        $('a[href*="/idm"]').attr("target", "_blank").append('<span class="wb-inv">' + my_account_text + '</span>');

        // note: these changes do apply correctly in IE 11 due to a known bug
        var isIE11 = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
        if (isIE11) {
          $("input[id*='-sosa-compound-field-description']").click(function(){
            $(this).trigger("select");
          });
          $("input[id*='-field-file-description']").click(function(){
            $(this).trigger("select");
          });
        }
        $(document).ajaxStart(function() {
          $(".btn:disabled").addClass("has_disabled");
          $(".btn:not(.has_disabled)").attr("disabled", "disabled");
          $(".btn:not(.has_disabled)").addClass("ajax_disabled");
        });
        $(document).ajaxStop(function() { 
          $(".ajax_disabled").removeAttr("disabled");
          $(".ajax_disabled").removeClass("ajax_disabled");
          $(".has_disabled").removeClass("has_disabled");
        });
        $(document).ajaxSuccess(function() {

          $(".ajax_disabled").removeAttr("disabled");
          $(".ajax_disabled").removeClass("ajax_disabled");
          $(".has_disabled").removeClass("has_disabled");

          //Function to scroll to the top of the search results.
          if ($('table.views-table').length) {
            var divPosition = $('table.views-table').offset();
            $('html, body').animate({scrollTop: divPosition.top}, 100);
          }

          // Fix to keep persistent search query when switching language and using ajax search
          var url = window.location.href;
          var url_param_index = url.indexOf('?');
          if(url_param_index > 0) {
            var language_url = $('#wb-lng a').attr('href');
            var language_url_param_index = language_url.indexOf('?');
            if(language_url_param_index > 0) {
              language_url = language_url.substring(0, language_url_param_index) + url.substring(url_param_index);
            }
            else {
              language_url = language_url + url.substring(url_param_index);
            }
            $('#wb-lng a').attr('href', language_url);
          }

        });

        // Edit Language switch link.
        var sw_url = $('#wb-lng a').attr('href'),
        new_sw_url = sw_url.replace(/&page=\d*/, '');

        /* This is a bandaid until we can fix the issue correctly. 
        if ($('body.i18n-fr').length) {
          console.log('390');
          new_sw_url = new_sw_url.replace('%3ABiens', '%3AGoods');
        }
        if ($('body.i18n-en').length) {
          console.log('394');
          new_sw_url = new_sw_url.replace('%3AGoods', '%3ABiens');
        }
        */
        
        $('#wb-lng a').attr('href', new_sw_url);

        //https://sosaa.llangill.fr.deen-gc.ca/mes-accords?search_api_views_fulltext=pens&apply_filter=yes&sort_by=search_api_relevance&items_per_page=10&edit-submit-wetkit-search-api=Search&page=2

        /*
        var queryParameters = {}, 
        queryString = location.search.substring(1),
        re = /([^&=]+)=([^&]*)/g, m;
        new_sort_by = $('#edit-sort-by').val(),
        new_items_per_page = $('#edit-items-per-page').val();
        while (m = re.exec(queryString)) {
          queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        queryParameters['sort_by'] = new_sort_by;
        queryParameters['items_per_page'] = new_items_per_page;
        location.search = $.param(queryParameters);

        */

        //Track the search in Piwik.
        $('#edit-submit-wetkit-search-api').click(function(e){ 
          window._paq.push(['trackPageView']);
          if (typeof _paq !== 'undefined') { //make sure Piwik JS library is loaded
            var keyword_search = $('#edit-search-api-views-fulltext').val();
            // Commenting out the Piwik tracking of the Keyword Search button for 2.4.4
            //_paq.push(["trackSiteSearch", keyword_search, "keyword_search", false]);
          }
        });

        /* *** Check to see if the maximum number of items is reached. *** */
        /* *** If it is, disable the "Add another item" button. *** */

        //Setting the max to 10 for testing.
        var max_docs = 125;

        //Additional Items
        var num_agree_docs = $('table[id^="field-additional-items-values"] tr').length;
        if (num_agree_docs > max_docs) {
          $('button[name="field_additional_items_add_more"]').addClass('disabled');
        }

        //Price List
        var num_agree_docs = $('table[id^="field-price-lists-values"] tr').length;
        if (num_agree_docs > max_docs) {
          $('button[name="field_price_lists_add_more"]').addClass('disabled');
        }

        //Websites
        var num_agree_docs = $('table[id^="field-websites-values"] tr').length;
        if (num_agree_docs > max_docs) {
          $('button[name="field_websites_add_more"]').addClass('disabled');
        }

        /**
         * Various modifications made to the pages. (For accessibility.)
         */

        //If we are on the French My Agreements page, add the <br> to the header of Groupes de produits obligatoires
        if ($('body.i18n-fr #mandatory-commodities h4').length){
          var MCText = $('body.i18n-fr #mandatory-commodities h4').html();
          MCText = MCText.replace("produits obligatoires", "produits<br>obligatoires");
          $('body.i18n-fr #mandatory-commodities h4').html(MCText);
        }

        //If we are on the French My Agreements page, add the <br> to the header of Utilisateur non-fédéral, provincial ou territorial autorisé
        if ($('body.i18n-fr #authorized-provincial-territorial-users h4').length){
          var MCText = $('body.i18n-fr #authorized-provincial-territorial-users h4').html();
          MCText = MCText.replace("territorial autorisé", "territorial<br>autorisé");
          $('body.i18n-fr #authorized-provincial-territorial-users h4').html(MCText);
        }

        var search_button_text = $('#edit-submit-wetkit-search-api').text();
        $('#edit-submit-wetkit-search-api')
          .removeClass('btn-default')
          .addClass('btn-primary')
          .html('<span>' + search_button_text + '</span>');

        //Apply the Sort by and Results per page.
        $('#button-apply-sort-per-page').click(function(e){
          e.preventDefault();
          var queryParameters = {}, 
              queryString = location.search.substring(1),
              re = /([^&=]+)=([^&]*)/g, m;
              new_sort_by = $('#edit-sort-by').val(),
              new_items_per_page = $('#edit-items-per-page').val();
          while (m = re.exec(queryString)) {
            queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
          }
          queryParameters['sort_by'] = new_sort_by;
          queryParameters['items_per_page'] = new_items_per_page;
          location.search = $.param(queryParameters);
        });

        /**
         * Prepend the selected filters to the results summary.
         * Enable the Facet Reset button
         * Track Facets in Piwik
         */
        var pillText = '<br />' + Drupal.t('You have applied the following filters to the search results below: ');
        if ($('.facetapi-active').length) {
          $("#facet-reset-button").removeAttr("disabled"); //Enable the Reset Filters button.
          if (!$('.results_summary').length) {
            $('.view-empty').before('<div class="results_summary" />');
          }
          $('.results_summary').prepend('<ul id="selected_filters" />');
          $('.results_summary').prepend(pillText);
          $('.facetapi-active').each(function(a){
            var a_id = $(this).attr('id'),
                a_href = $(this).attr('href'),
                li_text = $(this).closest('li').clone().children().remove().end().text(),
                pill_title_text = li_text;
            if ((li_text == 'Yes')||(li_text == 'No')||(li_text == 'Oui')||(li_text == 'Non')) {
              var ul_id = $(this).closest('li').parent().attr('id');
              if (ul_id.indexOf('ccpi') != -1) {
                pill_title_text = Drupal.t('Canadian Collaborative Procurement Initiative: ')+li_text;
                li_text = Drupal.t('CCPI: ')+li_text;
              }else{
                pill_title_text = Drupal.t('Comprehensive Land Claim Agreement: ')+li_text;
                li_text = Drupal.t('CLCA: ')+li_text;
              }
            }
            var pillTitle = Drupal.t('Remove @text filter', {"@text": pill_title_text});
            var build_li = '<li class="leaf" id="'+a_id+'_pill_li"><a href="'+a_href+'" rel="nofollow" id="pill_'+a_id+'" title="' + pillTitle + '">'+li_text+'</li>';
            $(build_li).appendTo('#selected_filters');
            
            // Piwik - track the facets - commented out for 2.4.4
            //_paq.push(["trackSiteSearch", keyword_search, "keyword_search", false]);

            // My Agreements pills, style on focus
            $('#selected_filters li').focusin(pillFocusIn).focusout(pillFocusOut);
          });
        }
      });
      //Code for Select all.
      $('#vbo-select-all').click(function(s){
        $('.vbo-select:not("input[type=checkbox][value=7183]")').prop('checked', $(this).prop('checked'));
      });

      /** 
       * Call-up form function. 
       */

      //Set up Variables.
        
      var row_count = 6,
          min_row = 6,
          empty_row;
      
      empty_row = $('#row-1').clone();
      $('#row_rem').hide();
      setFields();

      //Print Button.
      $('#print-button').click(function () {
        $('#cuaso-form').validate();
        setTimeout(function () {
          if ($('#cuaso-form').valid()){
            /* Commenting out the Piwik tracking of the Print button for 2.4.4
            if ($('.i18n-en').length) { //If on the English page
              push_track_event = 'Issue Call-up Form (EN)';
            }else{
              push_track_event = 'Issue Call-up Form (FR)';
            }
            if (typeof _paq !== 'undefined') { //make sure Piwik JS library is loaded
              _paq.push(['trackEvent', push_track_event, 'print-call-up-form', 'print']);
            } */
            window.print();
          }
        }, 200);
      });

      //Add button
      $('.add-button').on('click', function () {
        var temp;
        var index;
        temp = empty_row.clone();
        row_count++;
        index = row_count;
        temp.attr('id', 'row-' + index);
        var id_arr = temp.find("input, textarea") //Find the tags
          .map(function () { return this.id; }) //ids
          .get(); //ToArray
        var name_arr = temp.find("input, textarea") //Find the tags
          .map(function () { return this.name; }) //names
          .get(); //ToArray
        for (var j = 0; j < id_arr.length; j++) {
          var head = id_arr[j].split('-');
          temp.find('#' + id_arr[j]).attr('title', temp.find('#' + id_arr[j]).attr('title').replace(head[1], index));
          temp.find('#' + id_arr[j]).attr('id', head[0] + '-' + index);
        }
        for (var j = 0; j < name_arr.length; j++) {
          var head = name_arr[j].split('-');
          temp.find('[name="' + name_arr[j] + '"]').attr('name', head[0] + '-' + index);
        }
        if (row_count > min_row) {
          $('#row_rem').show();
        }
        temp.insertAfter('#row-' + (index - 1));
      });

      //Delete button
      $('.rem-button').on('click', function () {
        var index = row_count;
        $('#row-' + index).remove();
        row_count--;
        if (row_count <= min_row) {
          $('#row_rem').hide();
          $('row_add').focus();
        }
      });

      $(document).on('change', 'input[type=checkbox],select,input[type=radio]', function () {
        setFields();
      });

      $(document.body).on('blur', 'input, select, textarea, button', function () {
        setFields();
      });

      //Reset button
      $('#cleardata').on('click', function (e) {
        if(window.location.hash){
          //Nothing
        }else{
          window.location.href='#cuaso-form';
        }
        location.reload(true);
      });
      /* END Call-up form function. */
    }
  };
})(jQuery);
