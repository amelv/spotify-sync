"use client";

import { useStore } from "@/store";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export interface ConfirmationDialogRawProps {
  open: boolean;
  type: "save" | "delete";
  onCancel: () => void;
  onContinue: () => void;
}

/**
 * A confirmation dialog. Used to confirm the user's sync before proceeding.
 * @prop open - Whether the dialog is open.
 * @prop type - The type of sync.
 * @prop onCancel - The function to call when the user cancels.
 * @prop onContinue - The function to call when the user continues.
 */
export const ConfirmationDialog = () => {
  const router = useRouter();
  const syncState = useStore((store) => store.syncState);
  const setSyncState = useStore((store) => store.setSyncState);
  const [showDialog, setShowDialog] = useState(false);

  const type = syncState.type ?? "save";

  const handleDelete = useCallback(async () => {
    setSyncState({ ...syncState, type: "delete" });
    setShowDialog(true);
  }, [syncState, setSyncState]);

  const handleSave = useCallback(async () => {
    setSyncState({ ...syncState, type: "save" });
    setShowDialog(true);
  }, [syncState, setSyncState]);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="contained" color="success" onClick={handleSave}>
          Save
        </Button>
      </Container>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={showDialog}
      >
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {`Are you sure you want to ${type}?`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            autoFocus
            onClick={() => setShowDialog(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color={type === "save" ? "success" : "error"}
            onClick={() => {
              router.push("/sync-results");
            }}
          >
            {type.toLocaleUpperCase()}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
