import { useEditor } from "@craftjs/core";
import {
  Box,
  Button as MaterialButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Snackbar,
  Switch,
  TextField
} from "@material-ui/core";
import copy from "copy-to-clipboard";
import lz from "lzutf8";
import * as React from "react";

export const Topbar: React.FC = () => {
  const [snackbarMessage, setSnackbarMessage] = React.useState<string | null>(
    null
  );

  const [dialogOpen, setDialogOpen] = React.useState<Boolean>(false);

  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [stateToLoad, setStateToLoad] = React.useState<string | null>(null);

  const handleCopyState = () => {
    const jsonState = query.serialize();
    copy(lz.encodeBase64(lz.compress(jsonState)));
    setSnackbarMessage("State copied to clipboard");
  };

  return (
    <Box px={1} py={1} mt={3} mb={1} bgcolor="#cbe8e7">
      <Grid container alignItems="center">
        <Grid item xs>
          <FormControlLabel
            control={
              <Switch
                checked={enabled}
                onChange={(_, value) =>
                  actions.setOptions((options) => (options.enabled = value))
                }
              />
            }
            label="Enable"
          />
        </Grid>
        <Grid item >
          <MaterialButton
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleCopyState}
            style={{ marginRight: 10}}
          >
            Copy current state
          </MaterialButton>
          <MaterialButton
            className="load-state-btn"
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => setDialogOpen(true)}
          >
            Load
          </MaterialButton>
          <Dialog
            open={dialogOpen as any}
            onClose={() => setDialogOpen(false)}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-title">Load state</DialogTitle>
            <DialogContent>
              <TextField
                multiline
                fullWidth
                placeholder='Paste the contents that was copied from the "Copy Current State" button'
                size="small"
                value={stateToLoad}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setStateToLoad(e.target.value)}
              />
            </DialogContent>
            <DialogActions >
              <MaterialButton
                onClick={() => setDialogOpen(false)}
                color="primary"
              >
                Cancel
              </MaterialButton>
              <MaterialButton
                onClick={() => {
                  setDialogOpen(false);
                  const json = lz.decompress(
                    lz.decodeBase64(stateToLoad as any)
                  );
                  actions.deserialize(json);
                  setSnackbarMessage("State loaded");
                }}
                color="primary"
                autoFocus
              >
                Load
              </MaterialButton>
            </DialogActions>
          </Dialog>
          <Snackbar
            autoHideDuration={1000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={!!snackbarMessage}
            onClose={() => setSnackbarMessage(null)}
            message={<span>{snackbarMessage}</span>}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
