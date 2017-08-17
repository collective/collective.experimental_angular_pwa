Search
======

    You can navigate to the search page from anywhere using the options menu on the 
    right top corner of the menu bar.

The search page has three main functions

* Searching a query and displaying the results.
* Sorting the queries.
* Filtering the queries.

Searching and Sorting
---------------------

This is handled easily using the resource service provided by the plone.restapi-angular package. 
Search results can be sorted by alphabetical order or by date.

Filtering
---------

Filtering is achieved using a separate popover. 
The popover only displays the content types which are currently present in the search results. 
They are checked by default hence showing all the search results. 

You can select or unselect whichever content types you need to filter out. 
Dismissing the popup will trigger a refresh of the search results, showing only the filtered results.

Passing of data between the popover and the search page is done through Ionic's events api. 
You can learn more about how it works in `Ionic's Events Api docs <http://ionicframework.com/docs/api/util/Events/>`_.