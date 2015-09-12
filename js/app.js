var spelling_app = new Vue({
    el: '#app',
    data: {
        logged_in: false,
        logged_in_email: '',
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
        },
        login: function(e) {
            e.preventDefault();

            app.ref.authWithPassword({
                email    : $("#inputEmail").val(),
                password : $("#inputPassword").val()
            }, app.authHandler);
        },
        logout: function(e) {
            e.preventDefault();
            app.authLogout();
            this.logged_in = false;
            this.logged_in_email = '';
        }
    },
    beforeCompile: function() {
        
    }
});

var app = {
    ref: null,
    words_ref: null,
    spelling_app: null,

    init: function(application) {
        this.ref = new Firebase('http://spelling-test.firebaseio.com');
        this.words_ref = this.ref.child("words");
        this.spelling_app = application;

        this.wireEvents();
    },

    wireEvents: function() {

        //Get the words from the API
        this.words_ref.on("value", function(snapshot) {
            this.spelling_app.$data.spelling_words = snapshot.val();
        }, function (errorObject) {
            this.spelling_app.$data.error_message = "The read failed: " + errorObject.code;
        });

        //Authentication
        this.ref.onAuth(this.authDataCallback);
    },

    authDataCallback: function(authData) {
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            this.spelling_app.$data.logged_in = true;
            this.spelling_app.$data.logged_in_email = authData.password.email;
        } else {
            console.log("User is logged out");
            this.spelling_app.$data.logged_in = false;
        }
    },

    authHandler: function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
            this.spelling_app.$data.error_message = error;
        } else {
            console.log("Authenticated successfully with payload:", authData);
            this.spelling_app.$data.logged_in = true;
            this.spelling_app.$data.error_message = "";
        }
    },

    authLogout: function() {
        this.ref.unauth();
    }
};

(function(){
    "use strict";

    //Fire off the app
    var a = app;
    a.init(spelling_app);

})();
