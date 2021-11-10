import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Header, SubHeader } from "@bigbinary/neetoui/v2/layouts";

import authApi from "../../apis/auth";
import { resetAuthTokens } from "../../apis/axios";
import { setToLocalStorage, getFromLocalStorage } from "../../helpers/storage";

const Navbar = ({ isLoggedIn }) => {
  const userName =
    getFromLocalStorage("authUserFirstName") +
    " " +
    getFromLocalStorage("authUserLastName");
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
      logger.error(error);
    }
  };
  return (
    <div>
      <div className="border-b-2 border-black p-1">
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
                />
                <Button
                  label={
                    <Typography style="body1" component="ins" weight="bold">
                      {userName}
                    </Typography>
                  }
                  style="text"
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
      {isLoggedIn && (
        <div className="p-16">
          <SubHeader
            actionBlock={
              <Button icon={Plus} iconPosition="left" label=" Add new quiz" />
            }
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
