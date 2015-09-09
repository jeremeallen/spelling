var vm = new Vue({
    el: '#app',
    data: {
        number_correct: 0,
        spelling_words: [
            {
                id: 1,
                order: 1,
                word: "jut",
                sentence: "This thing is a jut.  Jut.",
                user_spelling: "",
                correct: false
            },
            {
                id: 2,
                order: 2,
                word: "nick",
                sentence: "Just in the nick of time.  Nick.",
                user_spelling: "",
                correct: false
            },
            {
                id: 3,
                order: 3,
                word: "tenth",
                sentence: "After ninth comes tenth.  Tenth.",
                user_spelling: "",
                correct: false
            },
            {
                id: 4,
                order: 4,
                word: "shrug",
                sentence: "When I dont know I shrug my shoulders.  Shrug.",
                user_spelling: "",
                correct: false
            },
            {
                id: 5,
                order: 5,
                word: "stuff",
                sentence: "In my room I have a lot of stuff.  Stuff.",
                user_spelling: "",
                correct: false
            },
            {
                id: 6,
                order: 6,
                word: "sense",
                sentence: "That doesn't make any sense.  Sense.",
                user_spelling: "",
                correct: false
            },
            {
                id: 7,
                order: 7,
                word: "damp",
                sentence: "When it rains it gets damp.  Damp.",
                user_spelling: "",
                correct: false
            },
            {
                id: 8,
                order: 8,
                word: "cot",
                sentence: "Be nice or you will have to sleep on the cot.  Cot.",
                user_spelling: "",
                correct: false
            },
            {
                id: 9,
                order: 9,
                word: "fling",
                sentence: "I am going to fling this rubber band at you.  Fling.",
                user_spelling: "",
                correct: false
            },
            {
                id: 10,
                order: 10,
                word: "notch",
                sentence: "I ate to many donuts so I need to loosen my belt a notch.  Notch.",
                user_spelling: "",
                correct: false
            },
            {
                id: 11,
                order: 11,
                word: "gush",
                sentence: "A gush of jelly flowed out of my donut when I took a bite.  Gush.",
                user_spelling: "",
                correct: false
            },
            {
                id: 12,
                order: 12,
                word: "scan",
                sentence: "The copier took a san of my paper.  Scan.",
                user_spelling: "",
                correct: false
            },
            {
                id: 13,
                order: 13,
                word: "batch",
                sentence: "I ate a whole batch of cookies by myself.  Batch.",
                user_spelling: "",
                correct: false
            },
            {
                id: 14,
                order: 14,
                word: "rough",
                sentence: "Its rough when I have to go to school for 5 days in a row.  Rough.",
                user_spelling: "",
                correct: false
            },
            {
                id: 15,
                order: 15,
                word: "stump",
                sentence: "When the tree fell over it left behind a big stump.  Stump.",
                user_spelling: "",
                correct: false
            },
            {
                id: 16,
                order: 16,
                word: "tough",
                sentence: "Beef jerky is tough to chew.  Tough.",
                user_spelling: "",
                correct: false
            },
            {
                id: 17,
                order: 17,
                word: "laugh",
                sentence: "When I watch a funny show I laugh a lot.  Laugh.",
                user_spelling: "",
                correct: false
            },
            {
                id: 18,
                order: 18,
                word: "guess",
                sentence: "I know all of these words so I don't need to guess.  Guess.",
                user_spelling: "",
                correct: false
            },
            {
                id: 19,
                order: 19,
                word: "lead",
                sentence: "When I am the line leader I lead.  Lead.",
                user_spelling: "",
                correct: false
            },
            {
                id: 20,
                order: 20,
                word: "dove",
                sentence: "In Call of Duty to avoid the sniper I dove out of the way.  Dove.",
                user_spelling: "",
                correct: false
            },
            {
                id: 21,
                order: 21,
                word: "past",
                sentence: "I stayed up way past my bed time.  Past.",
                user_spelling: "",
                correct: false
            },
            {
                id: 22,
                order: 22,
                word: "dock",
                sentence: "My fishing boat is tied up to my dock at my cabin.  Dock.",
                user_spelling: "",
                correct: false
            },
            {
                id: 23,
                order: 23,
                word: "plum",
                sentence: "A plum is a purple colored fruit.  Plum.",
                user_spelling: "",
                correct: false
            },
            {
                id: 24,
                order: 24,
                word: "cinch",
                sentence: "This spelling test is a cinch.  Cinch.",
                user_spelling: "",
                correct: false
            },
            {
                id: 25,
                order: 25,
                word: "blond",
                sentence: "My hair is so light its blond.  Blond.",
                user_spelling: "",
                correct: false
            },
        ]
    },
    methods: {
        updateNumberCorrect: function() {
            this.number_correct = 0;

            for (var i = 0; i < this.spelling_words.length; i++) {
                if (this.spelling_words[i].correct ) {
                    this.number_correct += 1;
                }
            }
        },
        playSentence: function(model, e) {
            var msg = new SpeechSynthesisUtterance(model.sentence);
            msg.rate = .7;
            window.speechSynthesis.speak(msg);
            $('#word-' + model.order).focus();
            e.preventDefault();
        },
        validateWord: function(model, e) {
            if (model.user_spelling === model.word) {
                model.correct = true;
                model.started = false;
            } else {
                model.correct = false;

                if (model.user_spelling.length > 0) {
                    model.started = true;
                }
            }

            this.updateNumberCorrect();
        },
        startOver: function() {

            for (var i = 0; i < this.spelling_words.length; i++) {
                this.spelling_words[i].user_spelling = '';
                this.spelling_words[i].correct = false;
            }

            this.updateNumberCorrect();
        }
    }
})
