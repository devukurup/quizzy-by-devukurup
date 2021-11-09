import React from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";

import authApi from "../../apis/auth";
import { resetAuthTokens } from "../../apis/axios";
import { setToLocalStorage } from "../../helpers/storage";

const Navbar = ({ isLoggedIn }) => {
  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        first_name: null,
        last_name: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      // logger.error(error);
    }
  };
  return (
    <div className="border-b-2 border-black">
      <Header
        title={
          <Typography style="h1" weight="extrabold">
            Quizzy
          </Typography>
        }
        actionBlock={
          isLoggedIn && (
            <div className="pr-2 space-x-3">
              <Button
                label={
                  <Typography style="body1" component="ins" weight="bold">
                    Reports
                  </Typography>
                }
                style="text"
                onClick={handleLogout}
              />
              <Button
                label={
                  <Typography style="body1" component="ins" weight="bold">
                    UserName
                  </Typography>
                }
                style="text"
                onClick={handleLogout}
              />
              <Button
                label={
                  <Typography style="body1" component="ins" weight="bold">
                    Logout
                  </Typography>
                }
                style="text"
                onClick={handleLogout}
              />
            </div>
          )
        }
      />
    </div>
  );
};

export default Navbar;
