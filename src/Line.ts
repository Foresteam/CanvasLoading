import { Renderable, Segment, Point } from "./Basics";
import { Vector } from "./Vector";

export class Line implements Renderable {
	points: Vector[];
	color: string;
	fill: string;
	constructor(points: Point[], color = '#FFF', fill: string = null) {
		this.points = points.map(p => new Vector(p));
		this.color = color;
		this.fill = fill;
	}
	Render(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		for (let [k, v] of Object.entries(this.points))
			(Number(k) == 0 ? ctx.moveTo : ctx.lineTo).call(ctx, v.x, v.y);
		ctx.strokeStyle = this.color;
		ctx.stroke();
		if (this.fill)
			ctx.fill();
		ctx.closePath();
	}
	/** @param ang Angle in degrees */
	Rotate(ang: number) {
		let center = Vector.Median(this.points);
		this.points = this.points.map(p => p.Rotate(ang, center));
	}
	GetSegments(): Segment[] {
		return this.points.map((v, i) => i > 0 && [this.points[i - 1], v] as Segment).filter(v => !!v);
	}
}