var spelling_app = new Vue({
    el: '#app',
    data: {
        number_correct: 0,
        spelling_words: [],
        error_message: ''
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
});

(function(){
    var myFirebaseRef = new Firebase('http://spelling-test.firebaseio.com');
    var wordsRef = myFirebaseRef.child("words");

    wordsRef.on("value", function(snapshot) {
        spelling_app.$data.spelling_words = snapshot.val();
    }, function (errorObject) {
        spelling_app.$data.error_message = "The read failed: " + errorObject.code;
    });
})();
