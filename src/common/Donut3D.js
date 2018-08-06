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
var Donut3DGraphSize=[];
var Donut3D = function(xRadius, yRadius, xTopRadius, yTopRadius, innerRadius, level0, level1, level2, level3, containerId, colorOptions, localJsonData, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby,xaxistitle,yaxistitle) {
	 var graphWidth =0;
  var graphHeight =0;
  
   if(typeof Donut3DGraphSize[containerId] =='undefined') {
     var $container = $('#'+containerId);
     var size =  { width : $container.width(), height:  $container.height()};
     Donut3DGraphSize[containerId]= size;
     graphWidth = $container.width();
     graphHeight = $container.height();
   }
   else {
    if(Donut3DGraphSize[containerId]) {
     graphWidth= Donut3DGraphSize[containerId].width;
     graphHeight = Donut3DGraphSize[containerId].height;
    }
	
   }
	var typeofobject = typeof colorOptions;
	if (typeofobject == 'string') {
		colorOptions = JSON.parse(colorOptions)
	}
	Donut3D.response(xRadius, yRadius, xTopRadius, yTopRadius, innerRadius, level0, level1, level2, level3, containerId, colorOptions, localJsonData, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby,graphWidth,graphHeight,xaxistitle,yaxistitle);
}
Donut3D.response = function(xRadius, yRadius, xTopRadius, yTopRadius, innerRadius, level0, level1, level2, level3, containerId, colorOptions, localJsonData, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby,graphWidth,graphHeight,xaxistitle,yaxistitle) {
	var centerX = 150;
	var centerY = 130;
	var radiusX = 130;
	var radiusY = 50;
	var innerHeight = 30;

	Donut3D.levelindex = 0;
	Donut3D.group0 = level0;
	Donut3D.group1 = level1;
	Donut3D.group2 = level2;
	Donut3D.group3 = level3;
	Donut3D.responseobj;
	Donut3D.colorOptions = colorOptions;

	if (innerRadius > 1)
		innerRadius = 0.5;
	else if (innerRadius < 0)
		innerRadius = 0;

	var id = "donut_" + containerId;

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
		var graphData = Donut3D.getReponseData (localJsonData,level0);
		Donut3D.responseobj = graphData.finalData;
		level0= graphData.level0;
		Donut3D.group0=level0;
		var output = Donut3D.creategrouping();
		Donut3D.mainObject = output;
		Donut3D.draw(id, output, centerX, centerY, innerHeight, xRadius, yRadius, xTopRadius, yTopRadius, innerRadius, containerId, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby,graphWidth,graphHeight,xaxistitle,yaxistitle);
	}
	else {
		Donut3D.responseobj = ({
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
		var output = Donut3D.creategrouping();
		Donut3D.mainObject = output;
		Donut3D.draw(id, output, centerX, centerY, innerHeight, xRadius, yRadius, xTopRadius, yTopRadius, innerRadius, containerId, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby,graphWidth,graphHeight,xaxistitle,yaxistitle);
	}
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var responseData = JSON.parse(this.response);
  
			var graphData = Donut3D.getReponseData (responseData,level0);
		    Donut3D.responseobj = graphData.finalData;
		    level0= graphData.level0;
			Donut3D.group0=level0;
			var output = Donut3D.creategrouping();
			Donut3D.mainObject = output;
			Donut3D.draw(id, output, centerX, centerY, innerHeight, xRadius, yRadius, xTopRadius, yTopRadius, innerRadius, containerId, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby,graphWidth,graphHeight,xaxistitle,yaxistitle);
		} else {

			//do nothing for now
		}
	}
}
Donut3D.creategrouping = function(selectedgroup) {
	var colorOptions = Donut3D.colorOptions;

	var responsedataArr = Donut3D.jsonPath(Donut3D.responseobj, "$." + Donut3D.group0);
	var data = {
		data: responsedataArr[0]
	};
	var level1arr = Donut3D.jsonPath(data, "$.." + Donut3D.group1);

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
							times: output.length,
							color: Donut3D.getrandomcolor(i)
						})
					}
					// output = level1arr;
				}


				break;

			case "string":
				{
					if (selectedgroup) {
						switch (Donut3D.levelindex) {
							case 0:
								{
									output = Donut3D.getmainlevel(level1arr);
								}
								break;
							case 1:
								{
									output = [];
									// var arrAccsummary = Donut3D.responseobj['ACCOUNT_SUMMARY'];
									var arrAccsummary = Donut3D.responseobj[Donut3D.group0];
									for (var i = 0; i < arrAccsummary.length; i++) {
										var obj = arrAccsummary[i];
										var value = obj[Donut3D.group2];

										if ((obj[Donut3D.group1] == selectedgroup) && value) {
											Donut3D.identifyColor(colorOptions, value, (i + 1), output, Donut3D.group2);
										}
									}
								}
								break;

							case 2:
								{
									output = [];
									//var arrAccsummary = Donut3D.responseobj['ACCOUNT_SUMMARY'];
									var arrAccsummary = Donut3D.responseobj[Donut3D.group0];
									for (var i = 0; i < arrAccsummary.length; i++) {
										var obj = arrAccsummary[i];
										var value = obj[Donut3D.group3];

										if ((obj[Donut3D.group2] == selectedgroup) && value) {
											Donut3D.identifyColor(colorOptions, value, (i + 1), output, Donut3D.group3);
										}
									}
								}
								break;

						}
					} else {
						output = Donut3D.getmainlevel(level1arr);
					}
				}
				break;
			default:
				break;
		}
		return output;
	}

}
Donut3D.getmainlevel = function(level1arr) {
	var colorOptions = Donut3D.colorOptions;
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
		Donut3D.identifyColor(colorOptions, key, count, output, key);
		count = count + 1;
	});
	return output;
}
Donut3D.identifyColor = function(colorOptions, value, count, output, key) {
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
						times: count + 1,
						color: colorvalue
					});
				} else {
					output.push({
						value: key,
						times: count + 1,
						color: colorvalue
					});
				}

			} else {
				if (legendvalue) {
					output.push({
						value: legendvalue,
						times: count + 1,
						color: Donut3D.getrandomcolor(count)
					});
				} else {
					output.push({
						value: key,
						times: count + 1,
						color: Donut3D.getrandomcolor(count)
					});
				}

			}
			break;
		}
	}
	if (nocolor) {
		output.push({
			value: key,
			times: count + 1,
			color: Donut3D.getrandomcolor(count)
		});
	}
}
Donut3D.getrandomcolor = function(index) {
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

Donut3D.draw = function(id, data, x /*center x*/ , y /*center y*/ , h /*height*/ , xRadius, yRadius, xTopRadius, yTopRadius, innerRadius, containerId, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby,graphWidth,graphHeight,xaxistitle,yaxistitle) {

	var $container = $('.chart-container');
	// 	var width = $container.width();
	// var height = $container.height();
	
	 var width=0;
   var height=0;
  if(typeof graphWidth =='undefined'&&Donut3DGraphSize[containerId])
  {
   graphWidth= Donut3DGraphSize[containerId].width;
   graphHeight = Donut3DGraphSize[containerId].height;
  }
   if(graphWidth==0) {
   width = $container.width() ;
   height = $container.height();
  }
  else {
   width =graphWidth;
   height = graphHeight;
	
  }

	var outerRadius = Math.min(width, height) / 2;
	var fontSize = (Math.min(width, height) / 4);

	var viewboxwidth = width;
	if (width < 600) {
		viewboxwidth = 600;
	}

	var viewboxheight = 300;

	d3.selectAll("#" + containerId + " svg > *").remove();

	var svg = d3.select("#" + containerId + " svg")
		.attr('viewBox', '0 0 ' + viewboxwidth + ' ' + viewboxheight)
		.attr('width', "100%")
		.attr('preserveAspectRatio', 'xMinYMin meet')
		.classed("svg-content-responsive", true);



	svg.append("g").attr("id", id);


	d3.select("#tooltip"+containerId)
		.style("opacity", 0);

	var _data = d3.pie().sort(null).value(function(d) {
		return d.times;
	})(data);

	var slices = d3.select("#" + id).append("g").attr("transform", "translate(" + x + "," + y + ")")
		.attr("class", "slices");

	slices.selectAll(".topSlice").data(_data).enter().append("path").attr("class", "topSlice")
		.style("fill", function(d) {
			return d.data.color;
		})
		.style("stroke", function(d) {
			return d.data.color;
		})
		.attr("d", function(d) {
			return Donut3D.pieTop(d, xTopRadius, yTopRadius, innerRadius);
		})
		.each(function(d) {
			this._current = d;
		});

	slices.selectAll(".outerSlice").data(_data).enter().append("path").attr("class", "outerSlice")
		.style("fill", function(d) {
			return d3.hsl(d.data.color).darker(0.7);
		})
		.attr("d", function(d) {
			return Donut3D.pieOuter(d, 150 - .5, 128 - .5, 20);
		})
		.each(function(d) {
			this._current = d;
		});

	var valuetype = '';
	if (valueby == 'Percentage') {
		valuetype = Donut3D.getPercent;
	} else {
		valuetype = Donut3D.getvalue;
	}

	slices.selectAll(".percent").data(_data).enter().append("text").attr("class", "percent")
		.attr("x", function(d) {
			return 0.6 * xRadius * Math.cos(0.5 * (d.startAngle + d.endAngle));
		})
		.attr("y", function(d) {
			return 0.6 * yRadius * Math.sin(0.5 * (d.startAngle + d.endAngle));
		})
		.text(valuetype).each(function(d) {
			this._current = d;
		});

		
	slices.selectAll(".topSlice")
		.on("mouseover", function(d) {
			if (tooltipgroup) {
				var tooltiptext = '';
				for (var i = 0; i < data.length; i++) {
					var obj = data[i];
					tooltiptext = obj.value + ' : ' + obj.times + '\n' + tooltiptext;
				}
				d3.select("#tooltip"+containerId)
					.style("left", (d3.event.pageX - 10) + "px")
					.style("top", (d3.event.pageY - 100) + "px")
					.style("opacity", (showtooltip == false ? 0 : 1))
					.select("#title"+containerId)
					.style("visibility", (showtooltip == false ? 'hidden' : 'visible'))
					.text(tooltiptext);
			} else {
				d3.select("#tooltip"+containerId)
					.style("left", (d3.event.pageX - 10) + "px")
					.style("top", (d3.event.pageY - 100) + "px")
					.style("opacity", (showtooltip == false ? 0 : 1))
					.select("#title"+containerId)
					.style("visibility", (showtooltip == false ? 'hidden' : 'visible'))
					.text(d.data.value);

				d3.select("#tooltip"+containerId).select("#value")
					.text(d.data.times);
			}
		})
		.on("click", function(d) {
			if (Donut3D.levelindex < 2)
				Donut3D.levelindex += 1;
			else
				Donut3D.levelindex = 0;
			var output = Donut3D.creategrouping(d.data.value);
			if (output.length > 0) {
				Donut3D.draw(id, output, x, y, innerHeight, xRadius, yRadius, xTopRadius, yTopRadius, innerRadius, containerId, charttitle, showlegends, showtooltip, alignment, tooltipgroup, valueby);
			} else {
				if(Donut3D.group1.length > 0){
					var level1arr = Donut3D.jsonPath(Donut3D.responseobj, "$.." + Donut3D.group1);
					output = Donut3D.getmainlevel(level1arr);	
				}
				
			}
		});
	svg.selectAll(".topSlice").on("mouseout", function(d) {
			d3.select("#tooltip"+containerId).style("opacity", 0);
		})
		// Legends
	var donutwidth = ($('#' + id)[0].getBoundingClientRect().width);
	var donutheight = ($('#' + id)[0].getBoundingClientRect().height);

	Donut3D.addlegends(slices, data, donutwidth, donutheight, showlegends, alignment);

};
Donut3D.addlegends = function(svg, data, width, height, showlegends, alignment) {
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
		extraYPad = 0,
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
Donut3D.pieTop = function(d, rx, ry, ir) {
	if (d.endAngle - d.startAngle == 0) return "M 0 0";
	var sx = rx * Math.cos(d.startAngle),
		sy = ry * Math.sin(d.startAngle),
		ex = rx * Math.cos(d.endAngle),
		ey = ry * Math.sin(d.endAngle);

	var ret = [];
	ret.push("M", sx, sy, "A", rx, ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "1", ex, ey, "L", ir * ex, ir * ey);
	ret.push("A", ir * rx, ir * ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "0", ir * sx, ir * sy, "z");
	return ret.join(" ");
};

Donut3D.pieOuter = function(d, rx, ry, h) {
	var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
	var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);

	var sx = rx * Math.cos(startAngle),
		sy = ry * Math.sin(startAngle),
		ex = rx * Math.cos(endAngle),
		ey = ry * Math.sin(endAngle);

	var ret = [];
	ret.push("M", sx, h + sy, "A", rx, ry, "0 0 1", ex, h + ey, "L", ex, ey, "A", rx, ry, "0 0 0", sx, sy, "z");
	return ret.join(" ");
};

Donut3D.pieInner = function(d, rx, ry, h, ir) {
	var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
	var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);

	var sx = ir * rx * Math.cos(startAngle),
		sy = ir * ry * Math.sin(startAngle),
		ex = ir * rx * Math.cos(endAngle),
		ey = ir * ry * Math.sin(endAngle);

	var ret = [];
	ret.push("M", sx, sy, "A", ir * rx, ir * ry, "0 0 1", ex, ey, "L", ex, h + ey, "A", ir * rx, ir * ry, "0 0 0", sx, h + sy, "z");
	return ret.join(" ");
};

Donut3D.getPercent = function(d) {
	return (d.endAngle - d.startAngle > 0.2 ?
		Math.round(1000 * (d.endAngle - d.startAngle) / (Math.PI * 2)) / 10 + '%' : '');
};
Donut3D.getvalue = function(d) {
	return d.value;
}

Donut3D.transition = function(id, data, rx, ry, h, ir) {
	function arcTweenInner(a) {
		var i = d3.interpolate(this._current, a);
		this._current = i(0);
		return function(t) {
			return Donut3D.pieInner(i(t), rx + 0.5, ry + 0.5, h, ir);
		};
	}

	function arcTweenTop(a) {
		var i = d3.interpolate(this._current, a);
		this._current = i(0);
		return function(t) {
			return Donut3D.pieTop(i(t), rx, ry, ir);
		};
	}

	function arcTweenOuter(a) {
		var i = d3.interpolate(this._current, a);
		this._current = i(0);
		return function(t) {
			return Donut3D.pieOuter(i(t), rx - .5, ry - .5, h);
		};
	}

	function textTweenX(a) {
		var i = d3.interpolate(this._current, a);
		this._current = i(0);
		return function(t) {
			return 0.6 * rx * Math.cos(0.5 * (i(t).startAngle + i(t).endAngle));
		};
	}

	function textTweenY(a) {
		var i = d3.interpolate(this._current, a);
		this._current = i(0);
		return function(t) {
			return 0.6 * rx * Math.sin(0.5 * (i(t).startAngle + i(t).endAngle));
		};
	}

	var _data = d3.pie().sort(null).value(function(d) {
		return d.value;
	})(data);

	d3.select("#" + id).selectAll(".innerSlice").data(_data)
		.transition().duration(750).attrTween("d", arcTweenInner);

	d3.select("#" + id).selectAll(".topSlice").data(_data)
		.transition().duration(750).attrTween("d", arcTweenTop);

	d3.select("#" + id).selectAll(".outerSlice").data(_data)
		.transition().duration(750).attrTween("d", arcTweenOuter);

	d3.select("#" + id).selectAll(".percent").data(_data).transition().duration(750)
		.attrTween("x", textTweenX).attrTween("y", textTweenY).text(Donut3D.getPercent);
};

Donut3D.tweenIn = function(data) {
	var interpolation = d3.interpolate({
		startAngle: 0,
		endAngle: 0
	}, data);
	this._current = interpolation(0);
	return function(t) {
		return arc(interpolation(t));
	};
}
Donut3D.tweenOut = function(data) {
	data.startAngle = data.endAngle = (2 * Math.PI);
	var interpolation = d3.interpolate(this._current, data);
	this._current = interpolation(0);
	return function(t) {
		return arc(interpolation(t));
	};
}

Donut3D.jsonPath = function(obj, expr, arg) {
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

Donut3D.getReponseData = function(resData, lev0) {
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

module.exports = Donut3D;