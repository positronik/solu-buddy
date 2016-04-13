/**
 * Created by root on 4/6/16.
 */
describe("Utility Functions", function() {


    describe("Count number of significant figures.", function(){
        it("Should count the number of significant figures in numbers without a decimal.", function() {
            expect(count_sig_figs(42)).toEqual(2);
            expect(count_sig_figs(899999)).toEqual(6);
            expect(count_sig_figs(900)).toEqual(1);
            expect(count_sig_figs(900000)).toEqual(1);
            expect(count_sig_figs(900001)).toEqual(6);

        });

        it("Should count the number of significant figures in numbers with a decimal.", function() {
            expect(count_sig_figs(42.2)).toEqual(3);
            expect(count_sig_figs(899999.19293)).toEqual(11);
            expect(count_sig_figs(899999.100001)).toEqual(12);
            expect(count_sig_figs(890000.100001)).toEqual(12);
            expect(count_sig_figs(900000.1)).toEqual(7);

        });
    });


    describe("Find minimum number in an array.", function(){
        it("Should be able to accommodate negative numbers as minimums.", function() {
            var arr = [1,2,3,4,-5,6,7,-10];

            expect(find_min(arr)).toEqual(-10);

        });

        it("Should be able to accommodate float numbers.", function() {

            var arr = [1.34,2.234,3.0,4.4,-5.1,6.3,7.1238,-234.2343];

            expect(find_min(arr)).toEqual(-234.2343);
        });
    });

    describe("Round a number to a specific number of decimal places.", function(){
        it("Should be able to round negative numbers.", function() {

            expect(precise_round(20.35439, 4)).toEqual(20.3544);
            expect(precise_round(20.3544, 3)).toEqual(20.354);

        });

        it("Should be able to round to 13 decimal places accurately.", function() {

            expect(precise_round(120.394850348958493, 13)).toEqual(120.3948503489585);
            expect(precise_round(120.394850348958493, 18)).toEqual(120.3948503489585);
        });
    });




});
