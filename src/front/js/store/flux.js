import toast from "react-hot-toast";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			token: localStorage.getItem("token") || null,
			message: null,
			tacos: [
				{
					id: 1,
					name: "Causa de Limeña",
					description: "La clásica causa rellena de pollo o atún, acompañada de palta y mayonesa, con un toque de limón.",
					image_url: "https://i.pinimg.com/564x/f1/5e/d7/f15ed7fa97e0625c4088708cc5b31c95.jpg"
				},
				{
					id: 2,
					name: "Causa de Pulpa de Cangrejo",
					description: "Causa suave y cremosa, rellena con cangrejo fresco y un toque de ají.",
					image_url: "https://kasani.pe/wp-content/uploads/2021/09/CAUSA.jpg"
				},
				{
					id: 3,
					name: "Causa de Pulpo al Olivo",
					description: "Una combinación única de papa y pulpo, bañada en una suave crema de olivo.",
					image_url: "https://i.pinimg.com/564x/4a/30/5a/4a305a8567fd324f0c2511095d3f8cda.jpg"
				},
				// {
				// 	id: 4,
				// 	name: "Causa Acevichada",
				// 	description: "Inspirada en el ceviche, con pescado fresco y una mezcla de ají y limón.",
				// 	image_url: "https://i.pinimg.com/564x/df/8d/18/df8d18d67f7cabbabb498dc60b439c76.jpg"
				// },
				{
					id: 5,
					name: "Causa de Camarones",
					description: "Causa fresca con relleno de camarones, ideal para los amantes de los mariscos.",
					image_url: "https://cdn0.recetasgratis.net/es/posts/6/7/5/causa_de_langostinos_77576_orig.jpg"
				},
				// {
				// 	id: 6,
				// 	name: "Causa de Trucha Ahumada",
				// 	description: "Causa rellena de trucha ahumada, perfecta para los amantes de sabores intensos.",
				// 	image_url: "https://cdn0.recetasgratis.net/es/posts/6/7/5/causa_de_langostinos_77576_orig.jpg"
				// },


			],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			// newOrder: async (order) => {

			// 	const store = getStore();

			// 	if (!store.user) {
			// 		toast.error("You must be logged in to order");
			// 		return;
			// 	};

			// 	const resp = await fetch(process.env.BACKEND_URL + "/api/order", {
			// 		method: "POST",
			// 		headers: {
			// 			"Content-Type": "application/json"
			// 		},
			// 		body: JSON.stringify({
			// 			user_id: store.user.id,
			// 			status: "pendiente",
			// 			tortilla_id: order.tortilla,
			// 			proteins: order.proteins,
			// 			vegetables: order.veggie,
			// 			cheeses: order.cheese,
			// 			sauces: order.salsa
			// 		})
			// 	});

			// 	if (resp.ok) {
			// 		toast.success("Order sent!");
			// 	} else {
			// 		toast.error("Error sending order");
			// 	}

			// 	const data = await resp.json();
			// 	console.log(data);


			// },

			newOrder: async (order) => {

				const store = getStore();

				if (!store.user) {
					toast.error("You must be logged in to order");
					return;
				};

				const resp = await fetch(process.env.BACKEND_URL + "/api/order", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						user_id: store.user.id,
						status: "pendiente",
						papa_id: order.papa,
						proteins: order.proteins,
						vegetables: order.veggie,
						sauces: order.salsa,
						toppings: order.toppings
					})
				});

				if (resp.ok) {
					toast.success("Order sent!");
				} else {
					toast.error("Error sending order");
				}

				const data = await resp.json();
				console.log(data);
			},

			login: async (email, password) => {
				const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				});
				const data = await resp.json();

				localStorage.setItem("token", data.token);

				setStore({ token: data.token });
				setStore({ user: data.user });

				if (resp.ok) {
					toast.success("Logged in! 🎉");
				}
				else {
					toast.error("You shall not pass! 🧙‍♂️");
				}
			},

			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
				setStore({ user: null });
				toast.success("Logged out! 🎉");
			},

			getUserLogged: async () => {
				const resp = await fetch(process.env.BACKEND_URL + "/api/user", {
					headers: {
						Authorization: "Bearer " + getStore().token
					}
				});
				if (resp.ok) {
					toast.success("User logged in! 🎉");
				} else {
					localStorage.removeItem("token");
					setStore({ token: null });
				}
				const data = await resp.json();
				setStore({ user: data });
			},

			register: async (email, fullName, password) => {
				const resp = await fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						full_name: fullName,
						password: password,
						// profile_image_url: profileImageUrl //profileImageUrl
					})
				});
				const data = await resp.json();

				localStorage.setItem("token", data.token);

				setStore({ user: data.user });
				setStore({ token: data.token });

				if (resp.ok) {
					toast.success("User registered! 🎉");
				}
				else {
					toast.error("Error registering user 🛑");
				}
			}

		}
	};
};

export default getState;
