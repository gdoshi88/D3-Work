// setting the width and height of container
let width = parseInt(d3.select("#scatter").style("width"));
let height = width - width / 5;

// setting margin, text and label spacing
let margin = 20;

let labelSpace = 110;
let bottomText = 40;
let leftText = 40;
// creating svg container in HTML
let svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

// circle radius according to width
let circleRad;
function circleRadius() {
  if (width <= 535) {
    circleRad = 5;
  } else {
    circleRad = 10;
  }
}
circleRadius();

// group for bottom axis labels(BOTTOM AXIS) \\
svg.append("g").attr("class", "xLabelText");

let transformX = (width - labelSpace) / 2 + labelSpace;
let transformY = height - margin - bottomText;

let xLabelText = d3.select(".xLabelText");

// transform xLabelText(NEED A FIX HERE FOR POSITIONING[BELOW IN TRANSFORM])
function xLabelTextTransform() {
  xLabelText.attr("tranform", `translate(${transformX},${transformY}`);
}
xLabelTextTransform();

// append text and assign classes to svg y coordinates using xLabelText
// Poverty
xLabelText
  .append("text")
  .attr("y", transformY + 30)
  .attr("x", transformX)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("In Poverty (%)");
// Age
xLabelText
  .append("text")
  .attr("y", transformY)
  .attr("x", transformX)
  .attr("data-name", "age")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Age (Median)");
// Income
xLabelText
  .append("text")
  .attr("y", transformY - 30)
  .attr("x", transformX)
  .attr("data-name", "income")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Household Income (Median)");

// group for left axis labels(LEFT AXIS) \\
let leftTextX = margin + leftText;
let leftTextY = (height + labelSpace) / 2 - labelSpace;

svg.append("g").attr("class", "yLabelText");

let yLabelText = d3.select(".yLabelText");

function yLabelTextTransform() {
  yLabelText.attr(
    "transform",
    "translate(" + leftTextX + "," + leftTextY + "), rotate(-90)"
  );
}
yLabelTextTransform();

// append the text
// Obesity
yLabelText
  .append("text")
  .attr("y", -30)
  .attr("data-name", "obesity")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Obese (%)");
// Smokes
yLabelText
  .append("text")
  .attr("y", 0)
  .attr("data-name", "smokes")
  .attr("class", "aText inactive y")
  .text("Smokes (%)");
// Lacking Healthcare
yLabelText
  .append("text")
  .attr("y", 30)
  .attr("data-name", "healthcare")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Lacks Healthcare (%)");

// Import CSV data file \\
d3.csv("../assets/data/data.csv", function(error, healthData) {
  if (error) throw error;
  console.log(healthData);
});

function chart(theData) {
  let curX = "poverty";
  let curY = "obesity";

  let xMin;
  let xMax;
  let yMin;
  let yMax;

  function toolTip(tT) {
    d3.tip()
      .attr("class", "d3-tip")
      .offset([40, -60])
      .html(function(data) {
        console.log(data);
        let x;
        let state = "<div>" + data.state + "%</div>";
        let y = "<div>" + curY + ": " + data[curY] + "%</div>";
        if (curX === "poverty") {
          x - "<div>" + curX + ": " + data[curX] + "%</div>";
        } else {
          x =
            "<div>" +
            curX +
            ": " +
            parseFloat(d[curX]).toLocaleString("en") +
            "</div>";
        }
        return state + x + y;
      });
  }

  svg.call(toolTip);

  function xMinMax() {
    xMin = d3.min(theData, function(data) {
      return parseFloat(data[curX]) * 0.9;
    });
    xMax = d3.max(theData, function(data) {
      return parseFloat(data[curX]) * 1.1;
    });
  }

  function yMinMax() {
    yMin = d3.min(theData, function(data) {
      return parseFloat(data[curY]) * 0.9;
    });
    yMax = d3.max(theData, function(data) {
      return parseFloat(data[curY]) * 1.1;
    });
  }

  function labelChange(axis, clickedText) {
    d3.selectAll(".aText")
      .filter("." + axis)
      .filter(".active")
      .classed("active", false)
      .classed("inactive", true);

    clickedText.classed("inactive", false).classed("active", true);
  }

  xMinMax();
  yMinMax();

  let xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);
  let yScale = d3
    .scaleLinear()
    .doman([yMin, yMax])
    .range([height - margin - labelArea, margin]);

  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale);
}

function labelChange(axis, textClicked) {
  d3.selectAll(".aText")
    .filter("." + axis)
    .filter(".active")
    .classed("active", false)
    .classed("inactive", true);
  textClicked.classed("inactive", false).classed("active", true);
}

// xMinMax();
// yMinMax();

// let xScale = d3
//   .scaleLinear()
//   .domain([xMin, xMax])
//   .range([margin + labelSpace, width - margin]);

// let yScale = d3
//   .scaleLinear()
//   .domain([yMin, yMax])
//   .range([height - margin - labelSpace, margin]);

// let xAxis = d3.axisBottom(xScale);
// let yAxis = d3.axisLeft(yScale);

// function tickCount() {
//   if (width <= 500) {
//     xAxis.ticks(5);
//     yAxis.ricks(5);
//   } else {
//     xAxis.ticks(10);
//     yAxis.ticks(10);
//   }
// }
// tickCount();
