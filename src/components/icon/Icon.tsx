import Icons, {IconEnum} from './icon.enum';
import {ReactSVG} from "react-svg";

interface IconProps {
    type: IconEnum;
}

export const Icon = ({type}: IconProps) => {
    const Component = Icons[type];

    return <ReactSVG src={Component}/>;
};
