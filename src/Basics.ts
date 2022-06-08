import { Vector } from './Vector';

export interface Point {
	x: number;
	y: number;
};
export interface Renderable {
	Render: (ctx: CanvasRenderingContext2D) => void;
}
export interface Segment {
	0: Vector;
	1: Vector;
}