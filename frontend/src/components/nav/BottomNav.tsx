// dependencies
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import clsx from 'clsx';

// util
import { formatForIcon } from "../../util/IconUtil";

// icons
import { FaArchive, FaUser }  from "react-icons/fa";
import { FaCircleNodes } from "react-icons/fa6";
const ArchiveIcon = formatForIcon(FaArchive);
const UserIcon = formatForIcon(FaUser);
const NodesIcon = formatForIcon(FaCircleNodes);


export const BottomNav = () => {
    return (
        <div className="w-full flex justify-around items-center gap-x-4 bg-[#403D39] p-4 fixed bottom-[0]">
            {/* saved - nav item */}
            <NavItem pathName="/saved" reactIcon={ArchiveIcon} pageName="Saved" />

            {/* connect - nav item */}
            <NavItem pathName="/" reactIcon={NodesIcon} pageName="Connect" />

            {/* profile - nav item */}
            <NavItem pathName="/profile" reactIcon={UserIcon} pageName="Profile" />
        </div>
    )
}



type NavItemProps = {
    pathName: string,
    reactIcon: React.FC<React.SVGProps<SVGSVGElement>>,
    pageName: string
}

const NavItem: React.FC<NavItemProps> = ({ pathName, reactIcon: Icon, pageName }) => {
    const resolvedPath = useResolvedPath(pathName);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    
    return (
        <Link
            to={pathName}
            className={clsx(
                "flex flex-col items-center gap-y-2",
                isActive ? "text-[#EB5E28]" : "text-[#CCC5B9]"
            )}
        >
            <Icon className="text-2xl" />
            <div className="text-xl font-bold">{pageName}</div>
        </Link>
    )
}

