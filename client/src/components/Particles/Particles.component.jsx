import Particles from "react-tsparticles";

const Particle = () => {
	const particlesInit = (main) => {
		// you can initialize the tsParticles instance (main) here, adding custom shapes or presets
	};

	const particlesLoaded = (container) => {
	};
	return (
			<Particles
					id="tsparticles"
					init={particlesInit}
					loaded={particlesLoaded}
					options={{
						background: {
							color: {
								value: "#131313",
							},
						},
						fpsLimit: 30,
						interactivity: {
							events: {
								onClick: {
									enable: true,
									mode: "push",
								},
								onHover: {
									enable: true,
									mode: "repulse",
								},
								resize: false,
							},
							modes: {
								bubble: {
									distance: 400,
									duration: 2,
									opacity: 0.8,
									size: 40,
								},
								push: {
									quantity: 4,
								},
								repulse: {
									distance: 100,
									duration: 0.4,
								},
							},
						},
						particles: {
							color: {
								value: 'rgb(238, 69, 64)',
							},
							links: {
								color: "#fff",
								distance: 100,
								enable: true,
								opacity: 0.4,
								width: 1,
							},
							collisions: {
								enable: false,
							},
							move: {
								direction: "none",
								enable: true,
								outMode: "bounce",
								random: true,
								speed: 2,
								straight: false,
							},
							number: {
								density: {
									enable: true,
									area: 800,
								},
								value: 100,
							},
							opacity: {
								value: 0.5,
							},
							shape: {
								type: "triangle",
							},
							size: {
								random: true,
								value: 6,
							},
						},
						detectRetina: false,
					}}
			/>
	);
};

export default Particle;
