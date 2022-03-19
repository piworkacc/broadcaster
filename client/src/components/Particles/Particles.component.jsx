import Particles from "react-tsparticles";

const Particle = () => {
	const particlesInit = (main) => {
		console.log(main);

		// you can initialize the tsParticles instance (main) here, adding custom shapes or presets
	};

	const particlesLoaded = (container) => {
		console.log(container);
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
						fpsLimit: 120,
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
								resize: true,
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
									distance: 200,
									duration: 0.4,
								},
							},
						},
						particles: {
							color: {
								value: 'rgb(238, 69, 64)',
							},
							links: {
								color: "#ffffff",
								distance: 150,
								enable: true,
								opacity: 0.2,
								width: 1,
							},
							collisions: {
								enable: true,
							},
							move: {
								direction: "none",
								enable: true,
								outMode: "bounce",
								random: false,
								speed: 10,
								straight: false,
							},
							number: {
								density: {
									enable: true,
									area: 800,
								},
								value: 80,
							},
							opacity: {
								value: 0.5,
							},
							shape: {
								type: "circle",
							},
							size: {
								random: true,
								value: 5,
							},
						},
						detectRetina: true,
					}}
			/>
	);
};

export default Particle;
