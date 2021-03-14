import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const DownloadFile = ({ icon, className, variant, text, link }) => {
    return (
        <Link to={link} target="_blank" download>
            <Button className={className} variant={variant}>
                <FontAwesomeIcon icon={icon} />
                {" " + text}
            </Button>
        </Link>
    );
};

export default DownloadFile;
