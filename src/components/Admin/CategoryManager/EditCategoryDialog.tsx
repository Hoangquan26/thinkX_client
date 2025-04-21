import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { ICategory } from "@/interfaces/category.interface";
  import { Formik, Form, Field } from "formik";
  import * as Yup from "yup";
  import { Textarea } from "@/components/ui/textarea";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  interface EditCategoryDialogProps {
    open: boolean;
    onClose: () => void;
    category: ICategory;
    onSubmit: (values: Partial<ICategory>) => Promise<void>;
  }
  
  const EditCategorySchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().max(500, "Maximum 500 characters"),
    status: Yup.string().oneOf(["ACTIVE", "INACTIVE"]),
  });
  
  export default function EditCategoryDialog({
    open,
    onClose,
    category,
    onSubmit,
  }: EditCategoryDialogProps) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
  
          <Formik
            initialValues={{
              name: category.name || "",
              description: category.description || "",
              status: category.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
            }}
            validationSchema={EditCategorySchema}
            enableReinitialize
            onSubmit={async (values) => {
              await onSubmit(values);
              onClose();
            }}
          >
            {({ errors, touched, setFieldValue, values }) => (
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
                    placeholder="Enter category description..."
                  />
                  {errors.description && touched.description && (
                    <div className="text-xs text-red-500 mt-1">{errors.description}</div>
                  )}
                </div>
  
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={values.status}
                    onValueChange={(value) => setFieldValue("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
  
                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    );
  }
  