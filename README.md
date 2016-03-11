# Refactor: Daxko Interview Project
Contributors: sharrondenice

## Description

Adding new functionality to existing legacy "interview_project"

### Changelog

#### v5
##### Enhancements
###### Documentation
* Updated README changelog

#### v4
##### Enhancements
###### UI
* Removed `ThankYou` view to prevent users navigating to page

##### Defects
###### UI
* do NOT allow products to be stored in cookies, server updates not captured dynamically

###### Code
* Prevent the `Item` class from being instatiated
* Changed `price` type in `ItemModel` to double


#### v3
##### Enhancements
###### UI
* Added Bootstrap for responsiveness
* Updated styles for increased readability and viewability
* Added loading imagery to UI and mouse to alert user when application not available for input
* Added in error handling with error codes
* Update `Home` view to use `_Layout`

###### Code
* Ensure that all methods follow same naming convention throughout
* Added proper documentation to all classes and methods

##### Defects
###### UI
* Prevent users from entering invalid data, set min and max quantity entries

#### v2
##### Enhancements
###### UI
* Update all pages to use _Layout - DRY
* Added new angular orders app for viewing order history

###### Code
* Removed Item list data from controller - DRY/MVC
* Removed `Domain` project - MVC/DRY/angular
* Restructured all models to be inside `MVC.Models` namespace - MVC
* `OrderItem` now inherits from Item class
* Added `Item `class with `LoadItems` method for loading latest products

##### Defects
###### UI
* Prevent users from not entering a quantity before adding to cart

#### v1
##### Enhancements
###### UI
* Added in angular functionality to the UI
* Allow user to add multiple items on single button click

###### Code
* Added methods to `OrderController` to support Angular/JSON requests
* Elimated use of `item_id/id` variable inconsistencies in OrderItem and Item classes and models

##### Defects
###### Code
* Fixed calucation logic on `PastOrders` page
