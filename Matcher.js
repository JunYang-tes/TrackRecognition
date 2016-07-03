function Matcher() {
	this.gestures = [];
	this.threshold = 0.5;
}
Matcher.prototype.addGesture = function(gesture) {
	this.gestures.push(gesture);
};
Matcher.prototype.match = function(gesture) {
	var point = 0;
	var tmp;
	var idx = 0;
	for (var i = 0; i < this.gestures.length; i++) {
		tmp = this.calc_(this.gestures[i].vector, gesture.vector)
		console.log(tmp);
		if (tmp > point) {
			point = tmp;
			idx = i;
		}
	}
	return point > this.threshold ? this.gestures[idx] : undefined;
};
Matcher.prototype.calc_ = function(vector1, vector2) {
	var dl=Math.abs(vector1.length-vector2.length);
	if(dl>vector1.length || dl>vector2.length){
		return 0;
	}
	var cross = 0.0;
	var a = b = 0;
	for (var i = 0; i < vector1.length && i < vector2.length; i++) {
		cross += (vector1[i] * vector2[i]);
		a += (vector1[i] * vector1[i]);
		b += (vector2[i] * vector2[i]);
	}
	return  (a==0 || b==0) ? 0: Math.abs(cross / Math.sqrt(a * b));
};