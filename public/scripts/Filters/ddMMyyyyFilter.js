app.filter('ddMMyyyy', function($filter) {    
    var angularDateFilter = $filter('date');
    return function(theDate) {
       return angularDateFilter(theDate, 'dd • MM • yyyy');
    }
});