import { Node, useNode, UserComponent } from "@craftjs/core";
import { FormControl, FormLabel, Slider } from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";

interface Props {
  text: string;
  fontSize?: number;
  textAlign?: "center" | "right" | "left";
}

export const Text: React.FC<Props> = ({ text, fontSize, textAlign }) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
    selected,
    dragged,
  } = useNode((state: Node) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const [editable, setEditable] = useState<Boolean>(false);

  const handleOnClick = () => {
    selected && setEditable(true);
  };

  useEffect(() => {
    if (selected) {
      return;
    }

    setEditable(false);
  }, [selected]);

  return (
    <div ref={(ref: any) => connect(drag(ref))} onClick={handleOnClick}>
      <ContentEditable
        disabled={!editable}
        html={text}
        tagName="p"
        onChange={(e) =>
          setProp(
            (props) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")),
            500
          )
        }
        style={{ fontSize: `${fontSize}px`, textAlign }}
      />
    </div>
  );
};

export const TextSettings: React.FC = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
  }));

  return (
    <FormControl className="text-additional-settings" size="small">
      <FormLabel component="legend">Font size</FormLabel>
      <Slider
        value={fontSize || 7}
        step={7}
        min={7}
        max={50}
        onChange={(_, value) => {
          setProp((props) => ((props.fontSize = value), 1000));
        }}
      />
    </FormControl>
  );
};

export const TextDefaultProps: Props = {
  text: 'Hi',
  fontSize: 20,
};

(Text as UserComponent).craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings
  }
};
