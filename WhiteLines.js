/* eslint-disable no-undef, no-unused, no-unused-vars */

// Code for: https://youtu.be/KkyIDI6rQJI
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KkyIDI6rQJI

function WhiteLines(activeLines, rectDim, rectStart, rectStartY) {
  this.activeLines = activeLines;
  this.rectDim = rectDim;
  this.rectStart = rectStart;
  this.rectStartY = rectStartY;

  stroke(255, 255, 255);
  strokeWeight(2);
  // if(NumLines===this.activeLines){
  if (Flicker) {
    strokeWeight(2.3);
  }
  // }

  var whiteLineOffset = this.rectStartY + 5;
  var LW = (this.rectDim - 25) / 5;
  var LH = this.rectDim / NumLines;

  Flicker = !Flicker;
  for (var i = 0; i < this.activeLines; i++) {
    var LineMark = this.rectStart + 2;
    var LineMark2 = LineMark + LW;
    var YC = whiteLineOffset + LH * i; // Y coordinate of each line
    var LineCurve = 0;
    if (i === 0 || i === this.activeLines) {
      LineCurve = 4;
    }

    var TopBot = 10 * max(0, abs(i - 21) - 19);

    // LINE 1
    line(LineMark + LineCurve, YC, LineMark2 + TopBot, YC);
    LineMark = LineMark2 + 5;
    LineMark2 = LineMark + LW;

    // LINE 2
    line(LineMark + TopBot, YC, LineMark2, YC);
    LineMark = LineMark2 + 5;
    LineMark2 = LineMark + LW;

    // LINE 3
    line(LineMark, YC, LineMark2, YC);
    LineMark = LineMark2 + 5;
    LineMark2 = LineMark + LW;

    // LINE 4
    line(LineMark, YC, LineMark2 - TopBot, YC);
    LineMark = LineMark2 + 5;
    LineMark2 = LineMark + LW;

    // LINE 5
    line(LineMark - TopBot, YC, LineMark2 - LineCurve, YC);

    //}
  }
}
//////////////////////////////////////////////////////////////////////////////////////
class WhiteStripe {
  constructor(activeLines, centerY, color, width, maxHeight) {
    this.activeLines = activeLines;
  }
}
//////////////////////////////////////////////////////////////////////////////////////

class verticalWhiteLines {
  constructor(activeLines, rectDim, rectStart, rectStartY) {
    this.activeLines = activeLines;
    this.rectDim = rectDim;
    this.rectStart = rectStart;
    this.rectStartY = rectStartY;
    this.bulbs = [];
    this.bulbs.push(
      new WhiteStripe(
        this.activeLines,
        this.rectDim,
        this.rectStart,
        this.rectStartY
      )
    );
  }

  update(activeLines, rectDim, rectStart, rectStartY) {
    this.activeLines = activeLines;
    this.rectDim = rectDim;
    this.rectStart = rectStart;
    this.rectStartY = rectStartY;
    this.time = this.time + 0.1;
    WhiteLines(this.activeLines, this.rectDim, this.rectStart, this.rectStartY);
  }
}
