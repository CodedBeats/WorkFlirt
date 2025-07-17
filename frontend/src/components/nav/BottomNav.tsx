// dependencies
import { Link, useMatch, useResolvedPath } from "react-router-dom";

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
        <div className="flex justify-around items-center gap-x-4 bg-[#403D39] p-4 bottom-0">
            {/* saved - nav item */}
            <Link to="/saved">
                <div className="flex flex-col items-center gap-y-2">
                    <ArchiveIcon className="text-[#CCC5B9] text-2xl" />
                    <div className="text-xl text-[#CCC5B9] font-bold">Saved</div>
                </div>
            </Link>

            {/* connect - nav item */}
            <Link to="/">
                <div className="flex flex-col items-center gap-y-2">
                    <NodesIcon className="text-[#EB5E28] text-2xl" />
                    <div className="text-xl text-[#EB5E28] font-bold">Connect</div>
                </div>
            </Link>

            {/* profile - nav item */}
            <Link to="/profile">
                <div className="flex flex-col items-center gap-y-2">
                    <UserIcon className="text-[#CCC5B9] text-2xl" />
                    <div className="text-xl text-[#CCC5B9] font-bold">Profile</div>
                </div>
            </Link>
        </div>
    )
}



