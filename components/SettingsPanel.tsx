import { useEditor } from "@craftjs/core";
import {
  Box,
  Button as MaterialButton,
  Chip,
  Grid,
  Typography
} from "@material-ui/core";
import * as React from "react";

export const SettingsPanel: React.FC = () => {
  const { actions, selectedNode } = useEditor((state, query) => {
    let selectedNode;
    const currentNodeId = state.events.selected;

    if (currentNodeId) {
      selectedNode = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related?.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }
    console.log(selectedNode, "settings");

    return { selectedNode };
  });
  return selectedNode ? (
    <Box bgcolor="rgba(0, 0, 0, 0.06)" mt={2} px={2} py={2}>
      <Grid container direction="column" spacing={0}>
        <Grid item>
          <Box pb={2}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography variant="subtitle1">Selected</Typography>
              </Grid>
              <Grid item>
                <Chip
                  size="small"
                  color="primary"
                  label={selectedNode?.name || ""}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {selectedNode.settings && React.createElement(selectedNode.settings)}
        {!!selectedNode.isDeletable ? (
          <MaterialButton
            variant="contained"
            color="default"
            onClick={() => actions.delete(selectedNode.id)}
          >
            {" "}
            Delete
          </MaterialButton>
        ) : null}
      </Grid>
    </Box>
  ) : null;
};
