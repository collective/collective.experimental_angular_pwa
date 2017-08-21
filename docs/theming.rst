Theming
=======

    All the colors being used in the app have been defined in variables.scss.

It contains the named color variables of ionic which are being used in the components html like::

    <ion-toolbar color="primary">
      <ion-title>Menu</ion-title>
    </ion-toolbar>

It also contains the plone theme colors which can be imported into other sass files and used like::

    @import '../../theme/variables.scss';
    
    #crumbs .slider li a:after {
        box-shadow: -15px -15px 9px 6px $crumbs-background;
    }
 
You can change these colors as you see fit to change the theme and overall appearance of the app.

 