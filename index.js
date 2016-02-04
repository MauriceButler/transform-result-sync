function transform(transform, callback){
   return function(error){
       if(error){
           return callback(error);
       }

       var args = Array.prototype.slice.call(arguments, 1);

       return callback(null, transform.apply(null, args));
   };
}

module.exports = transform;