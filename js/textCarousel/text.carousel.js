class textCarousel {

    constructor() {
        this.wordIndex = 0;
        this.words = [];
        this.word = "";
        this.mode = 0 // 0 = write , 1 = erase
        this.textCarouselDiv;
        this.interval;
        this.pause;
    }

    create(textCarouselDiv, interval, pause) {

        var thisTextCarousel = this;
        thisTextCarousel.textCarouselDiv = textCarouselDiv;
        thisTextCarousel.interval = interval;
        thisTextCarousel.pause = pause;

        var textCarouselWords = textCarouselDiv.find(".text-carousel-word").toArray();

        textCarouselWords.forEach(function (tcw) {
            var word = $(tcw).data("word");
            thisTextCarousel.words.push(word);
        });

        thisTextCarousel.start();
    }

    start() {

        var thisTextCarousel = this;

        if (thisTextCarousel.wordIndex >= thisTextCarousel.words.length)
            thisTextCarousel.wordIndex = 0;

        var text = thisTextCarousel.words[thisTextCarousel.wordIndex];

        thisTextCarousel.textCarouselDiv.html(thisTextCarousel.word);

        if (thisTextCarousel.mode === 1) {
            var intrevalErasingText = setInterval(function () {
                if (thisTextCarousel.word.length > 0) {
                    thisTextCarousel.word = text.substring(0, thisTextCarousel.word.length - 1);
                    var lastChar = thisTextCarousel.word[thisTextCarousel.word.length - 1];
                    if(lastChar !== "<"){
                        thisTextCarousel.textCarouselDiv.html(thisTextCarousel.word);
                    }
                } else {
                    clearInterval(intrevalErasingText);
                    thisTextCarousel.wordIndex += 1;
                    thisTextCarousel.textCarouselDiv.html("");
                    thisTextCarousel.mode = 0;
                    thisTextCarousel.start();
                }
            }, thisTextCarousel.interval);
        }

        if (thisTextCarousel.mode === 0) {
            var intrevalWriteText = setInterval(function () {
                if (thisTextCarousel.word.length < text.length) {
                    thisTextCarousel.word = text.substring(0, thisTextCarousel.word.length + 1);
                    var lastChar = thisTextCarousel.word[thisTextCarousel.word.length - 1];
                    if(lastChar !== "<"){
                        thisTextCarousel.textCarouselDiv.html(thisTextCarousel.word);
                    }
                } else {
                    clearInterval(intrevalWriteText);
                    thisTextCarousel.mode = 1;
                    setTimeout(function () {
                        thisTextCarousel.start();
                    }, thisTextCarousel.pause);
                }
            }, thisTextCarousel.interval);
        }

    };
}