function build_bar(root, data, width, height) {
	root.attr("width", width)
		.attr("height", height);
	var key, count = 0, values = [], keys=[];
	
	map_obj(data, function(val, key) {
		values.push(val);
		keys.push(key);
		count += 1;
	});

	var x = d3.scale.linear()
						 .domain([0, d3.max(values)])
						 .range([0, width]);
	var bar_height = height / count;
	var bar = root.selectAll("g")
				  .data(values)
				  .enter()
				  .append("g")
				  .attr("transform", function(d, i) { return "translate(0," + i * bar_height + ")"; });
	bar.append("rect")
		.attr("width", x)
		.attr("height", bar_height - 1);
	bar.append('text')
		.attr("x", function(d) { return x(d) - 3; })
		.attr("y", bar_height / 2)
		.attr("dy", ".35em")
		.text(function(d) { return d; });
	bar.append('text')
		.attr('x', 0)
		.attr('y', bar_height / 2)
		.attr('dy', ".35em")
		.text(function(d, i) { return keys[i]; });
}