import { Vector } from './Vector';
import { Line } from './Line';

/** @returns A point on the segment */
const pointOnSegment = (to: Vector, begin: Vector, end: Vector): Vector => {
	let m = Vector.Median([begin, end]);
	let a = [begin.Sub(to), end.Sub(to)];
	let b = end.Sub(begin);
	let ang = Math.min(...a.map(_a => Vector.Angle(_a, b)));
	
	// the function here defines the lines' behavior
	return m.Add(b.Div(2).Mul(Math.tan(ang)));
};
const pointOnLine = (to: Vector, line: Line): Vector => {
	let points: { point: Vector, distance: number }[] = line.GetSegments().map(seg => pointOnSegment(to, seg[0], seg[1])).map(point => ({
		point,
		distance: to.Distance(point)
	}));
	return points.sort((a, b) => a.distance - b.distance)[0].point;
}

document.addEventListener('DOMContentLoaded', () => {
	const canv = document.querySelector('canvas');
	const w = canv.width, h = canv.height;
	const ctx = canv.getContext('2d');
	ctx.fillStyle = '#FF0';
	ctx.clearRect(0, 0, 300, 300);
	ctx.fillStyle = '#000';
	ctx.lineWidth = 2;
	
	let target = new Line([
		[-.5, -.5],
		[.5, -.5],
		[.5, .5],
		[-.5, .5],
		[-.5, -.5]
	].map(p => new Vector(p).Mul((w + h) / 2 / 2).Add(new Vector([w / 2, h / 2]))), 'white');
	let lines: Line[] = [];
	for (let i = 0; i < 360; i += 4)
		lines.push(new Line([
			new Vector([w / 2, h / 2]).Add(new Vector([
				Math.cos(i / 180 * Math.PI) * w / 2.2,
				Math.sin(i / 180 * Math.PI) * h / 2.2
			])),
			null
		], '#005675'));

	const animation = (timestamp: number) => {
		target.Rotate(1);
		lines.forEach(line => line.points[1] = pointOnLine(line.points[0], target));

		ctx.clearRect(0, 0, canv.width, canv.height);
		lines.forEach(line => line.Render(ctx));
		target.Render(ctx);
		window.requestAnimationFrame(animation)
	};
	window.requestAnimationFrame(animation);
});