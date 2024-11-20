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
            setOrder({ ...order, papa: item });
            setDropdownStatus({ ...dropdownStatus, proteina: true });
        } else if (category === "proteina") {
            setOrder({
                ...order,
                proteina: order.proteina.includes(item) ? order.proteina : [...order.proteina, item],
            });
            setDropdownStatus({ ...dropdownStatus, verduras: true });
        } else if (category === "verduras") {
            setOrder({
                ...order,
                verduras: order.verduras.includes(item) ? order.verduras : [...order.verduras, item],
            });
            setDropdownStatus({ ...dropdownStatus, salsas: true });
        } else if (category === "salsas") {
            setOrder({
                ...order,
                salsas: order.salsas.includes(item) ? order.salsas : [...order.salsas, item],
            });
            setDropdownStatus({ ...dropdownStatus, toppings: true });
        } else if (category === "toppings") {
            setOrder({
                ...order,
                toppings: order.toppings.includes(item) ? order.toppings : [...order.toppings, item],
            });
        }
    };

    const handlePlaceOrder = () => {
        actions.newOrder(order);
        toast.success("Order completed!");
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Build Your Causa</h2>

            <div className="dropdown mb-3">
                <button className="btn btn-dark dropdown-toggle" disabled={!dropdownStatus.papa}>
                    Select Papa
                </button>
                <div className="dropdown-menu">
                    {store.papa.map((item) => (
                        <button
                            key={item.id}
                            className="dropdown-item"
                            onClick={() => handleSelect("papa", item)}
                        >
                            {item.name} - {item.price}
                        </button>
                    ))}
                </div>
            </div>

            <div className="dropdown mb-3">
                <button className="btn btn-dark dropdown-toggle" disabled={!dropdownStatus.proteina}>
                    Select Proteina
                </button>
                <div className="dropdown-menu">
                    {store.proteina.map((item) => (
                        <button
                            key={item.id}
                            className="dropdown-item"
                            onClick={() => handleSelect("proteina", item)}
                        >
                            {item.name} - {item.price}
                        </button>
                    ))}
                </div>
            </div>

            <div className="dropdown mb-3">
                <button className="btn btn-dark dropdown-toggle" disabled={!dropdownStatus.verduras}>
                    Select Verduras
                </button>
                <div className="dropdown-menu">
                    {store.verduras.map((item) => (
                        <button
                            key={item.id}
                            className="dropdown-item"
                            onClick={() => handleSelect("verduras", item)}
                        >
                            {item.name} - {item.price}
                        </button>
                    ))}
                </div>
            </div>

            <div className="dropdown mb-3">
                <button className="btn btn-dark dropdown-toggle" disabled={!dropdownStatus.salsas}>
                    Select Salsas
                </button>
                <div className="dropdown-menu">
                    {store.salsas.map((item) => (
                        <button
                            key={item.id}
                            className="dropdown-item"
                            onClick={() => handleSelect("salsas", item)}
                        >
                            {item.name} - {item.price}
                        </button>
                    ))}
                </div>
            </div>

            <div className="dropdown mb-3">
                <button className="btn btn-dark dropdown-toggle" disabled={!dropdownStatus.toppings}>
                    Select Toppings
                </button>
                <div className="dropdown-menu">
                    {store.toppings.map((item) => (
                        <button
                            key={item.id}
                            className="dropdown-item"
                            onClick={() => handleSelect("toppings", item)}
                        >
                            {item.name} - {item.price}
                        </button>
                    ))}
                </div>
            </div>

            <button className="btn btn-success mt-4" onClick={handlePlaceOrder}>
                Complete Order
            </button>
        </div>
    );
};

export default Order;
