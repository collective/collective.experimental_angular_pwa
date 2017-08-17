Navigation
==========

    Navigation in this PWA is majorly being handled using angular traversal.

You can read about the advantages of using traversal rather than routing, why it is favourable for CMSes and how to use it here `Angular Traversal <https://github.com/makinacorpus/angular-traversal>`_. 
We are also using the ionic stack method of pushing and popping in pages for navigtion.

Ionic's Stack Navigation
------------------------

The different pages for login, home, search, settings etc use ionic's stack method to navigate between pages.
In this method each new page is pushed on top of the stack, and when going back the current page is popped off the stack.

Angular Traversal
-----------------

The home page contains the tag::

    <traverser-outlet></traverser-outlet>

This is the view rendering location. All the plone views are rendered here, i.e while traversing through the different plone views we are actually on the home page of the ionic navigation stack.

Global Navigation
-----------------

Global navigation has been implemented using a side-nav in the app. It uses the navigation component to display the top level menu items of the plone site.

Local Navigation
----------------

Local Navigation is implemented through the use of sliding breadcumbs. It uses the breadcrumbs component. In case of longer hierarchies, older breadcrumbs are hidden and can be revealed by sliding along the breadcrumb trail.
