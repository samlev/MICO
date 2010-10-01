Mantis.Utils = function () {
    return {
        passwordStrength: function (pass) {
            // break the strength test up into a number of simple regexes with points
            var tests = [
                // length
                {reg:/^(.{3,})$/, points: 1}, // minimum 3 characters
                {reg:/^(.{6,})$/, points: 2}, // minimum 6 characters (note: this will match both 3 and 6, giving 3 points)
                {reg:/^(.{9,})$/, points: 3}, // minimum 9 characters (note: this will match 3, 6, and 9 giving 6 points)
                {reg:/^(.{12,})$/, points: 4}, // minimum 12 characters (note: this will match 3, 6, 9 and 12 giving 10 points)
                // character mixes
                {reg:/^(.*[a-z].*)$/, points: 1}, // at least 1 lower-case letter
                {reg:/^(.*[A-Z].*)$/, points: 2}, // at least 1 upper-case letter
                {reg:/^(.*[0-9].*)$/, points: 3}, // at least 1 number
                {reg:/^(.*[^a-zA-Z0-9].*)$/, points: 4}, // at least 1 non alpha-numeric character
                {reg:/^(.*([A-Z].*){3,}.*)$/, points: 5}, // at least 3 upper-case letters
                {reg:/^(.*([0-9].*){3,}.*)$/, points: 5}, // at least 3 numbers
                {reg:/^(.*([^a-zA-Z0-9].*){3,}.*)$/, points: 6}, // at least 3 non alpha-numeric characters
                {reg:/^(.*([0-9]+[^0-9]+[0-9])+.*)$/, points: 6}, // at least 2 non-consecutive numbers
                {reg:/^(.*([^a-zA-Z0-9]+[a-zA-Z0-9]+[^a-zA-Z0-9])+.*)$/, points: 8} // at least 2 non-consecutive non alpha-numeric characters
            ]
            
            var points = 0;
            
            // run the tests
            for (var i = 0; i < tests.length; i++) {
                if (pass.match(tests[i].reg)) {
                    points += tests[i].points;
                }
            }
            
            return points;
        }
    };
} ();