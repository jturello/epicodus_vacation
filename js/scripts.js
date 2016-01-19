$(function() {
  $("form#radios").submit(function(event) {

    var radNames = ['environs', 'season', 'activities', 'budget', 'activity-level'];

    var aspenCount = 0, hawaiiCount = 0, romeCount = 0;
    var aspenPriority = 0, hawaiiPriority = 0, romePriority = 0;
    var radioIndex = null;

    $('div.remove-me').addClass('img-hide')
    $("div.remove-me").removeClass('img-show remove-me');

    // alert('removeClass("img-show");');

    /*
        for all 5 questions the left-most radio button is a vote for Aspen,
        the middle button is a vote for Honolulu, and right-most for Rome.
        If any city has > 2 answers, that city is the user's suggested destination.
        If 2 cities have 2 responses each, the one with the highest priority wins.
        The highest priority is given to the questions in descending order -
        so the top-most question has the highest priority, the last question has
        the lowest priority.
    */
    for (var i=0; i<radNames.length; i++){
        radioIndex = $("input[name=" + radNames[i] + "]").index($("input[name=" + radNames[i] + "]:checked"));

        // alert("radioIndex: " + radioIndex + ". radNames[" + i + "]: " + radNames[i]);

        switch (radioIndex) {
          case 0 :  aspenCount += 1;
                    // alert('asp += 1 - aspPri: ' + aspenPriority);
                    if (aspenPriority < 1) {
                      aspenPriority = i + 1;
                      // alert('aspPri: ' + aspenPriority + ' - i: ' + i);
                    }; break;
          case 1 :  hawaiiCount += 1;
                    // alert('haw += 1 - hawPri: ' + hawaiiPriority);
                    if (hawaiiPriority < 1) {
                      hawaiiPriority = i + 1;
                      // alert('hawPri: ' + hawaiiPriority + ' - i: ' + i);
                    }; break;
          case 2 :  romeCount += 1;
                    // alert('rome += 1 - romePri: ' + romePriority);
                    if (romePriority < 1) {
                      romePriority = i + 1;
                      // alert('romePri: ' + romePriority + ' - i: ' + i);
                    }; break;
        }
    }

    if ((aspenCount>2) || (hawaiiCount>2) || (romeCount>2)) {
      // alert('if asp>2 || haw>2 || rome>2)');

      if (aspenCount > 2) {
        // alert('asp>2');
        $("div#img-aspen").removeClass("img-hide");
        $("div#img-aspen").addClass("img-show remove-me");
      } else if (hawaiiCount > 2) {
        // alert('haw>2');
        $("div#img-honolulu").removeClass("img-hide");
        $("div#img-honolulu").addClass("img-show remove-me");
      } else if (romeCount > 2) {
        // alert('rome>2');
        $("div#img-rome").removeClass("img-hide");
        $("div#img-rome").addClass("img-show remove-me");
      }
    } else if (aspenCount < 2) {
      // alert('elseif asp<2');
        if (hawaiiPriority < romePriority) {
          // alert('if haw<rome');
          $("div#img-honolulu").removeClass("img-hide");
          $("div#img-honolulu").addClass("img-show remove-me");
        } else if (romePriority < hawaiiPriority){
          // alert('if rome<haw');
          $("div#img-rome").removeClass("img-hide");
          $("div#img-rome").addClass("img-show remove-me");
        }
      } else if (hawaiiCount < 2) {
        // alert('elseif haw<2');
          if (aspenPriority < romePriority) {
            // alert('if asp<rome');
            $("div#img-aspen").removeClass("img-hide");
            $("div#img-aspen").addClass("img-show remove-me");
          } else if (romePriority < aspenPriority){
            // alert('if rome<haw');
            $("div#img-rome").removeClass("img-hide");
            $("div#img-rome").addClass("img-show remove-me");
          }
        } else if (romeCount < 2) {
          // alert('elseif rome<2' + ' - aspPri: ' + aspenPriority + 'hawPri: ' + hawaiiPriority);
          if (aspenPriority < hawaiiPriority) {
            // alert('if asp<haw');
            $("div#img-aspen").removeClass("img-hide");
            $("div#img-aspen").addClass("img-show remove-me");
          } else if (hawaiiPriority < aspenPriority){
            // alert('if haw<asp' + ' - hawPri: ' + hawaiiPriority + 'aspPri: ' + aspenPriority);
            $("div#img-honolulu").removeClass("img-hide");
            $("div#img-honolulu").addClass("img-show remove-me");
          }
        }
    event.preventDefault();
  });
});
