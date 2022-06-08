import { Point } from './Basics';

export class Vector implements Point {
	x: number;
	y: number;
	constructor(self?: Point | number[]) {
		if (!self)
			self = { x: 0, y: 0 };
		if (self instanceof Array)
			self = { x: self[0], y: self[1] };
		({ x: this.x, y: this.y } = self);
	}
	Distance(other: Point) {
		return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
	}
	Length() {
		return this.Distance(new Vector());
	}
	Add(other: Vector) {
		return new Vector({ x: this.x + other.x, y: this.y + other.y });
	}
	Sub(other: Vector) {
		return new Vector({ x: this.x - other.x, y: this.y - other.y });
	}
	Mul(k: number) {
		return new Vector({ x: this.x * k, y: this.y * k });
	}
	Div(k: number) {
		return new Vector({ x: this.x / k, y: this.y / k });
	}

	Array(): number[] {
		return [this.x, this.y];
	}
	Normalized() {
		return this.Div(this.Length());
	}
	Dot(other: Vector) {
		return this.x * other.x + this.y * other.y;
	}
	Angle(): number {
		return Math.atan2(this.y, this.x);
	}
	static Angle(a: Vector, b: Vector): number {
		let ang = a.Angle() - b.Angle();
		while (ang < -Math.PI)
			ang += Math.PI * 2;
		while (ang > Math.PI)
			ang -= Math.PI * 2;
		return ang;
	}
	/** @param ang Angle in degrees */
	Rotate(ang: number, center = new Vector()) {
		ang = ang * Math.PI / 180;
		let r = this.Distance(center);
		let ang0 = this.Sub(center).Angle();

		return new Vector({
			x: Math.cos(ang0 + ang),
			y: Math.sin(ang0 + ang)
		}).Mul(r).Add(center);
	}

	static Median(points: Vector[]): Vector {
		points = [...points];
		// removing duplicates first
		{
			let i = 0;
			while (true) {
				if (i >= points.length)
					break;
				let dups: number[] = [];
				for (let [k, v] of Object.entries(points))
					if (points[i].x == v.x && points[i].y == v.y && i != Number(k))
						dups.push(Number(k));
				for (let dup of dups.reverse())
					points.splice(dup);
				i++;
			}
		}
		let x = points.reduce((p, v) => p + v.x, 0) / points.length;
		let y = points.reduce((p, v) => p + v.y, 0) / points.length;
		return new Vector({ x, y });
	}
}