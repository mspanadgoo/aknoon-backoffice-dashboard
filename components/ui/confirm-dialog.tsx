 "use client";
 
 import { Button } from "./button";
 
 export function ConfirmDialog({
   open,
   title,
   description,
   confirmText = "حذف",
   cancelText = "انصراف",
   onConfirm,
   onClose,
 }: {
   open: boolean;
   title?: string;
   description?: string;
   confirmText?: string;
   cancelText?: string;
   onConfirm: () => void;
   onClose: () => void;
 }) {
   if (!open) return null;
   return (
     <div className="fixed inset-0 z-50">
       <div className="absolute inset-0 bg-black/40" onClick={onClose} />
       <div className="absolute inset-0 flex items-center justify-center p-4">
         <div className="w-full max-w-md rounded-lg border bg-background shadow-xl">
           <div className="px-4 py-3 border-b flex items-center justify-between">
             <h3 className="text-lg font-semibold">{title ?? "تایید عملیات"}</h3>
           </div>
           <div className="p-4 space-y-4">
             {description && <p className="text-sm text-muted-foreground">{description}</p>}
             <div className="flex items-center justify-end gap-2">
               <Button variant="secondary" onClick={onClose}>
                 {cancelText}
               </Button>
               <Button
                 className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                 onClick={() => {
                   onConfirm();
                   onClose();
                 }}
               >
                 {confirmText}
               </Button>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 }
