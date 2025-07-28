// dependencies
import { useEffect, useState } from "react";

// components
import { JobInfoBlock } from "../components/ui/JobInfoBlock";
import { formatForIcon } from "../util/IconUtil";

// api
import { getJobListings } from "../api/scraperAPI";

// icons
import { MdOutlineDataSaverOn } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
const SaveIcon = formatForIcon(MdOutlineDataSaverOn);
const CloseIcon = formatForIcon(IoMdCloseCircle);


const Home = () => {
    const [jobData, setJobData] = useState<any>(null);
    const [descriptionVisible, setDescriptionVisible] = useState<boolean>(false);

    // togle description visible
    const toggleDescription = () => {
        setDescriptionVisible(prev => !prev);
    }

    // save job
    const handleSaveJob = () => {
        console.log("save job");
    }
    // dismiss job
    const handleDismissJob = () => {
        console.log("dismiss job");
    }

    useEffect(() => {
        setJobData({
            employer: "Amazon Web Services (AWS)",
            location: "Location",
            jobBoard: "Indeed",
            title: "Software Development Graduate (2025, AWS)",
            description: "Description: lorum ipsum dollar lorum ipsum dollar lorum ipsum dollar lorum ipsum dollar lorum ipsum dollar lorum ipsum dollar lorum ipsum dollar lorum ipsum dollar lorum ipsum dollar lorum ipsum dollar lorum ipsum dollar lorum ipsum dollar lorum ipsum dollar",
            experience: "Bachelor Degree in related field",
            education: "Education",
            skills: ["Skill 1", "Skill 2", "Skill 3"]
        })
        getJobListings("react", "remote").then(res => {
            console.log(res);
        })
    }, [])

    return (
        <div className="flex flex-col justify-center items-center flex-1 p-4 gap-y-5">
            {/* employer header */}
            <div className="relative h-[300px] w-full rounded-md overflow-hidden shadow-[2px_4px_5px_#000000aa]">
                {/* bg img */}
                <div className="absolute inset-0 bg-[url('https://avatars.githubusercontent.com/u/2232217?s=200&v=4')] bg-cover bg-center" />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#00000000] to-[#000000ff] z-3" />

                {/* location and job board */}
                <div className="relative h-full flex flex-col justify-end p-4 gap-y-2 z-5">
                    <div className="text-xl font-bold text-white">
                        {jobData?.employer}
                    </div>
                    <div className="flex gap-x-2 text-lg">
                        <div className="flex justify-between items-center bg-[#ffffff44] py-1 px-5 rounded-full text-white text-base">
                            {jobData?.location}
                        </div>
                        <div className="flex justify-between items-center bg-[#ffffff44] py-1 px-5 rounded-full text-white text-base">
                            {jobData?.jobBoard}
                        </div>
                    </div>
                </div>
            </div>

            {/* job title + description */}
            <div className="flex flex-col gap-y-4 bg-[#E4DED4] p-2 rounded-md shadow-[2px_4px_5px_#000000aa]">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Job</h1>
                    <button className="bg-[#EB5E28] text-white px-3 rounded-md" onClick={toggleDescription}>v</button>
                </div>
                <div className="text-l font-bold">
                    {jobData?.title}
                </div>
                { descriptionVisible &&
                    <div className="text-sm">
                        {jobData?.description}
                    </div>
                }
            </div >

            <JobInfoBlock title="Experience">{jobData?.experience}</JobInfoBlock>
            <JobInfoBlock title="Education">{jobData?.education}</JobInfoBlock>
            <JobInfoBlock title="Skills">
                <div className="flex flex-wrap gap-x-2 p-2">
                    {jobData?.skills.map((skill: string, i: number) => (
                    <div key={i} className="bg-[#ffffffaa] p-2 rounded-full text-sm shadow-[2px_3px_5px_#00000088]">
                        {skill}
                    </div>
                    ))}
                </div>
            </JobInfoBlock>
            
            {/* save / dismiss */}
            <div className="fixed w-[45%] bottom-[6.5em] flex justify-between items-center gap-x-4 bg-[#00000066] backdrop-blur-sm px-3 py-1 rounded-full border border-black">
                <button onClick={handleDismissJob}>
                    <CloseIcon className="text-5xl text-[#f00] bg-[#000] rounded-full" />
                </button>
                <button onClick={handleSaveJob}>
                    <SaveIcon className="text-5xl text-[#0f0] bg-[#000] rounded-full" />
                </button>
            </div>
        </div>
    )
}

export default Home;
