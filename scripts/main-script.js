
var w=800;
var h=800;
var pwr=60;//default is tungsten
var eff=15;//default is tungsten
var n = 0;
var no_of_bulbs = [];
var svg, selected_room;
var width = 250;
var height = 250;
var e=150;
var len, brd, bulb;
var c=1.2, b, y;
var hou = 1.2;
var default_hours = "1,000";

var url = 'url(css/images/bedroom.png)';
$('#selected_room').css('background-image', url);
$("#length").val(3.5);
$("#breadth").val(3.2);

$("#roomtype").on('change', function() {

    d3.selectAll("svg.mysvg").remove();
    r = $("#roomtype").val();
    if (r === "bed") {
        var url = 'url(css/images/bedroom.png)';
        $('#selected_room').css('background-image', url);
        e=150;
        $("#length").val(3.7);
        $("#breadth").val(3.2);
        hou = 1.2;
    }

    if (r === "live") {
        var url = 'url(css/images/living.png)';
        $('#selected_room').css('background-image', url);
        e=150;
        $("#length").val(4.5);
        $("#breadth").val(3.7);
        hou = 1.7;
    }

    if (r === "kitchen") {
        var url = 'url(css/images/kitchen.png)';
        $('#selected_room').css('background-image', url);
        e=250;
        $("#length").val(3.5);
        $("#breadth").val(2.5);
        hou = 2.3;
    }

    if (r === "bath") {
        var url = 'url(css/images/bathroom.png)';
        $('#selected_room').css('background-image', url);
        e=200;
        hou = 1.2;
        $("#length").val(2.3);
        $("#breadth").val(1.53);
    }

    if (r === "dine") {
        var url = 'url(css/images/dining.png)';
        $('#selected_room').css('background-image', url);
        e=150;
        hou = 1.5;
        $("#length").val(3.4);
        $("#breadth").val(4.9);
    }
    calculate();
});

//initial slider
function initiate_slider(s_min, s_max, step, set_val, s_text) {
    bulb_type = $("input[type='radio'][name='bulb']:checked").val();
    // $("#bulb_type").text(bulb_type);
    $( "#slider1" ).slider({
    orientation: "horizontal",
    range: "min",
    value: set_val,
    min: s_min,
    max: s_max,
    step: step,
    animate: true,
    start: function( event, ui ) {
        pwr=+ui.value;
        $(ui.handle).find('.ui-slider-tooltip').show();
    },
    stop: function( event, ui ) {
        $(ui.handle).find('.ui-slider-tooltip').hide();
    },
    slide: function (event, ui) {
        pwr=+ui.value;
        $(ui.handle).find('.ui-slider-tooltip').text(ui.value + s_text);
        $("#bulb_power").text(ui.value + s_text);
        calculate();
    },
    create: function (event, ui) {
        $("#bulb_power").text(set_val + s_text);
        var tooltip = $('<div class="ui-slider-tooltip" />').css({
            position: 'absolute',
            top: -25,
            left: -10,
        });
        $(event.target).find('.ui-slider-handle').append(tooltip);
    }
});
}

//end of initial slider
//Selecting and saving the value of the radio button
// var bulb=$("input[name='bulb']:checked").val();
initiate_slider(60,120,20,60," Watts");
//console.log(bulb);


$( ".bulb" ).change(function()
{
    document.getElementById('cus_r').checked = true;
    var bulb = $("input[type='radio'][name='bulb']:checked").val();
    console.log(bulb);
    if (bulb == 'Incandescent') {
        eff=15;
        pwr=60;
        c=1.2;
        default_hours = "1,000";
        calculate(); 
        $( "#slider1" ).slider("destroy");
        initiate_slider(60,120,20,60," Watts");
        // $("#lifespan").text("1,000");

    }
    if (bulb == 'CFL') {
        eff=60;
        pwr=10;
        c=3;
        default_hours = "8,000";
        calculate(); 
        $( "#slider1" ).slider("destroy");
        initiate_slider(14,42,4,14," CFL Watts");
        // $("#lifespan").text("8,000");
        
    }
    if (bulb == 'LED') {
        eff=90;
        pwr=5;
        c=8; 
        default_hours = "25,000";
        calculate(); 
        $( "#slider1" ).slider("destroy");
        initiate_slider(5,40,5,5," LED Watts");
        // $("#lifespan").text("25,000");
    }
    
});

$( ".pref" ).change(function()
{
    var preference =$("input[type='radio'][name='pref']:checked").val();

    if (preference == "Low Power Consumption") {
        eff=90;
        pwr=5;
        c=8;
        default_hours = "25,000";
        document.getElementById('led_r').checked = true;
        $( "#slider1" ).slider("destroy");
        initiate_slider(5,40,5,5," LED Watts");
        calculate();
    }
    if (preference == "Cost Saving") {
        eff=90;
        pwr=25;
        c=8;
        default_hours = "25,000";
        document.getElementById('led_r').checked = true;
        $( "#slider1" ).slider("destroy");
        initiate_slider(5,40,5,25," LED Watts");
        calculate();
    }
    if (preference == "Eco Friendly") {
        // $("input[name='bulb']:checked").val("LED");
        eff=90;
        pwr=45;
        c=8;
        default_hours = "25,000";
        document.getElementById('led_r').checked = true;
        $( "#slider1" ).slider("destroy");
        initiate_slider(5,40,5,45," LED Watts");
        calculate();
    }
    if (preference == "Custom Setting") {
        pwr=60;//default is tungsten
        eff=15;//default is tungsten
        c=1.2;
        calculate();
        default_hours = "1,000";
        $( "#slider1" ).slider("destroy");
        initiate_slider(60,120,20,60," Watts");
        document.getElementById('inc_r').checked = true;
    } 
});


$('input').on('change', function() {
    
    bulb=$("input[name='bulb']:checked").val();
    bulb_type = $("input[type='radio'][name='bulb']:checked").val();
    $("#bulb_type").text(bulb_type);

    pref_v = $("input[name='pref']:checked").val();
    $("#select_preference").text(pref_v);

});
//End of radio

//Selecting and saving values of dimensions
len =+ (document.getElementById("length").value);
$('input').on('change', function() {
    len =+ (document.getElementById("length").value);
    calculate();
});

brd =+ (document.getElementById("breadth").value);
$('input').on('change', function() {
    brd =+ (document.getElementById("breadth").value);
    calculate();
});

//End of text box

calculate();

function calculate()
{
    createBubble();
    $('#lifespan').text(default_hours);
    var area=len*brd;
    n=Math.ceil((e*area)/(pwr*eff*0.5*0.8));
    if (n % 2 == 1 & n != 3 & n != 1)
    {
        n += 1;
    }
    b = n;
    cost = parseFloat(parseFloat(b * c).toFixed(1));
    y = ((b*pwr)*(hou*0.12*365))/1000.0;
    y = parseFloat(parseFloat(y).toFixed(1));
    no_of_bulbs[0] = n;

    d3.selectAll("svg.mysvg").remove();
    svg = d3.select("#selected_room").selectAll("svg.mysvg")
        .data(no_of_bulbs)
        .enter().append("svg")
        .attr("class","mysvg")
        .attr("width", width)
        .attr("height", height);

        svg.append("g")
        .attr("transform", "translate(" + [width / 2, height / 2] + ")")
        .each(function(d) {
          d3.select(this).call(bulb_placement, primeFactors(d), width / 2);
        });

        svg = d3.select("#selected_room").selectAll("svg.mysvg")
        .data(no_of_bulbs)
        .enter().append("svg")
            .attr("class","mysvg")
        .attr("width", width)
        .attr("height", height);

    svg.append("g")
        .attr("transform", "translate(" + [width / 2, height / 2] + ")")
        .each(function(d) {
          d3.select(this).call(bulb_placement, primeFactors(d), width / 2);
        });
     draw(b,cost,y);
}


function bulb_placement(selection, factors, size) {
    var radialGradient = svg.append("defs")
        .append("radialGradient")
        .attr("id", "radial-gradient");

    radialGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "red");

    radialGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#fff");
      if (factors.length) {
        
        // Retrieving factors one by one from the prime factorization array
        var n = factors.pop();
        

        //  calculating the adjustment in angle based on the factor 
        if (n === 4){
            offset = 45; // 45 degrees will place the 4 bulbs in the 4 corners of a square
        }
            else if (n === 2) {
                offset = 0; // 0 degrees will place the 2 bulbs side by side
            }
                else {
                    offset = -90; // -90 degrees will club the bulbs in the form of a triangle
                };
        // Calculating the radius of the circle based on the number of bulbs 
        radius = n * size / (n + 2);
        
        // Displacement in the y coordinate between 2 bulbs in the same cluster
        dy = n & 1 ? (radius / 2) * (1 - Math.cos(3.14 / n)) : 0;

        // Create empty placeholders for all factors n
        selection.selectAll("g")
            .data(d3.range(n))
            .enter().append("g")
            .attr("transform", function(d) {
              var angle = d * 360 / n + offset;
              return "translate(0," + dy + ")rotate(" + angle + ")translate(" + radius + ")rotate(" + - angle + ")";
            })
            .call(bulb_placement, factors, 2 * size / (n + 2));
      } 
      // append the bulbs 
      else selection.append("circle").attr("r", size * 1.5).style("opacity","0.4").style("fill", "url(#radial-gradient)");

}

// Function to calculate the prime factors of the number of bulbs to find the combinations
function primeFactors(n) {
  var factors = [],
      f;
  while (n > 1) {

    factors.push(f = factor(n)); // Calling the function for finding the factors
    n /= f;
  }
  return factors;
}

function factor(n) {


  // Preserving the combination of 4 bulbs
  if (n % 4 === 0) return 4;

  for (var i = 2; i <= n / 2; i++) {
    if (n % i === 0) return i;
  }
  return n;
}

// creating radial interactions to show the number of bulbs, cost of bulbs and operating cost

function draw(b,cost,y){   

    var div1=d3.select(document.getElementById('div1'));
    var div2=d3.select(document.getElementById('div2'));
    var div3=d3.select(document.getElementById('div3'));

      var rp1 = radialProgress(document.getElementById('div1'))
                // .label("Number of Bulbs")
                .label("")
                .diameter(100)
                .value(b)
                .minValue(1)
                .maxValue(9)
                .render();

        var rp2 = radialProgress(document.getElementById('div2'))
                // .label("Bulbs Purchase Cost")
                .label("")
                .diameter(100)
                .value(cost)
                .minValue(1)
                .maxValue(50)
                .render();

        var rp3 = radialProgress(document.getElementById('div3'))
                // .label("Operating Cost / Year")
                .label("")
                .diameter(100)
                .value(y)
                .minValue(1)
                .maxValue(30)
                .render();
}


    function labelFunction(val,min,max) {

    }

function radialProgress(parent) {
    var _data=null,
        _duration= 1000,
        _selection,
        _margin = {top:0, right:0, bottom:0, left:0},
        __width = 300,
        __height = 300,
        _diameter = 100,
        _label="",
        _fontSize=10;

    // var _mouseClick;

    var _value= 0,
        _minValue = 0,
        _maxValue = 100;

    // Initalizing the arc values to fill the dials
    var  _currentArc= 0, _currentArc2= 0, _currentValue=0;

    var _arc = d3.svg.arc()
        .startAngle(0 * (Math.PI/180)); //just radians

    var _arc2 = d3.svg.arc()
        .startAngle(0 * (Math.PI/180))
        .endAngle(0); //just radians


    _selection=d3.select(parent);

    // Component to create objects for each of the 3 radials simultaneously
    function component() {

        _selection.each(function (data) {

            // Select the svg element, if it exists.
            var svg = d3.select(this).selectAll("svg").attr("class","mysvg").data([data]);

            var enter = svg.enter().append("svg").attr("class","radial-svg").append("g");

            measure();

            svg.attr("width", __width)
                .attr("height", __height);

            var background = enter.append("g").attr("class","component")
                .attr("cursor","pointer");
                // .on("click",onMouseClick);

            _arc.endAngle(360 * (Math.PI/180))

            background.append("rect")
                .attr("class","background")
                .attr("width", _width)
                .attr("height", _height);

            background.append("path")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc);

            background.append("text")
                .attr("class", "label")
                .attr("transform", "translate(" + (_width+10)/2 + "," + (_width + _fontSize) + ")")
                .text(_label);
            var g = svg.select("g")
                .attr("transform", "translate(" + _margin.left + "," + _margin.top + ")");


            _arc.endAngle(_currentArc);
            enter.append("g").attr("class", "arcs");
            var path = svg.select(".arcs").selectAll(".arc").data(data);
            path.enter().append("path")
                .attr("class","arc")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc);

            //Another path in case we exceed 100%
            var path2 = svg.select(".arcs").selectAll(".arc2").data(data);
            path2.enter().append("path")
                .attr("class","arc2")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc2);


            enter.append("g").attr("class", "labels");
            var label = svg.select(".labels").selectAll(".label").data(data);
            label.enter().append("text")
                .attr("class","label")
                .attr("y",(_width)/2+_fontSize/3)
                .attr("x",_width/2)
                .attr("cursor","pointer")
                .attr("width",_width)
                .text(_value)
                .style("font-size",_fontSize+"px")
                .style("opacity",0.5);
                // .on("click",onMouseClick);

            path.exit().transition().duration(500).attr("x",1000).remove();

            layout(svg);

            function layout(svg) {

                var ratio=(_value-_minValue)/(_maxValue-_minValue);
                var endAngle=Math.min(360*ratio,360);
                endAngle=endAngle * Math.PI/180;

                path.datum(endAngle);
                path.transition().duration(_duration)
                    .attrTween("d", arcTween);

                if (ratio > 1) {
                    path2.datum(Math.min(360*(ratio-1),360) * Math.PI/180);
                    path2.transition().delay(_duration).duration(_duration)
                        .attrTween("d", arcTween2);
                }

                label.datum(Math.round(ratio*100));
                label.transition().duration(_duration)
                    .tween("text",labelTween);

            }

        });
    }

    // Tweening for interpolating and animating the arc values
    function labelTween(a) {
        var i = d3.interpolate(_currentValue, a);
        _currentValue = i(0);
        return function(t) {
            _currentValue = i(t);
            if (_value[0] === b){
                this.textContent =  _value;
            }
            else {
                this.textContent = "~ $" + _value;
            }
        }
    }

    function arcTween(a) {
        var i = d3.interpolate(_currentArc, a);

        return function(t) {
            _currentArc=i(t);
            return _arc.endAngle(i(t))();
        };
    }

    function arcTween2(a) {
        var i = d3.interpolate(_currentArc2, a);

        return function(t) {
            return _arc2.endAngle(i(t))();
        };
    }

    // Dimensions and other input variable initializations
    function measure() {
        _width=_diameter - _margin.right - _margin.left - _margin.top - _margin.bottom + 30;
        _height=_width;
        _fontSize=_width*.22;
        _arc.outerRadius(_width/2);
        _arc.innerRadius(_width/2 * .85);
        _arc2.outerRadius(_width/2 * .85);
        _arc2.innerRadius(_width/2 * .85 - (_width/2 * .15));
    }


    component.render = function() {
        measure();
        component();
        return component;
    }

    component.value = function (_) {
        if (!arguments.length) return _value;
        _value = [_];
        _selection.datum([_value]);
        return component;
    }


    component.margin = function(_) {
        if (!arguments.length) return _margin;
        _margin = _;
        return component;
    };

    component.diameter = function(_) {
        if (!arguments.length) return _diameter
        _diameter =  _;
        return component;
    };

    component.minValue = function(_) {
        if (!arguments.length) return _minValue;
        _minValue = _;
        return component;
    };

    component.maxValue = function(_) {
        if (!arguments.length) return _maxValue;
        _maxValue = _;
        return component;
    };

    component.label = function(_) {
        if (!arguments.length) return _label;
        _label = _;
        return component;
    };

    component._duration = function(_) {
        if (!arguments.length) return _duration;
        _duration = _;
        return component;
    };

    return component;

}
