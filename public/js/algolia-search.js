/* global instantsearch, algoliasearch, CONFIG */

document.addEventListener('DOMContentLoaded', () =&gt; {
  const algoliaSettings = CONFIG.algolia;
  const { indexName, appID, apiKey } = algoliaSettings;

  let search = instantsearch({
    indexName,
    searchClient  : algoliasearch(appID, apiKey),
    searchFunction: helper =&gt; {
      let searchInput = document.querySelector('.search-input');
      if (searchInput.value) {
        helper.search();
      }
    }
  });

  window.pjax &amp;&amp; search.on('render', () =&gt; {
    window.pjax.refresh(document.getElementById('algolia-hits'));
  });

  // Registering Widgets
  search.addWidgets([
    instantsearch.widgets.configure({
      hitsPerPage: algoliaSettings.hits.per_page || 10
    }),

    instantsearch.widgets.searchBox({
      container           : '.search-input-container',
      placeholder         : algoliaSettings.labels.input_placeholder,
      // Hide default icons of algolia search
      showReset           : false,
      showSubmit          : false,
      showLoadingIndicator: false,
      cssClasses          : {
        input: 'search-input'
      }
    }),

    instantsearch.widgets.stats({
      container: '#algolia-stats',
      templates: {
        text: data =&gt; {
          let stats = algoliaSettings.labels.hits_stats
            .replace(/\$\{hits}/, data.nbHits)
            .replace(/\$\{time}/, data.processingTimeMS);
          return `${stats}
            <span class="algolia-powered">
              <img src="${CONFIG.root}images/algolia_logo.svg" alt="Algolia">
            </span>
            <hr>`;
        }
      }
    }),

    instantsearch.widgets.hits({
      container: '#algolia-hits',
      templates: {
        item: data =&gt; {
          let link = data.permalink ? data.permalink : CONFIG.root + data.path;
          return `<a href="${link}" class="algolia-hit-item-link">${data._highlightResult.title.value}</a>`;
        },
        empty: data =&gt; {
          return `<div id="algolia-hits-empty">
              ${algoliaSettings.labels.hits_empty.replace(/\$\{query}/, data.query)}
            </div>`;
        }
      },
      cssClasses: {
        item: 'algolia-hit-item'
      }
    }),

    instantsearch.widgets.pagination({
      container: '#algolia-pagination',
      scrollTo : false,
      showFirst: false,
      showLast : false,
      templates: {
        first   : '<i class="fa fa-angle-double-left"></i>',
        last    : '<i class="fa fa-angle-double-right"></i>',
        previous: '<i class="fa fa-angle-left"></i>',
        next    : '<i class="fa fa-angle-right"></i>'
      },
      cssClasses: {
        root        : 'pagination',
        item        : 'pagination-item',
        link        : 'page-number',
        selectedItem: 'current',
        disabledItem: 'disabled-item'
      }
    })
  ]);

  search.start();

  // Handle and trigger popup window
  document.querySelectorAll('.popup-trigger').forEach(element =&gt; {
    element.addEventListener('click', () =&gt; {
      document.body.style.overflow = 'hidden';
      document.querySelector('.search-pop-overlay').classList.add('search-active');
      document.querySelector('.search-input').focus();
    });
  });

  // Monitor main search box
  const onPopupClose = () =&gt; {
    document.body.style.overflow = '';
    document.querySelector('.search-pop-overlay').classList.remove('search-active');
  };

  document.querySelector('.search-pop-overlay').addEventListener('click', event =&gt; {
    if (event.target === document.querySelector('.search-pop-overlay')) {
      onPopupClose();
    }
  });
  document.querySelector('.popup-btn-close').addEventListener('click', onPopupClose);
  window.addEventListener('pjax:success', onPopupClose);
  window.addEventListener('keyup', event =&gt; {
    if (event.key === 'Escape') {
      onPopupClose();
    }
  });
});
<script type="text&#x2F;javascript" src="https://cdn.jsdelivr.net/npm/kity@2.0.4/dist/kity.min.js"></script><script type="text&#x2F;javascript" src="https://cdn.jsdelivr.net/npm/kityminder-core@1.4.50/dist/kityminder.core.min.js"></script><script defer="true" type="text&#x2F;javascript" src="https://cdn.jsdelivr.net/npm/hexo-simple-mindmap@0.7.0/dist/mindmap.min.js"></script><link rel="stylesheet" type="text&#x2F;css" href="https://cdn.jsdelivr.net/npm/hexo-simple-mindmap@0.7.0/dist/mindmap.min.css">