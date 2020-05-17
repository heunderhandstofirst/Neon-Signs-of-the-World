/* eslint-disable no-undef, no-unused, no-unused-vars */
let cs;
let pcs;
let bcs;

// now i have meade a comment

const backgroundImageURL = "images/background.png";
const letterURLs = [
  "images/letter-00-s.png",
  "images/letter-01-c.png",
  "images/letter-02-h.png",
  "images/letter-03-w.png",
  "images/letter-04-e.png",
  "images/letter-05-p.png",
  "images/letter-06-p.png",
  "images/letter-07-e.png",
  "images/letter-08-s.png"
];

// defined in setup
let schweppesLetterColors;

let letterImagesWhite = [];
let letterImagesWithColor = [];
var TurnMode;
var ConstColorIndex;
let SchweppesbackgroundImage;
let WeatherJsons = [];
let WeatherStrings = [];
var minuteNotFour = false;
var WeatherLoopJson;
let NeonPreload;
let NumLines = 43;
var Flicker = true;
let blueC = 1;
var SchwColor = [];
var weatherWWWstart = "https://api.openweathermap.org/data/2.5/weather?q=";
var weatherWWWfinish =
  "&mode=json&units=Imperial&cnt=7&appid=82c1267972094d5c1801e60fea29992c";

const WeatherInterval = 2000;

function preload() {
  const WeatherLocations = [
    "London",
    "Los Angeles",
    "New York",
    "Boston",
    "Madrid",
    "San Francisco"
  ];

  // letterImagesWithColor is an array of length 9.  Each of those 9 items are arrays of length 8.
  // the 8 items are the same letter in different color

  SchweppesbackgroundImage = loadImage(backgroundImageURL);
  // NeonPreload=loadImage("images/DAMbackground.png");
  // myFont = loadFont("images/ChicagoNeon.ttf");

  WeatherStrings = WeatherLocations.map(
    location => weatherWWWstart + location + weatherWWWfinish
  );

  // const mapFunction = weatherString => loadJSON(weatherString);
  // Above is equivalent to below
  // function mapFunctionOld(weatherString) {
  //   return loadJSON(weatherString);
  // }
  // WeatherJsons = WeatherStrings.map(mapFunction);
  WeatherJsons = WeatherStrings.map(weatherString => loadJSON(weatherString));
  // console.log("MOD Alert: " + WeatherJsons[0]);
  // console.log("second: " + WeatherJsons[0].name + ": ");

  letterImagesWhite = letterURLs.map(url => loadImage(url));
  screenBackground();
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight); //size(1200,800);(578, 340)
  canvas.drawingContext.miterLimit = 2;

  // Create a walker object
  cs = new CitgoSign();
  pcs = new SchweppesSign();
  bcs = new BondSign();

  schweppesLetterColors = [
    // color("rebeccapurple"),
    color("blue"),
    // color("pink"),
    color("green"),
    // // color("DarkGoldenRod"),
    // color("DarkMagenta"),
    color("lime"),
    color("hotpink"),
    // color("slategray"),
    color("orchid"),
    color("moccasin"),
    // color("navajowhite"),
    color("navy"),
    // color("olive"),
    color("springgreen"),
    color("teal")
    // color("turquoise")
  ];

  // letterImagesWithColor = letterImagesWhite.map(whiteImage => {
  //   const colorVariationsOfIndividualLetter = new Array(
  //     schweppesLetterColors.length
  //   );
  //   colorVariationsOfIndividualLetter.fill(whiteImage.get());
  //   return colorVariationsOfIndividualLetter.map(
  //     (whiteImageColorWorkingCopy, i) => {
  //       const buffer = createGraphics(1000, 797);
  //       buffer.tint(schweppesLetterColors[i]);
  //       buffer.image(whiteImageColorWorkingCopy, 0, 0);
  //       return buffer;
  //     }
  //   );
  // });

  for (
    let letterIndex = 0;
    letterIndex < letterImagesWhite.length;
    letterIndex += 1
  ) {
    const colorVariationsOfIndividualLetter = new Array(
      schweppesLetterColors.length
    );
    colorVariationsOfIndividualLetter.fill(
      letterImagesWhite[letterIndex].get()
    );
    for (
      let colorIndex = 0;
      colorIndex < schweppesLetterColors.length;
      colorIndex += 1
    ) {
      const whiteImageColorWorkingCopy =
        colorVariationsOfIndividualLetter[colorIndex];
      const buffer = createGraphics(1000, 797);
      buffer.tint(schweppesLetterColors[colorIndex]);
      buffer.image(whiteImageColorWorkingCopy, 0, 0);
      colorVariationsOfIndividualLetter[colorIndex] = buffer;
    }
    letterImagesWithColor[letterIndex] = colorVariationsOfIndividualLetter;
  }
}

function draw() {
  // canvas.drawingContext.miterLimit = 2;
  var m = minute();
  var minSpan = 10;
  WhichSign = int(m / minSpan) % 3;
  WhichSign = 2;

  if (0 !== minute() % 2) {
    minuteNotFour = true;
  }
  if (0 === minute() % 2 && minuteNotFour === true) {
    for (var i = 0; i < WeatherStrings.length; i++) {
      if (true) {
        loadJSON(WeatherStrings[i], AsyncWeather);
        WeatherJsons[i] = WeatherLoopJson;

        // console.log("A: " + int(CityString.main.temp));
        // console.log("B: " + WeatherLoopJson);
        // console.log("C: " + int(WeatherJsons[i].main.temp));
      }
    }
    minuteNotFour = false;
  }

  clear();
  background(5, 5, 5);
  if (WhichSign === 0) {
    frameRate(3);
    cs.increment();
    cs.setOutLights();
    cs.render();
  }
  if (WhichSign === 1) {
    frameRate(20.5); //20
    pcs.increment();
    pcs.render();
  }
  if (WhichSign === 2) {
    frameRate(13);
    //preload();
    // screenBackground();
    // background(NeonPreload);
    bcs.increment();
    bcs.render();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function signum(f) {
  if (f > 0) {
    return 1;
  } else if (f < 0) {
    return -1;
  } else {
    return 0;
  }
}

function AsyncWeather(CityString) {
  WeatherLoopJson = CityString;
  console.log(hour() + ":" + minute() + ":" + second(lk));
}

const updateWeather0 = () => {
  loadJSON(weatherWWWstart + "London" + weatherWWWfinish, AsyncWeather0);

  window.setTimeout(updateWeather0, WeatherInterval);
};

function screenBackground() {
  img = createImage(windowWidth, windowHeight);
  img.loadPixels();
  var TwoFiftyFive = 255;
  var abc = 184 + 40 * random();
  for (let x = 0; x < img.width; x++) {
    // var TwoFiftyFive = 255;
    // blueC = noise(blueC); // 204
    for (let y = 0; y < img.height; y++) {
      let a = map(y, 0, img.height, TwoFiftyFive, 0);
      // img.set(x, y, [0, 153, 204, a]);
      img.set(x, y, [0, 153, 204, a]);
    }
  }
  img.updatePixels();
  NeonPreload = img;
}
