import {
    ApertureIcon,
    CopyIcon,
    LayoutDashboardIcon, LoginIcon, MoodHappyIcon, TypographyIcon, UserIcon, UserPlusIcon, Volume2Icon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    { header: 'Home' },
    {
        title: 'Dashboard',
        icon: LayoutDashboardIcon,
        to: '/'
    },
    { header: 'users' },
    {
        title: 'Users',
        icon: UserIcon,
        to: '/user'
    },
    { header: 'Lectures' },
    {
        title: 'Lectures',
        icon: Volume2Icon,
        to: '/lectures'
    }
];

export default sidebarItem;
