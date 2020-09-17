import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import {
    searchBox,
    hits,
    clearRefinements,
    refinementList
} from 'instantsearch.js/es/widgets';

const INDEX_NAME = 'smartphones';

const hitTemplate = `
    <div class='rounded border-gray-400 border-2 p-3'>
        <h3 class='text-green-700'>
            \<b>{{#helpers.highlight}}{ "attribute": "brand" }{{/helpers.highlight}}</b>
            - 
            \{{#helpers.highlight}}{ "attribute": "model" }{{/helpers.highlight}}
        </h3>
    <div class="hit-name">
        {{decription}}
    </div>
    <div class="hit-price font-bold">\Q {{price}}</div>
    </div>
`;

const searchClient = algoliasearch(
    '4VCSQFE3Q3',
    '50f56ce2a7fcbb0004927b39aacc7381'
);

const search = instantsearch({
    indexName: INDEX_NAME,
    searchClient
});

search.addWidgets([
    searchBox({
        container: '#searchbox',
        placeholder: 'Search...',
        showReset: false,
        showSubmit: false,
    }),
    clearRefinements({
        container: '#clear-refinements',
    }),
    refinementList({
        container: '#brand-list',
        attribute: 'brand'
    }),
    hits({
        container: '#hits',
        templates: {
            item: hitTemplate,
        },
    }),
]);

search.start();