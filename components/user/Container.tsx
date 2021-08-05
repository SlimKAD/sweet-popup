import { useNode, UserComponent } from "@craftjs/core";
import {
  FormControl,
  FormLabel,
  Paper,
  PaperProps,
  Slider
} from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import * as React from "react";

interface Props extends PaperProps {
  background: string;
  padding: number;
}

export const Container: React.FC<Props> = ({
  background,
  padding,
  children,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <Paper
      ref={(ref: any) => connect(drag(ref))}
      style={{ margin: "5px 0", background, padding: `${padding}px` }}
    >
      {children}
    </Paper>
  );
};

export const ContainerSettings = () => {
  const {
    background,
    padding,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));
  return (
    <div>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Background</FormLabel>
        <ColorPicker
          defaultValue={background || "#000"}
          onChange={(color) => {
            setProp((props) => (props.background = color));
          }}
        />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Padding</FormLabel>
        <Slider
          defaultValue={padding}
          onChange={(_, value) => setProp((props) => (props.padding = value))}
        />
      </FormControl>
    </div>
  );
};

(Container as UserComponent).craft = {
  related: {
    settings: ContainerSettings,
  },
};
