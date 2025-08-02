import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, BookText, FileCode2, FilePenLine, FilePlus, FileSignature, Folder, LayoutGrid, UsersIcon } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
        icon: LayoutGrid,
        roles: ['admin', 'kadus_1', 'kadus_2', 'kadus_3', 'kadus_4', 'masyarakat', 'kades'],
    },
    {
        title: 'Pengaduan',
        href: route('pengaduan.index'),
        icon: FilePenLine,
    },
    {
        title: 'Permohonan Surat',
        href: route('permohonan-surat.index'),
        icon: FilePlus,
        roles: ['admin', 'kades', 'masyarakat'],
    },
    {
        title: 'Template Surat',
        href: route('template-berkas.index'),
        icon: FileCode2,
        roles: ['admin']
    },
    {
        title: 'Daftar Pengguna',
        href: route('daftar.user'),
        icon: UsersIcon,
        roles: ['admin'],
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
