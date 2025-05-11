import React from "react";
import { Link } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "../../App.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer--content">
        <div className="footer--text">
          Made with <FavoriteIcon className="heart-icon" /> by Santiago Diaz
        </div>
        <div className="footer--links">
          <Link 
            href="https://linkedin.com/in/santiagoddiaz" 
            target="_blank" 
            className="footer--link"
          >
            <LinkedInIcon className="footer--icon" />
          </Link>
          <Link 
            href="https://github.com/sddiaz" 
            target="_blank" 
            className="footer--link"
          >
            <GitHubIcon className="footer--icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;