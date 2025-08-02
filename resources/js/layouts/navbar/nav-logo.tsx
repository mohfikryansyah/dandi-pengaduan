import AppLogoIcon from '@/components/app-logo-icon';

export default function NavLogo() {
    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-md">
                <AppLogoIcon className='size-10'/>
            </div>
            <div className="grid flex-1 text-left text-lg text-gray-100">
                <span className="truncate leading-none font-semibold">Desa Pilohulata</span>
            </div>
        </>
    );
}
