const should = require('chai').should();

const sustainCategories = require('../categoryActivity');

//unit test for sustainCategories function
describe('sustainCategories', function () {

    //testing the normal case
    it('should select chosen category, points, or both', function () {
        //examples of what normal case looks like for sustainCategories
        const normalCase = [
            {
                a: 'Food',
                b: '',
                expected: 'Buy locally, Eat less meat'
            },
            {
                a: '',
                b: 4,
                expected: 'Buy locally, Shorten your shower, Use reuseable water bottle'
            },
            {
                a: 'Energy',
                b: 6,
                expected: 'Keep house temp at 68F'
            }
        ];

        //for each set of inputs 'a,b', sustainCategories should produce the expected value
        normalCase.forEach(function (input) {
            const output = sustainCategories(input.a, input.b);
            output.should.equal(input.expected);
        });
    });
    it(`should raise error if args do not have activities`, function () {
        //range of bad inputs
        const testCase = [
            {
                a: 'Water',
                b: 6
            },
            {
                a: 'food',
                b: 10
            },
            {
                a: 'Choose category...',
                b: 'Choose points...'
            }
        ];

        //prove that above are bad inputs
        testCase.forEach(function (input) {
            (function () {
                sustainCategories(input[0], input[1])
            })
            .should.throw(Error);
        });
    });

});
