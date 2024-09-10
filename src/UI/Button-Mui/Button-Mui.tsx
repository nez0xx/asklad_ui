import MaterialButton, {ButtonTypeMap} from '@mui/material/Button';
import {ExtendButtonBase} from '@mui/material/ButtonBase';


export const ButtonMui: ExtendButtonBase<ButtonTypeMap<any>> = ({
                                                                    typography,
                                                                    style,
                                                                    Component = MaterialButton,
                                                                    ...props
                                                                }) => {
    const buttonStyle =
        {
            ...style,
        }

    return <Component style={buttonStyle} {...props} />;
};


export const SecondaryButton: ExtendButtonBase<ButtonTypeMap<any>> = props => (
    <ButtonMui variant="transparent" color="secondary" {...props} />
);
