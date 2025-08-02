import { router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import toast from 'react-hot-toast';
import { error } from 'console';

interface FotoProfileForm {
    avatar: File | null;
}

export default function FotoProfile() {
    const { data, setData, processing, reset, errors, recentlySuccessful } = useForm<Required<FotoProfileForm>>({
        avatar: null,
    });
    const [formErrors, setFormErrors] = useState<{ avatar?: string }>({});

    const { auth } = usePage<SharedData>().props;

    const inputPhotoRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string>('');

    const updatePhoto: FormEventHandler = (e) => {
        e.preventDefault();

        router.post(
            route('profile.update.photo'),
            {
                _method: 'put',
                avatar: data.avatar,
            },
            {
                forceFormData: true,
                preserveState: true,
                onSuccess: () => {
                    setData('avatar', null);
                    toast.success('Foto profil berhasil diperbarui');
                    if (inputPhotoRef.current) {
                        inputPhotoRef.current.value = '';
                    }
                },
                onError: (e) => {
                    setFormErrors(e);
                    toast.error('Gagal memperbarui foto profil!');
                }
            },
        );
    };

    return (
        <div className="space-y-6">
            <HeadingSmall title="Foto Profil" description="Perbarui foto profil Anda" />
            <form className="space-y-6" onSubmit={updatePhoto}>
                <div className="grid gap-2">
                    <Label htmlFor="avatar">Foto</Label>
                    <Input
                        ref={inputPhotoRef}
                        id="avatar"
                        name="avatar"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setData('avatar', file);

                                const reader = new FileReader();
                                reader.onload = (event) => {
                                    setPreview(event.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                        disabled={processing}
                    />
                    <InputError message={formErrors.avatar || errors?.avatar} />
                </div>

                {preview && (
                    <div className="grid gap-2">
                        <img src={preview} alt={`Foto ${auth.user.name}`} />
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-neutral-600">Saved</p>
                    </Transition>
                </div>
            </form>
        </div>
    );
}
