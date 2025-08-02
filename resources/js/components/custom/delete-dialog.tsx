import { Trash2, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';

type DeleteDialogProps = {
    title: string;
    description?: string;
    onDelete: () => void;
    isProcessing: boolean;
};

export default function DeleteDialog({ title, description, onDelete, isProcessing }: DeleteDialogProps) {
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

    return (
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="m-0 cursor-pointer hover:bg-red-100">
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-[425px]">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-200">
                        <TriangleAlert className="h-8 w-8 text-red-500" />
                    </div>
                    <h1 className="mt-4 text-lg font-bold">{title}</h1>
                    <p className="mt-2 text-gray-400">{description ?? 'Apakah Anda yakin ingin menghapus ini?'}</p>
                    <div className="mt-6 grid w-full grid-cols-2 gap-x-2">
                        <DialogClose asChild>
                            <Button variant={'outline'}>Batal</Button>
                        </DialogClose>
                        <Button
                            variant={'default'}
                            className="bg-red-500 transition-all duration-300 hover:bg-red-600 active:scale-90"
                            disabled={isProcessing}
                            onClick={() => {
                                onDelete();
                            }}
                            aria-label="Delete row"
                        >
                            Ya, saya yakin!
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
