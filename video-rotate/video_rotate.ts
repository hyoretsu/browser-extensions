// Get all videos
const videos = document.querySelectorAll("video");

// Get the biggest (main) video
let video = videos[0];
for (let i = 1; i < videos.length - 1; i++) {
	const size = videos[i].clientHeight * videos[i].clientWidth;
	const biggestSize = video.clientHeight * video.clientWidth;

	if (size > biggestSize) {
		video = videos[i];
	}
}

// Rotate and apply styles for the best size at the new orientation
const { clientHeight: height, clientWidth: width } = video;

const newStyles: [keyof CSSStyleDeclaration, string | number][] = [
	["aspectRatio", `${width} / ${height}`],
	["margin", "auto"],
	["objectFit", "scale-down"],
	["position", "relative"],
	["rotate", "90deg"],
	["width", `${height}px`],
];
const originalStyles = newStyles.map(([key]) => [key, video.style[key]]);

Object.assign(video.style, Object.fromEntries(newStyles));
Object.assign(video.style, Object.fromEntries(originalStyles));
