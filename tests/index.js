var test = require('tape'),
    transformResultSync = require('../'),
    expectedResult = {foo: 'bar'},
    testError = 'BANG!!!';

test('transformResultSync Exists', function (t) {
    t.plan(1);
    t.equal(typeof transformResultSync, 'function',  'transformResultSync is a function');
});

test('transformResultSync returns a function', function (t) {
    t.plan(1);
    t.equal(typeof transformResultSync(), 'function',  'transformResultSync returns a function');
});

test('transformResultSync handles error', function (t) {
    t.plan(2);

    var target = transformResultSync(
            function(){
                t.fail('should not be called');
            },
            function(error, result){
                t.equal(error, testError, 'correct error');
                t.notOk(result, 'no result');
            }
        );

    target(testError);
});

test('transformResultSync runs transform and returns', function (t) {
    t.plan(3);

    var testData = {
            things: 'stuff'
        },
        target = transformResultSync(
            function(data){
                t.equal(data, testData, 'correct data');
                return expectedResult;
            },
            function(error, result){
                t.notOk(error, 'no error');
                t.equal(result, expectedResult, 'correct result');
            }
        );

    target(null, testData);
});

test('transformResultSync handles more than 1 parameter', function (t) {
    t.plan(3);

    var target = transformResultSync(
            function(one, two, three){
                t.equal(one, 1, 'correct one');
                t.equal(two, 2, 'correct two');
                t.equal(three, 3, 'correct three');
            },
            function(){}
        );

    target(null, 1, 2, 3);
});
