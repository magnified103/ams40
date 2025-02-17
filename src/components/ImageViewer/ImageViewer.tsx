import { useState, useRef, useEffect } from 'react';
import OpenSeadragon from 'openseadragon';
import ams1 from "../../assets/ams1.jpg";
import ams2 from "../../assets/ams2.jpg";

const OpenSeaViewerApp = () => {
	const viewerRef = useRef(null);
	const viewerInstance = useRef<OpenSeadragon.Viewer | null>(null);
	
	// Array of image URLs
	const images = [
		ams1,
		ams2
	];
	
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	
	// Initialize OpenSeadragon only once when the component mounts
	useEffect(() => {
		viewerInstance.current = OpenSeadragon({
		element: viewerRef.current as unknown as HTMLElement,
		prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
		crossOriginPolicy: 'Anonymous',
		tileSources: {
			type: 'image',
			url: images[currentImageIndex]
		},
		showNavigator: true,
		gestureSettingsMouse: {
			scrollToZoom: true,
			clickToZoom: false,
			dblClickToZoom: true,
			pinchToZoom: true
		},
		zoomPerScroll: 2, // You can adjust this value,
		maxZoomPixelRatio: 2
		});
		
		// Cleanup on unmount
		return () => {
		if (viewerInstance.current) {
			viewerInstance.current.destroy();
		}
		};
	}, []); // Empty dependency array ensures this runs only on mount
	
	// Update the image when the current image index changes
	useEffect(() => {
		if (viewerInstance.current) {
		viewerInstance.current.open({
			type: 'image',
			url: images[currentImageIndex]
		});
		}
	}, [currentImageIndex, images]);
	
	return (
		<div>
			<div style={{ marginBottom: '10px' }}>
				<button onClick={() => setCurrentImageIndex(0)}>Ảnh 1</button>
				<button onClick={() => setCurrentImageIndex(1)}>Ảnh 2</button>
			</div>
			
			{/* Fixed viewport container */}
			<div
				ref={viewerRef}
				style={{
				width: '120vh',      // Set your desired viewport width
				height: '90vh',     // Set your desired viewport height
				border: '1px solid #ccc',
				overflow: 'hidden',  // Clipping any content outside the viewport
				position: 'relative'
				}}
			/>
		</div>
	);
};

export default OpenSeaViewerApp;
