# collective.experimental_angular_pwa

## Overview

An Ionic 2 app which in turn will be using Angular 2 that will implement the PWA behavior. It will retrieve the contents from the Plone site using the Plone REST API. Based on the proposal given in GSoC '17 by Noel Varghese. [Link](https://docs.google.com/document/d/1yQI73kVzspbytRlKzbxiBVMr1ERFwda5M-W7sc74gGc/edit?usp=sharing) to the proposal.

## Demo Screenshots

* Main Components
	* Login Screen
	* Main menu
	* Global Navigation(Side Nav)
	* Options Popover accessible on each page
	* Settings page
	* Toast to indicate offline mode is active
    
  <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Main/plone-login.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Main/plone-site.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Main/plone-globalnav.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Main/plone-logout.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Main/plone-settings.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Main/plone-offline.png?raw=true" height="300">
    
* Plone Content Types
	* Collection
	* Document
	* Event
	* File
	* Folder
	* Image
	* Link
	* News Item

  <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Content-Types/plone-collection.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Content-Types/plone-document.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Content-Types/plone-event1.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Content-Types/plone-event2.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Content-Types/plone-file.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Content-Types/plone-folder.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Content-Types/plone-image.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Content-Types/plone-link.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Content-Types/plone-newsitem.png?raw=true" height="300">

* Searching
	* Search results page
	* Sorting results
	* Filtering results

  <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Search/plone-search.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Search/plone-search-filter.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Search/plone-search-sortby.png?raw=true" height="300">

* Comments
	* Comments page
    * Offline comments

  <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Comments/plone-comments.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Comments/plone-comments-offline.png?raw=true" height="300">

* Editing
	* Action sheet for editing and commenting opens on pressing the edit FAB in the       bottom right corner of views that are editable.
	* Medium editor in edit view

  <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Editing/plone-actionsheet.png?raw=true" height="300"> <img src="https://github.com/collective/collective.experimental_angular_pwa/blob/master/docs/resources/Editing/plone-medium-editor.png?raw=true" height="300">


## Getting Started

The nodejs version being used is 7.7.3.

Clone the repository, in the project's root directory, run the command:
```
npm install or npm i
```
This will install all the necessary node modules required to run this project. 

Then launch
```
ionic serve
```
this runs the app in development mode. Open  [http://localhost:8100](http://localhost:8100) to view it in the browser.




## Built With

* [Ionic 2](http://ionicframework.com/docs/) - Framework to create cross-platform mobile  applications
* [Plone Restapi Angular](https://github.com/plone/plone.restapi-angular) - Package to help build Angular application based on Plone Rest Api
* [Angular2 schema form](https://github.com/makinacorpus/angular2-schema-form) - Angular2 module allowing you to instanciate an HTML form from a JSON schema.
* [Angular Medium Editor](https://github.com/kitconcept/angular-medium-editor) - Angular2 component for medium editor
