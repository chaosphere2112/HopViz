function build_bar(root, data, width, row_height) {
	var key, count = 0, values = [], keys=[];
	
	map_obj(data, function(val, key) {
		if (val === 0) {
			return;
		}
		values.push(val);
		keys.push(key);
		count += 1;
	});
	
	root.attr("width", width)
		.attr("height", row_height * count);
	
	root.selectAll("*").remove();

	var x = d3.scale.linear()
						 .domain([0, d3.sum(values)])
						 .range([0, width]);
	var bar = root.selectAll("g")
				  .data(values)
				  .enter()
				  .append("g")
				  .attr("transform", function(d, i) { return "translate(0," + i * row_height + ")"; });

	bar.append("rect")
		.attr("class", "bar")
		.attr("width", x)
		.attr("height", row_height - 4);
	bar.append('text')
		.attr("class", "bar_label")
		.attr('x', 0)
		.attr('y', row_height / 2)
		.attr('dy', ".35em")
		.text(function(d, i) { return keys[i]; });
}