import React from "react";

const Profile = ({ data }) => {
    return (
        <div>
            <img
                className="profileImage"
                alt={data.name}
                width="100%"
                src={data.img}
            ></img>
            <p>
                <br />
                <b>{data.name}</b>
                <br />
                {data.program}
                <br />
                {data.organization}
                <br />
                {data.faculty}
            </p>
        </div>
    );
};

export default Profile;
