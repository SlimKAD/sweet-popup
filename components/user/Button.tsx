import { useNode, UserComponent } from "@craftjs/core";
import {
  Button as MaterialButton,
  ButtonProps,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@material-ui/core";
import * as React from "react";

export const Button: React.FC<ButtonProps> = ({
  size,
  color,
  variant,
  children,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <MaterialButton
      ref={(ref: any) => connect(drag(ref))}
      style={{ margin: '5px'}}
      size={size}
      variant={variant}
      color={color}
    >
      {children}
    </MaterialButton>
  );
};

export const ButtonSettings: React.FC = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props
  }));
  return (
    <div>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Size</FormLabel>
        <RadioGroup
          defaultValue={props.size}
          onChange={(e) => setProp((props) => (props.size = e.target.value))}
        >
          <FormControlLabel
            label="Small"
            value="small"
            control={<Radio size="small" color="primary" />}
          />
          <FormControlLabel
            label="Medium"
            value="medium"
            control={<Radio size="small" color="primary" />}
          />
          <FormControlLabel
            label="Large"
            value="large"
            control={<Radio size="small" color="primary" />}
          />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Variant</FormLabel>
        <RadioGroup
          defaultValue={props.variant}
          onChange={(e) => setProp((props) => (props.variant = e.target.value))}
        >
          <FormControlLabel
            label="Text"
            value="text"
            control={<Radio size="small" color="primary" />}
          />
          <FormControlLabel
            label="Outlined"
            value="outlined"
            control={<Radio size="small" color="primary" />}
          />
          <FormControlLabel
            label="Contained"
            value="contained"
            control={<Radio size="small" color="primary" />}
          />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Color</FormLabel>
        <RadioGroup
          defaultValue={props.color}
          onChange={(e) => setProp((props) => (props.color = e.target.value))}
        >
          <FormControlLabel
            label="Default"
            value="default"
            control={<Radio size="small" color="default" />}
          />
          <FormControlLabel
            label="Primary"
            value="primary"
            control={<Radio size="small" color="primary" />}
          />
          <FormControlLabel
            label="Seconday"
            value="secondary"
            control={<Radio size="small" color="primary" />}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export const ButtonDefaultProps = {
  size: 'small',
  variant: 'contained',
  color: 'primary',
  text: 'Click me',
};

(Button as UserComponent).craft = {
  related: {
    settings: ButtonSettings,
  },
};
