import React from "react";
import { UserProps } from "../../types";
import "./user-details.component.scss";

const UserDetails: React.FC<UserProps> = (props: UserProps) => {

    return (
        <div className="user-details card">
            <div className="user-details__pic">
                <img className="user-details__pic-img"
                    alt={props.details.display_name}
                    src={props.details.main_photo ? props.details.main_photo : "https://via.placeholder.com/100"}>
                </img>
            </div>

            <ul className="user-details__box --top-info">
                <li className="user-details__li"><span className="user-details__name">{props.details.display_name}</span></li>
                <li className="user-details__li"><span className="user-details__job">{props.details.job_title}</span></li>
                <li className="user-details__li"><span className="user-details__fav">{props.details.favourite}</span></li>
            </ul>

            <ul className="user-details__box --buttom-info">
                <li className="user-details__li --split-box">
                    <strong>Location:</strong>
                    <span className="user-details__city">{props.details.city.name}</span>
                </li>
                <li className="user-details__li --split-box">
                    <strong>Religion:</strong>
                    <span className="user-details__religion">{props.details.religion}</span>
                </li>
                <li className="user-details__li --split-box">
                    <strong>Age:</strong>
                    <span className="user-details__age">{props.details.age}</span>
                    <br></br>
                    <strong>Height:</strong>
                    <span className="user-details__height">{props.details.height_in_cm}cm</span>
                </li>
                <li className="user-details__li">
                    <strong>Contacts in common:</strong>
                    <span className="user-details__contacts">{props.details.contacts_exchanged}</span></li>
                <li className="user-details__li">
                    <strong>Score:</strong>
                    <span className="user-details__score">{props.details.compatibility_score}</span></li>
            </ul>
        </div>);
};

export default UserDetails;