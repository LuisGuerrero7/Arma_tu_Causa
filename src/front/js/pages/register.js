import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { toast } from "react-hot-toast";

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

const _firebaseApp = initializeApp(firebaseConfig);

const Register = () => {

    const { store, actions } = useContext(Context);
    const [image, setImage] = useState(null);
    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const registerUser = async (user) => {
        if (user.password !== user.passwordConfirm) {
            toast.error("Passwords do not match");
            return;
        }
        // const profileImageUrl = await uploadImage(user.image);
        await actions.register(user.email, user.fullName, user.password);   //profileImageUrl --->  await actions.register(user.email, user.fullName, user.password, profileImageUrl);
        navigate("/");
    }

    // const uploadImage = async (image) => {
    //     const storage = getStorage();
    //     const storageRef = ref(storage, `images/${image.name}`);

    //     const metadata = {
    //         contentType: image.type
    //     };

    //     try {

    //         const fileData = await uploadBytesResumable(storageRef, image, metadata);
    //         const downloadURL = await getDownloadURL(fileData.ref);

    //         console.log("File available at", downloadURL);

    //         setUser({
    //             ...user,
    //             profileImageUrl: downloadURL,
    //             image: null
    //         });

    //         return downloadURL;
    //     } catch (error) {
    //         toast.error("Error uploading image :(");
    //         return null;
    //     }
    // }

    useEffect(() => {
        if (store.token) {
            navigate("/");
        }
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 profile-info">
            <div className="card px-1 py-4 mx-auto" style={{ width: "60%", border: "2px solid #F9C74F", borderRadius: "0.25rem" }}>
                <div className="card-body">
                    <div className="mx-auto my-auto">

                        <h1 className="text-center primaryText">Register</h1>
                        <div className="mb-3">
                            <label className="form-label primaryText" style={{fontSize: "22px"}}>
                                <strong>Email address</strong>
                            </label>
                            <input type="email" className="form-control" onChange={(event) => setUser({
                                ...user,
                                email: event.target.value
                            })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label primaryText" style={{fontSize: "22px"}}>
                                <strong>Full Name</strong>
                            </label>
                            <input type="email" className="form-control" onChange={(event) => setUser({
                                ...user,
                                fullName: event.target.value
                            })} />
                        </div>
                        {/* <div className="mb-3 d-flex flex-column">
                            <label className="form-label primaryText" style={{fontSize: "22px"}}>
                                <strong>Profile Image</strong>
                            </label>
                            {
                                user.image && <img src={URL.createObjectURL(user.image)} width="100" height="100" className="img-fluid" />
                            }
                            {
                                user.profileImageUrl && <img src={user.profileImageUrl} width="100" height="100" className="img-fluid" />
                            }
                            <input type="file" accept="image/*" className="form-control" onChange={(event) => setUser({
                                ...user,
                                image: event.target.files[0]
                            })} />
                        </div> */}
                        <div className="mb-3">
                            <label className="form-label primaryText" style={{fontSize: "22px"}}>
                                <strong>Password</strong>
                            </label>
                            <div className="d-flex">
                                <input type={showPassword ? "text" : "password"} className="form-control" onChange={(event) => setUser({
                                    ...user,
                                    password: event.target.value
                                })} />
                                <button className="btn btn-exitoso"
                                    onClick={() => setShowPassword(!showPassword)}
                                >{showPassword ? "🔒" : "👀"}</button>
                            </div>
                            <label className="form-label primaryText" style={{fontSize: "22px"}}>
                                <strong>Confirm Password</strong>
                            </label>
                            <div className="d-flex">
                                <input type={showPassword ? "text" : "password"} className="form-control" onChange={(event) => setUser({
                                    ...user,
                                    passwordConfirm: event.target.value
                                })} />
                                <button className="btn btn-exitoso"
                                    onClick={() => setShowPassword(!showPassword)}
                                >{showPassword ? "🔒" : "👀"}</button>
                            </div>
                        </div>
                        <button onClick={() => registerUser(user)}
                            className="btn btn-causa w-100 mt-2">Register</button>
                        </div>

                    </div>
                </div>
            </div>
    );
};

export default Register;