var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define(['d3'], function(d3) {
  var csv_query, data, filter_ignored, ignored_asset, parse_date, pluck, reformat;
  parse_date = d3.time.format("%Y").parse;
  filter_ignored = function(array) {
    var a, rep;
    rep = array[0];
    if (rep.scn != null) {
      a = array.filter(function(e) {
        var ref;
        return !(ref = e.scn, indexOf.call(_g.ignored_scenarios, ref) >= 0);
      });
    } else if (rep.cnt != null) {
      a = array.filter(function(e) {
        var ref;
        return !(ref = e.cnt, indexOf.call(_g.ignored_countries, ref) >= 0);
      });
    } else if (rep.ind != null) {
      a = array.filter(function(e) {
        var ref;
        return !(ref = e.ind, indexOf.call(_g.ignored_indicators, ref) >= 0);
      });
    }
    return a;
  };
  csv_query = function(source, country, scenario, indicator) {
    var source0, source1;
    source0 = source1 = null;
    source.forEach(function(d) {
      if (d['cnt'] === country && d['ind'] === indicator && d['scn'] === scenario) {
        source0 = reformat(d);
      }
      if (d['cnt'] === country && d['ind'] === indicator && d['scn'] === 'base') {
        return source1 = reformat(d);
      }
    });
    return [source0, source1];
  };
  reformat = function(d) {
    var j, len, o, p, ref, t;
    o = [];
    ref = _g.year_range;
    for (j = 0, len = ref.length; j < len; j++) {
      t = ref[j];
      p = parseFloat(d[t]);
      o.push({
        indicator: d['ind'],
        scenario: d['scn'],
        country: d['cnt'],
        date: parse_date(t.toString()),
        value: p
      });
    }
    return o;
  };
  pluck = function(query, param) {
    return query.map(function(q) {
      var b, o, result, v;
      result = {};
      o = {};
      if (param !== 'year') {
        o = {
          obj: q[0].find(function(i) {
            return i['date'].getFullYear() === _g.current_year;
          }),
          base: q[1].find(function(i) {
            return i['date'].getFullYear() === _g.current_year;
          })
        };
      } else {
        o = {
          obj: query[0].find(function(i) {
            return i['date'].getFullYear() === _g.current_year;
          }),
          base: query[1].find(function(i) {
            return i['date'].getFullYear() === _g.current_year;
          })
        };
      }
      b = o['base']['value'];
      v = o['obj']['value'];
      result['value'] = (v - b) / (b * 100);
      result[param] = o['obj'][param];
      return result;
    });
  };
  ignored_asset = function(x) {
    var e;
    e = typeof x === 'string' ? x : x.indicator || x.scenario || x.country;
    return (indexOf.call(_g.ignored_indicators, e) >= 0) || (indexOf.call(_g.ignored_scenarios, e) >= 0) || (indexOf.call(_g.ignored_countries, e) >= 0);
  };
  return data = {
    csv_query: csv_query,
    filter_ignored: filter_ignored,
    pluck: pluck,
    ignored_asset: ignored_asset
  };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxDQUFDLENBQUM7QUFFL0UsV0FBUSxDQUFDLGFBQUssRUFBRSxDQUFDLGtCQUFSLEVBQUEsQ0FBQSxNQUFELENBQUEsSUFBZ0MsQ0FBQyxhQUFLLEVBQUUsQ0FBQyxpQkFBUixFQUFBLENBQUEsTUFBRCxDQUFoQyxJQUErRCxDQUFDLGFBQUssRUFBRSxDQUFDLGlCQUFSLEVBQUEsQ0FBQSxNQUFEO0VBSHpEO0FBS2hCLFNBQU8sSUFBQSxHQUNMO0lBQUEsU0FBQSxFQUFnQixTQUFoQjtJQUNBLGNBQUEsRUFBZ0IsY0FEaEI7SUFFQSxLQUFBLEVBQWdCLEtBRmhCO0lBR0EsYUFBQSxFQUFnQixhQUhoQjs7QUFuRlcsQ0FBZiIsImZpbGUiOiJkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lIFsnZDMnXSwgKGQzKSAtPlxuICBwYXJzZV9kYXRlID0gZDMudGltZS5mb3JtYXQoXCIlWVwiKS5wYXJzZVxuXG4gIGZpbHRlcl9pZ25vcmVkID0gKGFycmF5KSAtPlxuICAgIHJlcCA9IGFycmF5WzBdXG5cbiAgICBpZiByZXAuc2NuP1xuICAgICAgYSA9IGFycmF5LmZpbHRlciAoZSkgLT5cbiAgICAgICAgbm90IChlLnNjbiBpbiBfZy5pZ25vcmVkX3NjZW5hcmlvcylcblxuICAgIGVsc2UgaWYgcmVwLmNudD9cbiAgICAgIGEgPSBhcnJheS5maWx0ZXIgKGUpIC0+XG4gICAgICAgIG5vdCAoZS5jbnQgaW4gX2cuaWdub3JlZF9jb3VudHJpZXMpXG5cbiAgICBlbHNlIGlmIHJlcC5pbmQ/XG4gICAgICBhID0gYXJyYXkuZmlsdGVyIChlKSAtPlxuICAgICAgICBub3QgKGUuaW5kIGluIF9nLmlnbm9yZWRfaW5kaWNhdG9ycylcblxuICAgIHJldHVybiBhXG5cbiAgY3N2X3F1ZXJ5ID0gKHNvdXJjZSwgY291bnRyeSwgc2NlbmFyaW8sIGluZGljYXRvcikgLT5cbiAgICBzb3VyY2UwID0gc291cmNlMSA9IG51bGxcblxuICAgIHNvdXJjZS5mb3JFYWNoIChkKSAtPlxuICAgICAgaWYgKGRbJ2NudCddICBpcyBjb3VudHJ5ICBhbmRcbiAgICAgICAgICBkWydpbmQnXSAgaXMgaW5kaWNhdG9yIGFuZFxuICAgICAgICAgIGRbJ3NjbiddICBpcyBzY2VuYXJpbylcblxuICAgICAgICBzb3VyY2UwID0gcmVmb3JtYXQgZFxuXG5cbiAgICAgIGlmIChkWydjbnQnXSAgaXMgY291bnRyeSAgYW5kXG4gICAgICAgICAgZFsnaW5kJ10gIGlzIGluZGljYXRvciBhbmRcbiAgICAgICAgICBkWydzY24nXSAgaXMgJ2Jhc2UnKVxuXG4gICAgICAgIHNvdXJjZTEgPSByZWZvcm1hdCBkXG5cbiAgICByZXR1cm4gW3NvdXJjZTAsIHNvdXJjZTFdXG5cbiAgcmVmb3JtYXQgPSAoZCkgLT5cbiAgICBvID0gW11cblxuICAgIGZvciB0IGluIF9nLnllYXJfcmFuZ2VcbiAgICAgIHAgPSBwYXJzZUZsb2F0IGRbdF1cblxuICAgICAgby5wdXNoXG4gICAgICAgIGluZGljYXRvcjogZFsnaW5kJ11cbiAgICAgICAgc2NlbmFyaW86ICBkWydzY24nXVxuICAgICAgICBjb3VudHJ5OiAgIGRbJ2NudCddXG4gICAgICAgIGRhdGU6ICAgICAgcGFyc2VfZGF0ZSB0LnRvU3RyaW5nKClcbiAgICAgICAgdmFsdWU6ICAgICBwXG5cbiAgICByZXR1cm4gb1xuXG4gIHBsdWNrID0gKHF1ZXJ5LCBwYXJhbSkgLT5cbiAgICBxdWVyeS5tYXAgKHEpIC0+XG4gICAgICByZXN1bHQgPSB7fVxuICAgICAgbyA9IHt9XG5cbiAgICAgIGlmIHBhcmFtIGlzbnQgJ3llYXInXG4gICAgICAgIG8gPVxuICAgICAgICAgIG9iajogIHFbMF0uZmluZCAoaSkgLT4gaVsnZGF0ZSddLmdldEZ1bGxZZWFyKCkgaXMgX2cuY3VycmVudF95ZWFyXG4gICAgICAgICAgYmFzZTogcVsxXS5maW5kIChpKSAtPiBpWydkYXRlJ10uZ2V0RnVsbFllYXIoKSBpcyBfZy5jdXJyZW50X3llYXJcblxuICAgICAgZWxzZVxuICAgICAgICBvID1cbiAgICAgICAgICBvYmo6ICBxdWVyeVswXS5maW5kIChpKSAtPiBpWydkYXRlJ10uZ2V0RnVsbFllYXIoKSBpcyBfZy5jdXJyZW50X3llYXJcbiAgICAgICAgICBiYXNlOiBxdWVyeVsxXS5maW5kIChpKSAtPiBpWydkYXRlJ10uZ2V0RnVsbFllYXIoKSBpcyBfZy5jdXJyZW50X3llYXJcblxuICAgICAgYiA9IG9bJ2Jhc2UnXVsndmFsdWUnXVxuICAgICAgdiA9IG9bJ29iaiddWyd2YWx1ZSddXG5cbiAgICAgIHJlc3VsdFsndmFsdWUnXSA9ICh2LWIpIC8gKGIgKiAxMDApXG4gICAgICByZXN1bHRbcGFyYW1dID0gb1snb2JqJ11bcGFyYW1dXG5cbiAgICAgIHJldHVybiByZXN1bHRcblxuICBpZ25vcmVkX2Fzc2V0ID0gKHgpIC0+XG4gICAgZSA9IGlmICh0eXBlb2YgeCBpcyAnc3RyaW5nJykgdGhlbiB4IGVsc2UgKCh4LmluZGljYXRvcikgb3IgKHguc2NlbmFyaW8pIG9yICh4LmNvdW50cnkpKVxuXG4gICAgcmV0dXJuICgoZSBpbiBfZy5pZ25vcmVkX2luZGljYXRvcnMpIG9yIChlIGluIF9nLmlnbm9yZWRfc2NlbmFyaW9zKSBvciAoZSBpbiBfZy5pZ25vcmVkX2NvdW50cmllcykpXG5cbiAgcmV0dXJuIGRhdGEgPVxuICAgIGNzdl9xdWVyeTogICAgICBjc3ZfcXVlcnlcbiAgICBmaWx0ZXJfaWdub3JlZDogZmlsdGVyX2lnbm9yZWRcbiAgICBwbHVjazogICAgICAgICAgcGx1Y2tcbiAgICBpZ25vcmVkX2Fzc2V0OiAgaWdub3JlZF9hc3NldFxuIl19
