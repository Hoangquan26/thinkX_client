import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface CreateCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    name: string;
    description?: string;
    status: string;
  }) => Promise<void>;
}

const CreateCategorySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().max(500, "Maximum 500 characters"),
  status: Yup.string().oneOf(["ACTIVE", "INACTIVE"]).required("Status is required"),
});

export default function CreateCategoryDialog({
  open,
  onClose,
  onSubmit,
}: CreateCategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{
            name: "",
            description: "",
            status: "ACTIVE",
          }}
          validationSchema={CreateCategorySchema}
          onSubmit={async (values) => {
            await onSubmit(values);
            onClose();
          }}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label className="text-sm font-medium">Category Name</label>
                <Field name="name" as={Input} placeholder="Enter category name" />
                {errors.name && touched.name && (
                  <div className="text-xs text-red-500 mt-1">{errors.name}</div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Field
                  name="description"
                  as={Textarea}
                  rows={4}
                  placeholder="Enter description (optional)"
                />
                {errors.description && touched.description && (
                  <div className="text-xs text-red-500 mt-1">{errors.description}</div>
                )}
              </div>

              <DialogFooter className="pt-4">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
