import React, { useState } from "react";
import signupimage from "../images/signupicon.png";
import { ToastContainer } from "react-toastify";
import { notification } from "../utils/notification";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { userregisteration } from "../apirequests/signup";

function SignupScreen() {
  const [toggleSignupScreen, setToggleSignupScreen] = useState(false);
  const [image, setImage] = useState(null);
  const [tempImage, setTempImage] = useState(
    "https://c0.wallpaperflare.com/preview/325/981/320/avatar-people-person-business.jpg"
  );
  const [shownPassword, setShownPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  const checkboxHandler = (event) => {
    if (event.target.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };
  const submitHandler = async () => {
    let profilePic = !image ? tempImage : image;
    let username = !details.name ? "user" : details.name;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isValidEmail = emailPattern.test(details.email);

    const formData = new FormData();
    formData.append("email", details.email);
    formData.append("password", details.password);
    formData.append("name", username);
    formData.append("profilePic", profilePic);

    if (!details.email || !isValidEmail) {
      notification("error", "please enter valid email");
    } else if (!details.password) {
      notification("error", "please enter valid password");
    } else if (isChecked) {
      try {
        const response = await userregisteration(
          "http://localhost:8080/api/userdetails",
          formData
        );
        console.log(response);
        if (response && response.status === 200) {
          notification(
            "success",
            `Welcome ${details.email} at BrainOp Technologies Private Limited`
          );
          setTimeout(() => {
            navigate("/postlist");
          }, 1000);
        }
      } catch (error) {
        notification("error", "User already register ");
      }
    } else {
      notification("error", "Please check checkbox");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="lg:w-[550px] lg:h-[600px] md:h-[500px] sm:h-[600px] md:w-[450px] sm:w-[250px] ">
        {!toggleSignupScreen ? (
          <div className="lg:w-[550px] lg:h-[600px]  md:h-[500px] sm:h-[600px] md:w-[450px] sm:w-[250px] ">
            <div
              className="lg:w-[550px] lg:h-[600px] md:h-[500px] sm:h-[600px] md:w-[450px] sm:w-[250px]"
              style={{
                backgroundImage:
                  "url(https://t3.ftcdn.net/jpg/06/88/73/32/360_F_688733206_JuG6zVOsVmZcjtUgDA0IhJNkgOMpOdms.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "20px",
              }}
            >
              <img
                src={signupimage}
                alt="brandImage"
                className=" lg:w-[300px] md:w-[200px] sm:w-[100px] "
              />
              <h1
                className=" text-white font-bold tracking-wide lg:text-2xl md:text-lg sm:text-sm mb-8 cursor-pointer"
                onClick={() => {
                  setToggleSignupScreen(true);
                }}
              >
                WELCOME TO HERE !
              </h1>
            </div>
          </div>
        ) : (
          <div className="lg:w-[550px] lg:h-[600px]  md:h-[500px] sm:h-[600px] md:w-[450px] sm:w-[250px] ">
            <div
              className="lg:w-[550px] lg:h-[600px] md:h-[500px] sm:h-[600px] md:w-[450px] sm:w-[250px]"
              style={{
                backgroundImage:
                  "url(https://st.depositphotos.com/1324256/4058/i/450/depositphotos_40587839-stock-photo-mountain-sunrise.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "20px",
              }}
            >
              <div className="mt-8 rounded-full  w-28 h-28 flex items-center justify-center shadow-custom">
                <img
                  src={!image ? `${tempImage}` : URL.createObjectURL(image)}
                  alt="preview"
                  className=" w-28 h-28 rounded-full"
                />
              </div>
              <div className=" w-[100%] h-96 flex flex-col px-10 ">
                <div className="flex justify-between my-4">
                  <label
                    htmlFor="email"
                    className=" lg:text-2xl md:text-xl sm:text-base lg:block md:block sm:hidden font-semibold text-black "
                    style={{ textShadow: "1px 1px 3px white" }}
                  >
                    Email : *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email..."
                    className=" lg:w-[70%] md:w-[70%] sm:w-[100%] bg-slate-50  ring-1 ring-white outline-none rounded-xl pl-4"
                    required
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    value={details.email}
                    onChange={changeHandler}
                  />
                </div>
                <div className="flex justify-between my-4 relative">
                  <label
                    htmlFor="password"
                    className=" lg:text-2xl md:text-xl sm:text-base font-semibold text-black lg:block md:block sm:hidden"
                    style={{ textShadow: "1px 1px 3px white" }}
                  >
                    Password : *
                  </label>
                  <input
                    type={shownPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="password..."
                    className=" lg:w-[70%] md:w-[70%] sm:w-[100%] bg-slate-50  ring-1 ring-white rounded-xl pl-4 outline-none flex justify-center items-center "
                    value={details.password}
                    onChange={changeHandler}
                  />
                  <span
                    className="absolute lg:w-8 md:w-8 sm:w-6 right-2 lg:top-0 md:-top-0.5 sm:top-0 cursor-pointer"
                    onClick={() => {
                      setShownPassword(!shownPassword);
                    }}
                  >
                    <img
                      src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/61-512.png"
                      alt="visiblepassword"
                    />
                  </span>
                </div>
                <div className="flex justify-between my-4">
                  <label
                    htmlFor="name"
                    className=" lg:text-2xl md:text-xl sm:text-base font-semibold text-black lg:block md:block sm:hidden"
                    style={{ textShadow: "1px 1px 3px white" }}
                  >
                    Name :
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="name..."
                    className=" lg:w-[70%] md:w-[70%] sm:w-[100%] bg-slate-50  ring-1 ring-white rounded-xl pl-4 outline-none"
                    value={details.name}
                    onChange={changeHandler}
                  />
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    className=" rounded-full "
                  />
                  <div className="flex mt-2">
                    <input type="checkbox" onChange={checkboxHandler} />{" "}
                    <h1 className="ml-2">Term & Condition</h1>
                  </div>
                </div>
                <div className=" flex justify-center mt-10 h-10">
                  <button
                    className=" w-52 rounded-3xl bg-gradient-to-r from-blue-500 to-green-500 font-bold"
                    onClick={submitHandler}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignupScreen;
