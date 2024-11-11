import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {

    const { store, actions } = useContext(Context);

    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (store.token) {
            navigate("/");
        }
    }, []);
    return (
        <div>
            <div className="d-flex align-items-center justify-content-center vh-100 profile-info" style={{marginTop: "-100px"}}>
                <div className="card px-1 py-4 mx-auto" style={{ width: "60%", border: "2px solid #F9C74F", borderRadius: "0.25rem" }}>
                    <div className="card-body">
                        <div className="mx-auto my-auto">
                            <h1 className="text-center" style={{color: "#43AA8B"}}>Log In</h1> 
                            <div className="mb-3">
                                <label className="form-label primaryText" style={{fontSize: "22px"}}>
                                    <strong>Email</strong>
                                </label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    onChange={(event) => setUser({ ...user, email: event.target.value })}
                                />
                                <div className="form-text">Nunca compartiremos tus datos personales.</div>
                            </div> 
                            <div className="mb-3">
                                <label className="form-label primaryText" style={{ fontSize: "22px"}}>
                                    <strong>Contraseña</strong>
                                </label>
                                <div className="d-flex">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        className="form-control" 
                                        onChange={(event) => setUser({ ...user, contraseña: event.target.value })}
                                    />
                                    <button 
                                        className="btn btn-exitoso m-1 btnLock"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "🔒" : "👀"}
                                    </button>
                                </div>
                                <button className="btn btn-linkk"> ¿Te olvidaste tu contraseña?</button>
                            </div>
                            <button 
                                onClick={() => actions.login(user.email, user.contraseña)} 
                                className="btn btn-causa w-100 mt-2"
                                style={{ width: "60%" }}
                            >
                                Log In
                            </button>
                            <Link to="/Register" className="btn btn-linkk">¿No tienes una cuenta? ¡Registrate!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Login;