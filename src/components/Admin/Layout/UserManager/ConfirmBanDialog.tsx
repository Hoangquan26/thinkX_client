import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IUser } from "@/interfaces/user.interface";

export default function ConfirmBanDialog({
  open,
  onClose,
  user,
  onConfirm
}: {
  open: boolean;
  onClose: () => void;
  user: IUser;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ban user: {user.username}?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Hành động này không thể hoàn tác.
        </p>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
