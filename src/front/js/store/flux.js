import toast from "react-hot-toast";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			token: localStorage.getItem("token") || null,
			message: null,
			causas: [
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
			papa: [
				{
					id: 1,
					name: "Papa Amarilla",
					price: "$3"
				},
				{
					id: 2,
					name: "Papa Blanca",
					price: "$2"
				},
				{
					id: 3,
					name: "Papa Huayro",
					price: "$3"
				},
			],
			proteina: [
				{
					id: 1,
					name: "Pollo",
					price: "$4"
				},
				{
					id: 2,
					name: "Atún",
					price: "$4"
				},
				{
					id: 3,
					name: "Pesca del día",
					price: "$6"
				},
				{
					id: 4,
					name: "Pulpo",
					price: "$8"
				},
				{
					id: 5,
					name: "Langostinos",
					price: "$6"
				},
				{
					id: 6,
					name: "Camarones",
					price: "$6"
				},
				{
					id: 7,
					name: "Calamar",
					price: "$6"
				},
				{
					id: 8,
					name: "Pulpa de Cangrejo",
					price: "$8"
				},
				{
					id: 9,
					name: "Salmón",
					price: "$9"
				}
			],
			verduras: [
				{
					id: 1,
					name: "Palta",
					price: "$2"
				},
				{
					id:2,
					name: "Palta Fuerte",
					price: "$2.5"
				},
				{
					id: 3,
					name: "Choclo",
					price: "$1"
				},
				{
					id:4,
					name: "Tomate Cherry",
					price: "$1"
				},
				{
					id:5,
					name:"Pepino",
					price: "$1"
				},
				{
					id:6,
					name:"Cebolla Roja",
					price: "$1"
				},
				{
					id:7,
					name:"Aceitunas negras",
					price: "$1"
				},
				{
					id: 8,
					name: "Mango",
					price: "$2"
				},
			],
			salsas:[
				{
					id:1,
					name: "Tártara",
					price: "$0.5"
				},
				{
					id:2,
					name: "Huancaína",
					price: "$1"
				},
				{
					id:3,
					name:"Olivo",
					price: "$1.5"
				},
				{
					id:4,
					name:"Acevichada",
					price: "$1.5"
				},
				{
					id:5,
					name:"Golf",
					price:"$1"
				},
				{
					id:6,
					name:"Mayonesa",
					price:"$0.5"
				}	
			],
			toppings: [
				{
					id: 1,
					name: "Huevos Sancochado",
					price: "$1"
				},
				{
					id: 2,
					name: "Rocoto",
					price: "$1"
				},
				{
					id:3,
					name:"Chifles",
					price:"$0.5"
				},
				{
					id:4,
					name:"Perejil",
					price: "$0.25"
				},
				{
					id:5,
					name:"Cebolla China",
					price:"$0.25"
				},
				{
					id:6,
					name:"Hilos de Camote",
					price: "$0.5"
				},
				{
					id:7,
					name:"Alcaparras",
					price:"$2"
				}
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

			getPapas: async () => {
                const response = await fetch(process.env.BACKEND_URL + "/api/papas");
                const data = await response.json();
                setStore({ papa: data });
            },
            getProteinas: async () => {
                const response = await fetch(process.env.BACKEND_URL + "/api/proteins");
                const data = await response.json();
                setStore({ proteina: data });
            },
            getVerduras: async () => {
                const response = await fetch(process.env.BACKEND_URL + "/api/vegetables");
                const data = await response.json();
                setStore({ verduras: data });
            },
            getSalsas: async () => {
                const response = await fetch(process.env.BACKEND_URL + "/api/sauces");
                const data = await response.json();
                setStore({ salsas: data });
            },
            getToppings: async () => {
                const response = await fetch(process.env.BACKEND_URL + "/api/toppings");
                const data = await response.json();
                setStore({ toppings: data });
            },

			loadInitialData: () => {
                const actions = getActions();
                actions.getPapas();
                actions.getProteinas();
                actions.getVerduras();
                actions.getSalsas();
                actions.getToppings();
            },

            newOrder: async (order) => {
                const store = getStore();
                if (!store.user) {
                    toast.error("You must be logged in to order");
                    return;
                }
                const resp = await fetch(process.env.BACKEND_URL + "/api/order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
					
                    body: JSON.stringify({
                        user_id: store.user.id,
                        status: "pendiente",
                        papa_id: order.papa,
                        proteins: order.proteina,
                        vegetables: order.verduras,
                        sauces: order.salsas,
                        toppings: order.toppings
                    })
                });
                resp.ok ? toast.success("Order sent!") : toast.error("Error sending order");
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
