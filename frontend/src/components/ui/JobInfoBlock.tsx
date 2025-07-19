
type JobInfoBlockProps = {
    title: string,
    children: React.ReactNode
}

export const JobInfoBlock: React.FC<JobInfoBlockProps> = ({ title, children }) => {
    return (
        <div className="flex flex-col w-full gap-y-4 bg-[#E4DED4] p-2 rounded-md shadow-[2px_4px_5px_#000000aa]">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div>{children}</div>
        </div>
    )
}
