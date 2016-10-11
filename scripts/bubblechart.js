/**
 * Created by Kunal on 15-Mar-16.
 */
function createBubble() {
    var w = 800;
    var h = 300;
    var oR = 0;
    var nTop = 0;

    d3.selectAll("svg.mainBubbleSVG").remove();

    var svgContainer = d3.select("#mainBubble")
        .style("height", h + "px");

    var svg = d3.select("#mainBubble").append("svg")
        .attr("class", "mainBubbleSVG")
        .attr("width", w)
        .attr("height", h)
        .on("mouseleave", function () {
            return resetBubbles();
        });

    var mainNote = svg.append("text")
        .attr("id", "bubbleItemNote")
        .attr("x", 10)
        .attr("y", w / 2 - 15)
        .attr("font-size", 12)
        .attr("font-family", "Tahoma")
        .attr("dominant-baseline", "middle")
        .attr("alignment-baseline", "middle")
        .style("fill", "#888888");


    d3.json("comparison.json", function (error, root) {
        console.log(error);

        var bubbleObj = svg.selectAll(".topBubble")
            .data(root.children)
            .enter().append("g")
            .attr("id", function (d, i) {
                return "topBubbleAndText_" + i
            });

        console.log(root);
        nTop = root.children.length;
        oR = w / (1 + 3 * nTop);

        h = Math.ceil(w / nTop * 2);
        svgContainer.style("height", h + "px");

        var colVals = d3.scale.ordinal()
            .domain(["0", "1", "2"])
            .range(["#d3b755", "#759acd", "#31a17a"]);

        var tcolVals = d3.scale.ordinal()
            .domain(["0", "1", "2", "3"])
            .range(["#22313F", "#22313F", "#22313F", "#22313F"]);

        bubbleObj.append("circle")
            .attr("class", "topBubble")
            .attr("id", function (d, i) {
                return "topBubble" + i;
            })
            .attr("r", function (d) {
                return oR;
            })
            .attr("cx", function (d, i) {
                return oR * (3 * (1 + i) - 1);
            })
            .attr("cy", (h + oR) / 3)
            .style("fill", "#6C7A89") ///kunal fill main circle
            .style("opacity", 0.3)
            .on("mouseover", function (d, i) {
                return activateBubble(d, i);
            });


        bubbleObj.append("text")
            .attr("class", "topBubbleText")
            .attr("x", function (d, i) {
                return oR * (3 * (1 + i) - 1);
            })
            .attr("y", (h + oR) / 3)
            .style("fill", function (d, i) {
                return tcolVals(i);
            })
            .attr("font-size", 18)
            .attr("font-family", "Tahoma")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("alignment-baseline", "middle")
            .text(function (d) {
                return d.name
            })
            .on("mouseover", function (d, i) {
                return activateBubble(d, i);
            });


        for (var iB = 0; iB < nTop; iB++) {
            var childBubbles = svg.selectAll(".childBubble" + iB)
                .data(root.children[iB].children)
                .enter().append("g");

            childBubbles.append("circle")
                .attr("class", "childBubble" + iB)
                .attr("id", function (d, i) {
                    return "childBubble_" + iB + "sub_" + i;
                })
                .attr("r", function (d) {
                    return oR / 3.0;
                })
                .attr("cx", function (d, i) {
                    return (oR * (3 * (iB + 1) - 1) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * Math.PI));
                })
                .attr("cy", function (d, i) {
                    return ((h + oR) / 3 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * Math.PI));
                })
                .attr("cursor", "pointer")
                .style("opacity", 0.5)
                .style("fill", function (d, i) {
                    return colVals(i);
                })
                .append("svg:title")
                .text(function (d) {
                    return d.address;
                });

            childBubbles.append("text")
                .attr("class", "childBubbleText" + iB)
                .attr("x", function (d, i) {
                    return (oR * (3 * (iB + 1) - 1) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * Math.PI));
                })
                .attr("y", function (d, i) {
                    return ((h + oR) / 3 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * Math.PI));
                })
                .style("opacity", 0.5)
                .attr("text-anchor", "middle")
                .style("fill", function (d, i) {
                    return tcolVals(iB);
                }) // #1f77b4
                .attr("font-size", 4)
                .attr("font-family", "Tahoma")
                .attr("cursor", "pointer")
                .attr("dominant-baseline", "middle")
                .attr("alignment-baseline", "middle")
                .text(function (d) {
                    return d.name
                });
        }
    });

    resetBubbles = function () {
        w = 800;
        oR = w / (1 + 3 * nTop);

        h = Math.ceil(w / nTop * 2);
        svgContainer.style("height", h + "px");

        mainNote.attr("y", h - 15);

        svg.attr("width", w);
        svg.attr("height", h);

        var t = svg.transition()
            .duration(650);

        t.selectAll(".topBubble")
            .attr("r", function (d) {
                return oR;
            })
            .attr("cx", function (d, i) {
                return oR * (3 * (1 + i) - 1);
            })
            .attr("cy", (h + oR) / 3);

        t.selectAll(".topBubbleText")
            .attr("font-size", 18)
            .attr("x", function (d, i) {
                return oR * (3 * (1 + i) - 1);
            })
            .attr("y", (h + oR) / 3);

        for (var k = 0; k < nTop; k++) {
            t.selectAll(".childBubbleText" + k)
                .attr("x", function (d, i) {
                    return (oR * (3 * (k + 1) - 1) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * Math.PI));
                })
                .attr("y", function (d, i) {
                    return ((h + oR) / 3 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * Math.PI));
                })
                .attr("font-size", 4)
                .attr("font-family", "Tahoma")
                .style("opacity", 0.5);

            t.selectAll(".childBubble" + k)
                .attr("r", function (d) {
                    return oR / 3.0;
                })
                .style("opacity", 0.5)
                .attr("cx", function (d, i) {
                    return (oR * (3 * (k + 1) - 1) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * Math.PI));
                })
                .attr("cy", function (d, i) {
                    return ((h + oR) / 3 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * Math.PI));
                });

        }
    }


    function activateBubble(d, i) {
        var t = svg.transition()
            .duration(d3.event.altKey ? 7500 : 350);

        t.selectAll(".topBubble")
            .attr("cx", function (d, ii) {
                if (i == ii) {
                    // Nothing to change
                    return oR * (3 * (1 + ii) - 1) - 0.6 * oR * (ii - 1);
                } else {
                    // Push away a little bit
                    if (ii < i) {
                        // left side
                        return oR * 0.6 * (3 * (1 + ii) - 1);
                    } else {
                        // right side
                        return oR * (nTop * 3 + 1) - oR * 0.6 * (3 * (nTop - ii) - 1);
                    }
                }
            })
            .attr("r", function (d, ii) {
                if (i == ii)
                    return oR * 1.8;
                else
                    return oR * 0.8;
            });

        t.selectAll(".topBubbleText")
            .attr("x", function (d, ii) {
                if (i == ii) {
                    // Nothing to change
                    return oR * (3 * (1 + ii) - 1) - 0.6 * oR * (ii - 1);
                } else {
                    // Push away a little bit
                    if (ii < i) {
                        // left side
                        return oR * 0.6 * (3 * (1 + ii) - 1);
                    } else {
                        // right side
                        return oR * (nTop * 3 + 1) - oR * 0.6 * (3 * (nTop - ii) - 1);
                    }
                }
            })
            .attr("font-size", function (d, ii) {
                if (i == ii)
                    return 20 * 1.5;
                else
                    return 20 * 0.6;
            });

        var signSide = -1;
        for (var k = 0; k < nTop; k++) {
            signSide = 1;
            if (k < nTop / 2) signSide = 1;
            t.selectAll(".childBubbleText" + k)
                .attr("x", function (d, i) {
                    return (oR * (3 * (k + 1) - 1) - 0.6 * oR * (k - 1) + signSide * oR * 2.5 * Math.cos((i - 1) * 45 / 180 * Math.PI));
                })
                .attr("y", function (d, i) {
                    return ((h + oR) / 3 + signSide * oR * 2.5 * Math.sin((i - 1) * 45 / 180 * Math.PI));
                })
                .attr("font-size", function () {
                    return (k == i) ? 12 : 6;
                })
                .style("opacity", function () {
                    return (k == i) ? 1 : 0;
                });

            t.selectAll(".childBubble" + k)
                .attr("cx", function (d, i) {
                    return (oR * (3 * (k + 1) - 1) - 0.6 * oR * (k - 1) + signSide * oR * 2.5 * Math.cos((i - 1) * 45 / 180 * Math.PI));
                })
                .attr("cy", function (d, i) {
                    return ((h + oR) / 3 + signSide * oR * 2.5 * Math.sin((i - 1) * 45 / 180 * Math.PI));
                })
                .attr("r", function () {
                    return (k == i) ? (oR * 0.55) : (oR / 3.0);
                })
                .attr("font-family", "Tahoma")
                .style("opacity", function () {
                    return (k == i) ? 1 : 0;
                });
        }
    }

    window.onresize = resetBubbles;
}