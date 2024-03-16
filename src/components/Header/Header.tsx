import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Avatar from "react-avatar";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/userSlice";
import { useSelector } from "react-redux";
import { UserState } from "../../type";
import { ToastContainer, toast } from "react-toastify";
const utilize_logo = "/assets/utilize_logo.jfif";

const Header = ({ handleSearch }: { handleSearch: (searchTerm: string) => void }) => {
  const user = useSelector((state: UserState) => state.user.user);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) dispatch(login(user));
      else dispatch(logout());
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      dispatch(login(result.user));
    } catch (error) {
      toast.error("Error signing in with Google");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center md:pl-16 md:pr-10 md:h-20 bg-white border-b-2">
        <div className="w-42 flex items-center justify-center">
          <img
            src={utilize_logo}
            alt="Utilize"
            width="50px"
            height="50px"
            className="w-20 md:w-20 h-14 md:pb-0 object-contain"
          />
          <h3 className="font-bold text-2xl text-gray-500">Utilize</h3>
        </div>

        <div className="flex flex-col md:flex-row items-center md:space-y-0 md:space-x-5 flex-1 justify-end w-full gap-5">
          <form
            onSubmit={handleSubmit}
            className="sm:flex items-center space-x-5 bg-white rounded-md p-1 pl-5 shadow-md flex-1 md:flex-initial hidden"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-1 md:p-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          {user ? (
            <div className="flex items-center space-x-4">
              <Avatar
                src={user.photoURL ?? ""}
                round
                size="40"
                className="cursor-pointer"
                onClick={handleSignOut}
              />
              <button
                onClick={handleSignOut}
                className="text-gray-500 font-bold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="text-gray-500 font-bold"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      <ToastContainer theme="dark" />
    </header>
  );
};

export default Header;
