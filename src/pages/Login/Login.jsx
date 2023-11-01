import { Link, useLocation } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
// import { AuthContext } from "../../Provider/AuthProvider";
// import { useContext } from "react";
// import axios from "axios";
import useAuthContext from "../../hooks/useAuthContext";
const Login = () => {
  const { signInUser } = useAuthContext();
  // const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  // const navigate = useNavigate();
  console.log(location);

  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // log in user account
    signInUser(email, password)
      .then(result => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        // const user = { email };
        // get access token
        // axios
        //   .post("http://localhost:5000/jwt", user, {
        //     withCredentials: true,
        //   })
        //   .then(res => {
        //     console.log(res.data);
        //     if (res.data.success) {
        //       navigate(location?.state ? location?.state : "/");
        //     }
        //   });
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 mr-12">
          <img src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <h1 className="text-3xl text-center font-bold">Login now!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="my-4 text-center">
              New to Car Doctors?{" "}
              <Link
                className="text-blue-600 underline font-bold"
                to="/register"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
