class window.TextCarousel 
    constructor: (@textCarouselDiv, @interval, @pause) ->
      @wordIndex = 0
      @words = []
      @word = ""
      @mode = 0 # 0 = write, 1 = erase
    
    start: ->

      thisTextCarousel = this;
        
      textCarouselWords = $(@textCarouselDiv).find(".text-carousel-word").toArray();
      
      $.each textCarouselWords, (i , e) ->
        word = $(e).data("word");
        thisTextCarousel.words.push(word);
        return
        
      if thisTextCarousel.wordIndex >= thisTextCarousel.words.length then thisTextCarousel.wordIndex = 0;
      text = thisTextCarousel.words[thisTextCarousel.wordIndex];
      thisTextCarousel.textCarouselDiv.html(thisTextCarousel.word);

      if thisTextCarousel.mode == 0
        intervalWriteText = setInterval () ->
          debugger
          if (thisTextCarousel.word.length < text.length)
            thisTextCarousel.word = text.substring(0, thisTextCarousel.word.length + 1);
            lastChar = thisTextCarousel.word[thisTextCarousel.word.length - 1];
            if(lastChar != "<") then thisTextCarousel.textCarouselDiv.html(thisTextCarousel.word);
          else
            clearInterval(intervalWriteText);
            thisTextCarousel.mode = 1;
            setTimeout () ->
              thisTextCarousel.start();
              thisTextCarousel.pause;
        ,thisTextCarousel.interval
      
      if thisTextCarousel.mode == 1
        intervalErasingText = setInterval () ->
          if thisTextCarousel.word.length > 0
            thisTextCarousel.word = text.substring(0, thisTextCarousel.word.length - 1);
            lastChar = thisTextCarousel.word[thisTextCarousel.word.length - 1];
            if lastChar != "<" then thisTextCarousel.textCarouselDiv.html(thisTextCarousel.word);
          else
            clearInterval(intervalErasingText);
            thisTextCarousel.wordIndex += 1;
            thisTextCarousel.textCarouselDiv.html("");
            thisTextCarousel.mode = 0;
            thisTextCarousel.start();
        ,thisTextCarousel.interval
      
        