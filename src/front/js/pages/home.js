import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const Hero = () => {
	return (
		<div className="container home-text my-5 border border-warning">
			<div className="p-5 text-center bg-body-tertiary rounded-3">
				<h1>¡Personaliza tu causa peruana con ingredientes frescos y auténticos!</h1>
				<h3 className="lead">
				Escoge la base de papa, una fuente marina o proteína de tu preferencia, y complementa con verduras, 
				frutas, salsas y toppings únicos para crear una causa hecha a tu medida. 
				Realiza tu pedido y disfruta de una explosión de sabores peruanos en cada bocado de tu propia causa.
				</h3>
			</div>
		</div>
	);
};

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="d-flex flex-column justify-content-center w-full">
			<Hero />
			<div className="container">
				<div className="d-flex flex-wrap">
					{store.tacos.map((product, index) => {
						return <ProductCard key={index} product={product} />;
					})}
				</div>
			</div>
		</div>
	);
};

const ProductCard = ({ product }) => {
	return (
		<div className="p-2 col-3 col-md-4 col-lg-3 col-sm-12 col-12"
			style={{
				minHeight: "400px",
			}}
		>
			<div className="card flex flex-column h-100 product-card"
			>
				<img src={product.image_url} style={{
					maxHeight: "200px",
					objectFit: "cover"
				}} className="card-img-top" alt="..." />
				<div className=""
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "end",
						alignItems: "start",
						padding: "1rem",
						height: "100%"

					}}
				>
					<h5 className="card-title">{product.name}</h5>
					<p className="fs-5">{product.description}</p>
					<a href="#" className="btn btn-exitoso mt-auto">
						Agregar al carrito
					</a>
				</div>
			</div>
		</div>
	);
};

