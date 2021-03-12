import React from "react";

const Profile = ({ data }) => {
    return (
        <div>
            <img className="profileImage" width="250px" src={data.img}></img>
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
