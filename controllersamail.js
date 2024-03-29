//Create a module for our core AMail services
var aMailServices = angular.module('AMail', ['ngRoute']);

// Set up our mappings between URLs, templates, and controllers
function emailRouteConfig($routeProvider){
    $routeProvider.
    when('/',{
        controller: ListController,
        templateUrl: 'list.html'
    }).
    // Notice that for the details view, we specify a parameterized URL component
    // by placing a colon in front of the id
    when('/view/:id', {
        controller: DetailController,
        templateUrl: 'detail.html'
    }).
    otherwise({
        redirectTo: '/'
    });
}

// Set up our route so the AMail service can find it
aMailServices.config(emailRouteConfig);

// some fake emails
messages = [{
    id: 0, sender: 'jean@somecompany.com', subject: 'Hi there, old friend',
    date: 'Dec 7, 2013 12:32:00', recipients: ['greg@somecompany.com'],
    message: 'Hey, we should get together for lunch sometime and catch up.'
    +'There are many things we should collaborate on this year.'
},{
    id: 1, sender: 'maria@somecompany.com',
    subject: 'Where did you leave my laptop?',
    date: 'Dec 7, 2013 8:15:12', recipients: ['greg@somecompany.com'],
    message: 'I though you were going to put it in my desk drawer.'
    +'But it does not weem to be there.'
},{
    id: 2, sender: 'bill@somecompany.com', subject: 'Lost python',
    date: 'Dec 6, 2013 20:35:02',  recipients: ['greg@somecompany.com'],
    message: 'Nobody panic, but my pet python is missing form her cage.'
    +'She doesn\'t move too fast, so just call me if you see her.'
}];

// Publish our messages for the list template 
function ListController($scope) {
    $scope.messages = messages;
}

// Get the message id from the route (parsed form the URL) and us it to
// find the right message object.

function DetailController($scope, $routeParams) {
    $scope.message = messages[$routeParams.id];
}
