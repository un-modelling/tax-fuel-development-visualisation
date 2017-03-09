define(['d3'], function(d3) {
  var clear, create_frame, draw, graph, set_axis, tick_format;
  clear = function(id) {
    return d3.select("#" + id + "-graph svg").remove();
  };
  tick_format = function(v, m) {
    var t;
    t = v * 10000;
    if (m * 10000 > 4) {
      return t.toFixed(0);
    } else {
      return t.toFixed(1);
    }
  };
  create_frame = function(data, y_range, size) {
    var frame, x, xAxis, y, yAxis;
    x = d3.time.scale().domain(d3.extent(data, function(d) {
      return d.date;
    })).range([0, size.width]);
    xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(4);
    y = d3.scale.linear().domain([y_range.min, y_range.max]).range([size.height, 0]);
    yAxis = d3.svg.axis().scale(y).orient('left').ticks(4);
    return frame = {
      x: x,
      xAxis: xAxis,
      y: y,
      yAxis: yAxis
    };
  };
  set_axis = function(container, xAxis, dx, yAxis, dy) {
    container.append('g').attr({
      "class": 'x axis',
      transform: "translate(0," + dy + ")"
    }).call(xAxis);
    return container.append('g').attr({
      "class": 'y axis',
      transform: "translate(" + dx + ", 0)"
    }).call(yAxis);
  };
  draw = function(id) {
    var container, svg;
    svg = d3.select("#" + id + "-graph").append('svg').attr({
      version: "1.1",
      baseProfile: "full",
      xmlns: "http://www.w3.org/2000/svg",
      width: d3.select("#" + id + "-graph").node().clientWidth,
      height: _g.base_graph.height()
    });
    container = svg.append('g').attr({
      id: id,
      "class": "graph",
      transform: "translate(47,0)"
    });
    return container;
  };
  return graph = {
    clear: clear,
    draw: draw,
    set_axis: set_axis,
    tick_format: tick_format,
    create_frame: create_frame
  };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxNQUFILENBQVUsR0FBQSxHQUFLLEVBQUwsR0FBUyxRQUFuQixDQUEyQixDQUFDLElBQTVCLENBQUEsQ0FBa0MsQ0FBQyxXQUg1QztNQUlBLE1BQUEsRUFBUyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQWQsQ0FBQSxDQUpUO0tBRkU7SUFRTixTQUFBLEdBQVksR0FBRyxDQUFDLE1BQUosQ0FBVyxHQUFYLENBQ1YsQ0FBQyxJQURTLENBRVI7TUFBQSxFQUFBLEVBQUksRUFBSjtNQUNBLENBQUEsS0FBQSxDQUFBLEVBQU8sT0FEUDtNQUVBLFNBQUEsRUFBVyxpQkFGWDtLQUZRO0FBTVosV0FBTztFQWZGO0FBaUJQLFNBQU8sS0FBQSxHQUNMO0lBQUEsS0FBQSxFQUFVLEtBQVY7SUFDQSxJQUFBLEVBQVUsSUFEVjtJQUVBLFFBQUEsRUFBVSxRQUZWO0lBSUEsV0FBQSxFQUFhLFdBSmI7SUFNQSxZQUFBLEVBQWMsWUFOZDs7QUF0RVcsQ0FBZiIsImZpbGUiOiJncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZSBbJ2QzJ10sIChkMykgLT5cbiAgY2xlYXIgPSAoaWQpIC0+XG4gICAgZDMuc2VsZWN0KFwiIyN7IGlkIH0tZ3JhcGggc3ZnXCIpLnJlbW92ZSgpXG5cbiAgdGlja19mb3JtYXQgPSAodixtKSAtPlxuICAgIHQgPSB2KjEwMDAwXG5cbiAgICBpZiBtKjEwMDAwID4gNFxuICAgICAgcmV0dXJuIHQudG9GaXhlZCgwKVxuICAgIGVsc2VcbiAgICAgIHJldHVybiB0LnRvRml4ZWQoMSlcblxuICBjcmVhdGVfZnJhbWUgPSAoZGF0YSwgeV9yYW5nZSwgc2l6ZSkgLT5cbiAgICB4ID0gZDMudGltZS5zY2FsZSgpXG4gICAgICAuZG9tYWluIGQzLmV4dGVudChkYXRhLCAoZCkgLT4gZC5kYXRlKVxuICAgICAgLnJhbmdlIFswLCBzaXplLndpZHRoXVxuXG4gICAgeEF4aXMgPSBkMy5zdmcuYXhpcygpXG4gICAgICAuc2NhbGUgeFxuICAgICAgLm9yaWVudCAnYm90dG9tJ1xuICAgICAgLnRpY2tzIDRcblxuICAgIHkgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgICAgLmRvbWFpbiBbeV9yYW5nZS5taW4sIHlfcmFuZ2UubWF4XVxuICAgICAgLnJhbmdlICBbc2l6ZS5oZWlnaHQsIDBdXG5cbiAgICB5QXhpcyA9IGQzLnN2Zy5heGlzKClcbiAgICAgIC5zY2FsZSB5XG4gICAgICAub3JpZW50ICdsZWZ0J1xuICAgICAgLnRpY2tzIDRcblxuICAgIHJldHVybiBmcmFtZSA9XG4gICAgICB4OiB4XG4gICAgICB4QXhpczogeEF4aXNcbiAgICAgIHk6IHlcbiAgICAgIHlBeGlzOiB5QXhpc1xuXG4gIHNldF9heGlzID0gKGNvbnRhaW5lciwgeEF4aXMsIGR4LCB5QXhpcywgZHkpIC0+XG4gICAgY29udGFpbmVyLmFwcGVuZCAnZydcbiAgICAgIC5hdHRyXG4gICAgICAgIGNsYXNzOiAgICAgJ3ggYXhpcydcbiAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgwLCN7IGR5IH0pXCJcblxuICAgICAgLmNhbGwgeEF4aXNcblxuICAgIGNvbnRhaW5lci5hcHBlbmQgJ2cnXG4gICAgICAuYXR0clxuICAgICAgICBjbGFzczogICAgICd5IGF4aXMnXG4gICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoI3sgZHggfSwgMClcIlxuXG4gICAgICAuY2FsbCB5QXhpc1xuXG4gIGRyYXcgPSAoaWQpIC0+XG4gICAgc3ZnID0gZDMuc2VsZWN0KFwiIyN7IGlkIH0tZ3JhcGhcIikuYXBwZW5kICdzdmcnXG4gICAgICAuYXR0clxuICAgICAgICB2ZXJzaW9uOiAgICAgXCIxLjFcIlxuICAgICAgICBiYXNlUHJvZmlsZTogXCJmdWxsXCJcbiAgICAgICAgeG1sbnM6ICAgICAgIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICB3aWR0aDogICBkMy5zZWxlY3QoXCIjI3sgaWQgfS1ncmFwaFwiKS5ub2RlKCkuY2xpZW50V2lkdGhcbiAgICAgICAgaGVpZ2h0OiAgX2cuYmFzZV9ncmFwaC5oZWlnaHQoKVxuXG4gICAgY29udGFpbmVyID0gc3ZnLmFwcGVuZCAnZydcbiAgICAgIC5hdHRyXG4gICAgICAgIGlkOiBpZFxuICAgICAgICBjbGFzczogXCJncmFwaFwiXG4gICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoNDcsMClcIlxuXG4gICAgcmV0dXJuIGNvbnRhaW5lclxuXG4gIHJldHVybiBncmFwaCA9XG4gICAgY2xlYXI6ICAgIGNsZWFyXG4gICAgZHJhdzogICAgIGRyYXdcbiAgICBzZXRfYXhpczogc2V0X2F4aXNcblxuICAgIHRpY2tfZm9ybWF0OiB0aWNrX2Zvcm1hdFxuXG4gICAgY3JlYXRlX2ZyYW1lOiBjcmVhdGVfZnJhbWVcbiJdfQ==
