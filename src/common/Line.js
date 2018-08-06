/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Kuldeep.Bhatt, Zymr
*******************************************************/

// var Highcharts = require('highcharts');
// require('highcharts/modules/exporting')(Highcharts);
var lineGraphSize=[];
var Line = function(level0, level1, level2, level3, containerId, colorOptions, localJsonData, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby,xaxistitle,yaxistitle) {
 var graphWidth =0;
 var graphHeight =0;
 
  if(typeof lineGraphSize[containerId] =='undefined') {
    var $container = $('#'+containerId);
    var size =  { width : $container.width(), height:  $container.height()};
    lineGraphSize[containerId]= size;
    graphWidth = $container.width();
    graphHeight = $container.height();
  }
  else {
   if(lineGraphSize[containerId]) {
    graphWidth= lineGraphSize[containerId].width;
    graphHeight = lineGraphSize[containerId].height;
   }
  }
  var typeofobject = typeof colorOptions;
  if (typeofobject == 'string') {
    Line.colorOptions = JSON.parse(colorOptions);
  } else {
    Line.colorOptions = colorOptions;
  }

  Line.levelindex = 0;
  Line.group0 = level0;
  Line.group1 = level1;
  Line.group2 = level2;
  Line.group3 = level3;
  Line.responseobj;

  var xhttp = new XMLHttpRequest();
  var url = $("#globaljsonurlfield").val() && ($("#globaljsonurlfield").val()).trim() ? ($("#globaljsonurlfield").val().trim()) : (window.globaljsonurl);
  if(window.globaldata) {
		 if(typeof(window.globaldata)=='string')
            {
                localJsonData =JSON.parse(atob(window.globaldata));
            }
            else
            {
           localJsonData = window.globaldata;
            }
  }
  if (url != undefined && url!='')
	{
    xhttp.open("GET", url, true);
    xhttp.send();
  }
  else if(localJsonData && Object.keys(localJsonData).length != 0 && localJsonData != null) {
		//Line.responseobj = localJsonData;
    var graphData = Line.getReponseData (localJsonData,level0);
		Line.responseobj = graphData.finalData;
		level0= graphData.level0;
		Line.group0=level0;
    var output = Line.creategrouping();
    Line.mainObject = output;
    Line.draw(output, containerId, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby,graphWidth,graphHeight,xaxistitle,yaxistitle);
  }
  else {
    Line.responseobj = ({
      "ACCOUNT_SUMMARY": [{
        "ACCOUNT": "Savings",
        "CURRENCY": "GBP",
        "AMOUNT": 1771.42,
        "TYPE": "Last Transaction",
        "COLOR": "#272822"
      }, {
        "ACCOUNT": "Wealth",
        "CURRENCY": "GBP",
        "AMOUNT": 7830,
        "TYPE": "Last Transaction",
        "COLOR": "#20415c"
      }, {
        "ACCOUNT": "Term",
        "CURRENCY": "GBP",
        "AMOUNT": 22730.11,
        "COLOR": "#3c423c",
        "TYPE": "Balance"
      }, {
        "ACCOUNT": "Term Deposit",
        "CURRENCY": "GBP",
        "AMOUNT": 103000,
        "COLOR": "#2ca02c",
        "TYPE": "Balance"
      }, {
        "ACCOUNT": "Wealth",
        "CURRENCY": "GBP",
        "AMOUNT": 10000,
        "TYPE": "Balance",
        "COLOR": "#3c423c"
      }, {
        "ACCOUNT": "Savings",
        "CURRENCY": "DOLLOR",
        "AMOUNT": 98,
        "TYPE": "Last Transaction",
        "COLOR": "#5e0702"
      }],
      "CUSTOMER_NAME": "Laura J Donald",
      "ADDRESS1": "4000 Executive Parkway,",
      "ADDRESS2": "Saint Globin Rd # 250",
      "ADDRESS3": "Canary Wharf, E94583",
      "STATEMENT_DATE": "1-APR-16",
      "FROM_DATE": "Annual Statement",
      "TO_DATE": "31 Oct 2014",
      "ACC_NO": "371860120",
      "CUSTOMER_ID": "37112666",
      "UNIQUE_ID": "David Miller",
      "BRANCH_ID": "ULLS00012",
      "RMCONTACT": "+44167000045",
      "RMNAME": "+44167000045",
      "BRANCH_ADDRESS1": "Saint College Rd,",
      "BRANCH_ADDRESS2": "PO BOX 345,",
      "BRANCH_ADDRESS3": "DUBLIN",
      "LAT": 25.363,
      "LONG": 72.044,
      "USERNAME": "test",
      "PASSWORD": "test"
    });
    var output = Line.creategrouping();
    Line.mainObject = output;
    Line.draw(output, containerId, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby,graphWidth,graphHeight,xaxistitle,yaxistitle);
  }


  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    //  Line.responseobj = JSON.parse(this.response);
      var responseData = JSON.parse(this.response);
			var graphData = Line.getReponseData (responseData,level0);
		  Line.responseobj = graphData.finalData;
		  level0= graphData.level0;
			Line.group0=level0;
      var output = Line.creategrouping();
      Line.mainObject = output;
      Line.draw(output, containerId, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby,graphWidth,graphHeight,xaxistitle,yaxistitle);
    } else {
      //do nothing for now
    }
  }

}
Line.creategrouping = function(selectedgroup) {
  var responsedataArr = Line.jsonPath(Line.responseobj, "$." + Line.group0);
  var data = {
    data: responsedataArr[0]
  };
  var level1arr = Line.jsonPath(data, "$.." + Line.group1);
  //var level1arr = Line.jsonPath(Line.responseobj, "$.." + Line.group1);
  var output = [];
  if (level1arr) {
    //identify the value type
    var content = level1arr[0];
    switch (typeof content) {
      case "number":
        {
          for (var i = 0; i < level1arr.length; i++) {
            output.push({
              value: level1arr[i],
              times: i,
              color: Line.getrandomcolor()
            })
          }
          // output = level1arr;
        }
        break;
      case "string":
        {
          if (selectedgroup) {
            switch (Line.levelindex) {
              case 0:
                {
                  output = Line.getmainlevel(level1arr);
                }
                break;
              case 1:
                {
                  output = [];
                  // var arrAccsummary = Line.responseobj['ACCOUNT_SUMMARY'];
                  var arrAccsummary = Line.responseobj[Line.group0];
                  var count = 0;
                  for (var i = 0; i < arrAccsummary.length; i++) {
                    var obj = arrAccsummary[i];
                    var value = obj[Line.group2];

                    if ((obj[Line.group1] == selectedgroup) && value) {
                      Line.identifyColor(Line.colorOptions, value, count, output, Line.group2, output.length);
                      count = count + 1;
                    }
                  }
                }
                break;
              case 2:
                {
                  output = [];
                  //var arrAccsummary = Line.responseobj['ACCOUNT_SUMMARY'];
                  var arrAccsummary = Line.responseobj[Line.group0];
                  var count = 0;
                  for (var i = 0; i < arrAccsummary.length; i++) {
                    var obj = arrAccsummary[i];
                    var value = obj[Line.group3];
                    if ((obj[Line.group2] == selectedgroup) && value) {
                      Line.identifyColor(Line.colorOptions, value, count, output, Line.group3, output.length);
                      count = count + 1;
                    }
                  }
                }
                break;
            }
          } else {
            output = Line.getmainlevel(level1arr);
          }
        }
        break;
      default:
        break;
    }
    return output;
  }
}
Line.getmainlevel = function(level1arr) {
  var data = [];
  var output = [];
  for (var i = 0; i < level1arr.length; i++) {
    if (!data[level1arr[i]]) {
      data[level1arr[i]] = 0;
    }
    data[level1arr[i]] = data[level1arr[i]] + 1;
  }
  var count = 0;
  Object.keys(data).forEach(function(key) {
    var value = data[key];
    Line.identifyColor(Line.colorOptions, key, count, output, key, count);
    count = count + 1;
  });
  return output;
}
Line.identifyColor = function(colorOptions, value, count, output, key, times) {
  var nocolor = true;
  for (var i = 0; i < colorOptions.length; i++) {
    var coloroption = colorOptions[i];
    var valuetocompare = coloroption.value;
    if (valuetocompare && valuetocompare === value) {
      nocolor = false;
      var colorvalue = coloroption.Color;
      var legendvalue = coloroption.legendvalue;
      if (colorvalue) {

        if (legendvalue) {
          output.push({
            value: legendvalue,
            times: times,
            index: count,
            color: colorvalue
          });
        } else {
          output.push({
            value: key,
            times: times,
            index: count,
            color: colorvalue
          });
        }
      } else {
        if (legendvalue) {
          output.push({
            value: legendvalue,
            times: times,
            index: count,
            color: Line.getrandomcolor(count)
          });
        } else {
          output.push({
            value: key,
            times: times,
            index: count,
            color: Line.getrandomcolor(count)
          });
        }

      }
      break;
    }
  }
  if (nocolor) {
    output.push({
      value: key,
      times: times,
      index: count,
      color: Line.getrandomcolor(count)
    });
  }
}
Line.getrandomcolor = function(index) {
  var colorarr = ["#3366CC", "#d62728", "#ff7f0e", "#2ca02c", "#F08080", "#E9967A", "#FFA07A", "#CD5C5C", "#2E86C1", "#76448A"];
  var color = "#d62728";
  switch (index) {
    case 0:
      color = "#272822";
      break;

    case 1:
      color = "#ff7f0e";
      break;

    case 2:
      color = "#d62728";
      break;

    case 3:
      color = "#2ca02c";
      break;

    case 4:
      color = "#d62728";
      break;

    case 5:
      color = "#5e0702";
      break;

    case 6:
      color = "#CD5C5C";
      break;

    case 7:
      color = "#5e0702";
      break;

    case 8:
      color = "#76448A";
      break;

    case 9:
      color = "#5e0702";
      break;

    default:
      color = "#5e0702";
  }
  return color;
}

Line.draw = function(data, containerId, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby,graphWidth,graphHeight,xaxistitle,yaxistitle) {
  d3.selectAll("#" + containerId + " svg > *").remove();
  // set the dimensions and margins of the graph
  var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  };

  var $container = $('.chart-container');
  var width=0;
  var height=0;
 if(typeof graphWidth =='undefined'&&lineGraphSize[containerId])
 {
  graphWidth= lineGraphSize[containerId].width;
  graphHeight = lineGraphSize[containerId].height;
 }
  if(graphWidth==0) {
  width = $container.width() + margin.left + margin.right;
  height = $container.height() + margin.top + margin.bottom;
 }
 else {
  width =graphWidth + margin.left + margin.right;
  height = graphHeight + margin.top + margin.bottom;
 }
 
  var outerRadius = Math.min(width, height) / 2;
  var innerRadius = (outerRadius / 5) * 4;
  // var fontSize = (Math.min(width, height) / 4);

  var viewboxwidth = width;
  if (width <= 768) {
    viewboxwidth = 1100;
  } else if (width > 768) {
    viewboxwidth = width * 2;
  }
  var viewboxheight = 600;
  // parse the date / time
  var parseTime = d3.timeParse("%d-%b-%y");
  var formatTime = d3.timeFormat("%e %B");
  // set the ranges
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);
  // define the line
  var valueline = d3.line()
    .x(function(d) {
      return x(d.index);
    })
    .y(function(d) {
      var value;
      if (valueby == 'Percentage') {
        value = y(parseFloat(d.times / data.length) * 100);
      } else {
        value = y(parseInt(d.times));
      }
      return value;
    });
  var div = d3.select("#tooltip"+containerId)
    .style("opacity", 0);
  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  var svg = d3.select("#" + containerId + " svg")
    .attr('viewBox', '-70 -50 ' + viewboxwidth + ' ' + viewboxheight)
    .attr('width', "100%")
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .classed("svg-content-responsive", true)
  // svg.append("g").attr("id", containerId); .attr("transform",
  // "translate(" + margin.left + "," + margin.top + ")");
  // scale the range of the data
  // Scale the range of the data
  x.domain(d3.extent(data, function(d) {
    return d.index;
  }));
  y.domain([0, d3.max(data, function(d) {
    var value;
    if (valueby == 'Percentage') {
      value = (parseFloat(d.times / data.length) * 100);
    } else {
      value = parseInt(d.times);
    }
    return value;
  })]);
  // add the valueline path.
  var path = svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr('pointer-events', 'all')
    .attr("d", valueline);
  // .attr("stroke",function(d) {
  //   return d.color;
  // });
  // add the dots with tooltips
  var circle = svg.selectAll("dot").data(data).enter().append("circle").attr("r", 5)
    .attr("cx", function(d, i) {
      return x(d.index);
    })
    .attr("cy", function(d) {
      var value;
      if (valueby == 'Percentage') {
        value = y(parseFloat(d.times / data.length) * 100);
      } else {
        value = y(parseInt(d.times));
      }
      return value;
    })
    .attr("stroke-width", 8)
    .attr("stroke", function(d) {
      return d.color;
    })
    .attr('pointer-events', 'all');

  circle.on("mouseover", function(d) {
      var valuebytype;
      if (valueby == 'Percentage') {
        valuebytype = (parseFloat(d.times / data.length) * 100) + '%';
      } else {
        valuebytype = parseInt(d.times);
      }

      var tooltiptexthtml = "x:" + d.value + "</br> y:" + valuebytype;
      if (tooltipgroup) {
        tooltiptexthtml = '';
        for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          if (valueby == 'Percentage') {
            valuebytype = (parseFloat(obj.times / data.length) * 100) + '%';
          } else {
            valuebytype = parseInt(obj.times);
          }

          tooltiptexthtml = "x:" + obj.value + ", y:" + valuebytype + '\n' + tooltiptexthtml;
        }

      }

      div.transition()
        .duration(200)
        .style("opacity", (showtooltip == false ? 0 : 1));
      div.html(tooltiptexthtml)
        .style("left", (d3.event.pageX - 5) + "px")
        .style("top", (d3.event.pageY + 10) + "px");

      if (showtooltip == "false") {
        div.transition()
          .duration(200)
          .style("opacity", 0);
      }
    })
    .on("click", function(d) {
      if (Line.levelindex < 2)
        Line.levelindex += 1;
      else
        Line.levelindex = 0;
      var output = Line.creategrouping(d.value);
      if (output.length > 0) {
        Line.draw(output, containerId, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby);
      } else {
        var level1arr = Line.jsonPath(Line.responseobj, "$.." + Line.group1);
        if(Line.group2.length > 0){
          output = Line.getmainlevel(level1arr);
          Line.draw(output, containerId, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby);  
        }
        
      }
    })
    .on("mouseout", function(d) {
      div.transition().duration(200).style("opacity", .9);
    });
  // add the X Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  // add the Y Axis
  svg.append("g")
    .call(d3.axisLeft(y));
  // text label for the y axis
  var axislabel = yaxistitle;
  if (valueby == 'Percentage') {
    axislabel = yaxistitle + '(%)';
  }

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(axislabel);
  // text label for the x axis
  svg.append("text")
    .attr("transform",
      "translate(" + (width / 2) + " ," +
      (height + margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .text(xaxistitle);

  // Legends
  var padding = 100;
  var donutwidth = ($('#' + containerId)[0].getBoundingClientRect().width + padding);
  var donutheight = ($('#' + containerId)[0].getBoundingClientRect().height);

  Line.addlegends(svg, data, donutwidth, donutheight, showlegends, alignment);
}
Line.addlegends = function(svg, data, width, height, showlegends, alignment) {
  // again rebind for legend
  // again rebind for legend
  var visibility = 'visible';
  if (showlegends === "false" || showlegends === false) {
    visibility = 'hidden';
  } else {
    visibility = 'visible';
  }
  var legendG;
  var padding = 100,
    legendwidth = 10,
    legendheight = 10,
    legendtextX = 13,
    legendtextY = 11,
    extraYPad = -30,
    x = width,
    y = height;
  if (alignment == 'Horizontol') {
    legendG = svg.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
      .data(data)
      .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(" + (i * padding) + "," + extraYPad + ")"; // place each legend on the right and bump each one down 15 pixels
      })
      .attr("className", "legend")
      .style("visibility", visibility);
  } else {
    legendG = svg.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
      .data(data)
      .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(" + x + "," + (i * 15 + 20) + ")"; // place each legend on the right and bump each one down 15 pixels
      })
      .attr("className", "legend")
      .style("visibility", visibility);
  }
  legendG.append("rect") // make a matching color rect
    .attr("width", legendwidth)
    .attr("height", legendheight)
    .attr("fill", function(d, i) {
      return d.color;
    });

  legendG.append("text") // add the text
    .text(function(d) {
      return d.times + "  " + d.value;
    })
    .style("font-size", 12)
    .attr("y", legendtextY)
    .attr("x", legendtextX);
}
Line.jsonPath = function(obj, expr, arg) {
  var P = {
    resultType: arg && arg.resultType || "VALUE",
    result: [],
    normalize: function(expr) {
      var subx = [];
      return expr.replace(/[\['](\??\(.*?\))[\]']/g, function($0, $1) {
          return "[#" + (subx.push($1) - 1) + "]";
        })
        .replace(/'?\.'?|\['?/g, ";")
        .replace(/;;;|;;/g, ";..;")
        .replace(/;$|'?\]|'$/g, "")
        .replace(/#([0-9]+)/g, function($0, $1) {
          return subx[$1];
        });
    },
    asPath: function(path) {
      var x = path.split(";"),
        p = "$";
      for (var i = 1, n = x.length; i < n; i++)
        p += /^[0-9*]+$/.test(x[i]) ? ("[" + x[i] + "]") : ("['" + x[i] + "']");
      return p;
    },
    store: function(p, v) {
      if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
      return !!p;
    },
    trace: function(expr, val, path) {
      if (expr) {
        var x = expr.split(";"),
          loc = x.shift();
        x = x.join(";");
        if (val && val.hasOwnProperty(loc))
          P.trace(x, val[loc], path + ";" + loc);
        else if (loc === "*")
          P.walk(loc, x, val, path, function(m, l, x, v, p) {
            P.trace(m + ";" + x, v, p);
          });
        else if (loc === "..") {
          P.trace(x, val, path);
          P.walk(loc, x, val, path, function(m, l, x, v, p) {
            typeof v[m] === "object" && P.trace("..;" + x, v[m], p + ";" + m);
          });
        } else if (/,/.test(loc)) { // [name1,name2,...]
          for (var s = loc.split(/'?,'?/), i = 0, n = s.length; i < n; i++)
            P.trace(s[i] + ";" + x, val, path);
        } else if (/^\(.*?\)$/.test(loc)) // [(expr)]
          P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";") + 1)) + ";" + x, val, path);
        else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
          P.walk(loc, x, val, path, function(m, l, x, v, p) {
          if (P.eval(l.replace(/^\?\((.*?)\)$/, "$1"), v[m], m)) P.trace(m + ";" + x, v, p);
        });
        else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
          P.slice(loc, x, val, path);
      } else
        P.store(path, val);
    },
    walk: function(loc, expr, val, path, f) {
      if (val instanceof Array) {
        for (var i = 0, n = val.length; i < n; i++)
          if (i in val)
            f(i, loc, expr, val, path);
      } else if (typeof val === "object") {
        for (var m in val)
          if (val.hasOwnProperty(m))
            f(m, loc, expr, val, path);
      }
    },
    slice: function(loc, expr, val, path) {
      if (val instanceof Array) {
        var len = val.length,
          start = 0,
          end = len,
          step = 1;
        loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0, $1, $2, $3) {
          start = parseInt($1 || start);
          end = parseInt($2 || end);
          step = parseInt($3 || step);
        });
        start = (start < 0) ? Math.max(0, start + len) : Math.min(len, start);
        end = (end < 0) ? Math.max(0, end + len) : Math.min(len, end);
        for (var i = start; i < end; i += step)
          P.trace(i + ";" + expr, val, path);
      }
    },
    eval: function(x, _v, _vname) {
      try {
        return $ && _v && eval(x.replace(/@/g, "_v"));
      } catch (e) {
        throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a"));
      }
    }
  };
  var $ = obj;
  if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
    P.trace(P.normalize(expr).replace(/^\$;/, ""), obj, "$");
    return P.result.length ? P.result : false;
  }
}
Line.getReponseData = function(resData, lev0) {
  var finalData = resData;
  var tempLevel='';
  if(lev0) {
	var levels = lev0.split('.');
	levels.forEach(function(level) {
		if(finalData) {
			finalData = finalData[level];
			tempLevel = level;
		}
	});
  }
  if(tempLevel!=''&&tempLevel!=lev0) {
	var dt ={};
	dt[tempLevel] = finalData;
	finalData = {finalData:dt,level0:tempLevel}
  }
  else
  {
	var dt ={};
	dt[lev0] = finalData;
	finalData = {finalData:dt,level0:lev0}
  }
 
  return finalData;
}

module.exports = Line;