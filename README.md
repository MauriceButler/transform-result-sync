# transform-result-sync

Run an arbitrary sync transform over a functions result if there is no error

``` javascript
var transform = require(transform-result-sync);

getData(transform(
    function(result){
        return result.id;
    },
    callback
));

// callback gets result.id
```