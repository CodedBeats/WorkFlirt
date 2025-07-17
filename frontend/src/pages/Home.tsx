// dependencies
import { useEffect, useState } from "react";



const Home = () => {
    const [jobData, setJobData] = useState<any>(null);
    const [descriptionVisible, setDescriptionVisible] = useState<boolean>(false);

    // togle description visible
    const toggleDescription = () => {
        setDescriptionVisible(prev => !prev);
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
    }, [])

    return (
        <div className="flex flex-col flex-1 p-4 gap-y-5">
            {/* employer header */}
            <div className="relative h-[300px] w-full rounded-md overflow-hidden">
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
            <div className="flex flex-col gap-y-4 bg-[#E4DED4] p-2 rounded-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Job</h1>
                    <button className="bg-[#EB5E28] text-white px-3 rounded-md" onClick={toggleDescription}>v</button>
                </div>
                <div className="text-l font-bold">
                    {jobData?.title}
                </div>
                { descriptionVisible &&
                    <div className="text-lg">
                        {jobData?.description}
                    </div>
                }
            </div>
            
            {/* experience */}
            <div className="flex flex-col gap-y-4 bg-[#E4DED4] p-2 rounded-md">
                <h1 className="text-2xl font-bold">Experience</h1>
                <div>{jobData?.experience}</div>
            </div>
            
            {/* education */}
            <div className="flex flex-col gap-y-4 bg-[#E4DED4] p-2 rounded-md">
                <h1 className="text-2xl font-bold">Education</h1>
                <div>{jobData?.education}</div>
            </div>
            
            {/* skills */}
            <div className="flex flex-col gap-y-4 bg-[#E4DED4] p-2 rounded-md">
                <h1 className="text-2xl font-bold">Skills</h1>
                <div className="flex flex-wrap gap-x-2 p-2">
                    {jobData?.skills.map((skill: string, index: number) => (
                        <div key={index} className="flex justify-between items-center bg-[#ffffffaa] p-2 rounded-full">
                            <div className="text-lg">{skill}</div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* save / dismiss */}
            <div>

            </div>
        </div>
    )
}

export default Home;
