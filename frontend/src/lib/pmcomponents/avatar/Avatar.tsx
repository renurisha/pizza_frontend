import React from "react";
import * as MaterialIcons from "react-icons/md";

export enum Sizes {
    small,
    medium,
    large,
}

export interface AvatarProps {
    size?: string;
    emphasis?: string;
    shape?: string;
    style?: string;
    image?: string;
    icon?: string;
    text?: string;
    text_color?: string;
    background_color?: string;
}

export const Avatar = (props: AvatarProps) => {
    const mdIcon = MaterialIcons[props.icon];

    return (
        <div
            className={`avatar-position
                                text-${props.text_color}
                                avatar-${props.emphasis}
                                avatar-${props.background_color}
                                avatar-view-${props.size} 
                                avatar-${props.shape}
                                `}
        >
            <div>
                {props.image ? (
                    <img className={`avatar-img avatar-${props.shape}`} src={props.image} />
                ) : props.icon ? (
                    React.createElement(mdIcon)
                ) : (
                    props.text
                )}
            </div>
        </div>
    );
};

Avatar.defaultProps = {};

export default Avatar;
