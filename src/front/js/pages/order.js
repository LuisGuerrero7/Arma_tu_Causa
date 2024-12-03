import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import toast from "react-hot-toast";

export const Order = () => {
    const { store, actions } = useContext(Context);
    const [order, setOrder] = useState({
        papa: null,
        proteina: [],
        verduras: [],
        salsas: [],
        toppings: [],
    });
    const [dropdownStatus, setDropdownStatus] = useState({
        papa: true,
        proteina: false,
        verduras: false,
        salsas: false,
        toppings: false,
    });

    useEffect(() => {
        actions.loadInitialData();
    }, []);

    const handleSelect = (category, item) => {
        if (category === "papa") {
            setOrder({ ...order, papa: item.id });
            setDropdownStatus({ ...dropdownStatus, proteina: true });
        } else if (category === "proteina") {
            setOrder({
                ...order,
                proteina: order.proteina.includes(item) ? order.proteina : [...order.proteina, item.id],
            });
            setDropdownStatus({ ...dropdownStatus, verduras: true });
        } else if (category === "verduras") {
            setOrder({
                ...order,
                verduras: order.verduras.includes(item) ? order.verduras : [...order.verduras, item.id],
            });
            setDropdownStatus({ ...dropdownStatus, salsas: true });
        } else if (category === "salsas") {
            setOrder({
                ...order,
                salsas: order.salsas.includes(item) ? order.salsas : [...order.salsas, item.id],
            });
            setDropdownStatus({ ...dropdownStatus, toppings: true });
        } else if (category === "toppings") {
            setOrder({
                ...order,
                toppings: order.toppings.includes(item) ? order.toppings : [...order.toppings, item.id],
            });
        };

        console.log(order)
    };

    const handlePlaceOrder = () => {
        actions.newOrder(order);
        toast.success("Order completed!");
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Build Your Causa</h2>

            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select Papa
            </button>
            <ul className="dropdown-menu">
                {store.papa.map((item) => (
                            <button
                                key= {"papas-" + item.id}
                                className="dropdown-item"
                                onClick={() => handleSelect("papa", item)}
                            >
                                {item.name} - {item.price}
                            </button>
                ))}
            </ul>
            </div>



            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select Proteina
            </button>
            <ul className="dropdown-menu">
            {store.proteina.map((item) => (
                        <button
                            key={"proteina"+item.id}
                            className="dropdown-item"
                            onClick={() => handleSelect("proteina", item)}
                        >
                            {item.name} - {item.price}
                        </button>
                    ))}
            </ul>
            </div>


            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select Verduras
            </button>
            <ul className="dropdown-menu">
                    {store.verduras.map((item) => (
                        <button
                            key={"verduras"+item.id}
                            className="dropdown-item"
                            onClick={() => handleSelect("verduras", item)}
                        >
                            {item.name} - {item.price}
                        </button>
                    ))}
            </ul>
            </div>


            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select Salsas
            </button>
            <ul className="dropdown-menu">
                    {store.salsas.map((item) => (
                        <button
                            key={"salsas"+item.id}
                            className="dropdown-item"
                            onClick={() => handleSelect("salsas", item)}
                        >
                            {item.name} - {item.price}
                        </button>
                    ))}
            </ul>
            </div>


            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select Toppings
            </button>
            <ul className="dropdown-menu">
                    {store.toppings.map((item) => (
                        <button
                            key={"toppings"+item.id}
                            className="dropdown-item"
                            onClick={() => handleSelect("toppings", item)}
                        >
                            {item.name} - {item.price}
                        </button>
                    ))}
            </ul>
            </div>


            <button className="btn btn-success mt-4" onClick={handlePlaceOrder}>
                Complete Order
            </button>
        </div>
    );
};

export default Order;
