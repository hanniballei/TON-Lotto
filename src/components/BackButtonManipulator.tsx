import { useBackButton } from "@tma.js/sdk-react";
import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const BackButtonManipulator: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const bb = useBackButton();

  useEffect(() => {
    if (!bb) return;
    if (pathname === "/") {
      bb.hide();
    } else {
      bb.show();
    }
  }, [bb, pathname]);

  useEffect(() => {
    bb && bb.on("click", () => navigate(-1));
  }, [bb, navigate]);

  return null;
};
