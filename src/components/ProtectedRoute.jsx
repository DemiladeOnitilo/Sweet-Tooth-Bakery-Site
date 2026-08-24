import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openAuthModal } from "../store/authModalSlice";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(openAuthModal("login"));
    }
  }, [token, dispatch]);

  if (!token) {
    // Return null, the modal will handle the prompt
    return null;
  }

  return children;
};

export default ProtectedRoute;