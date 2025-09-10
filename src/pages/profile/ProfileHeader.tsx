import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import UpdateDialog from "./UpdateDialog";
import { FaLink } from "react-icons/fa";
import { BiSolidBellRing } from "react-icons/bi";
// import { FaBell } from "react-icons/fa6";
import { FaBellSlash } from "react-icons/fa";
import CoverPhoto from "./CoverPhoto";
import handleFollowProcess from "./handler/handleFollowProcess";
import { useEffect, useState } from "react";
import AvatarPhoto from "./AvatarPhoto";
import handleUnFollowProcess from "./handler/handleUnFollowProcess";
interface props {
    profile: any,
    setProfile?: React.Dispatch<any>
    isEditable: boolean
}

const ProfileHeader = ({ profile, setProfile, isEditable }: props) => {

    const [isFollowing, setIsFollowing] = useState<boolean>(profile?.isFollowing);
    const followProcess = async () => {
        if (!isFollowing) {
            const response = await handleFollowProcess(profile?._id);
            if (response) {
                setIsFollowing(true);
            }
        }
        else {
            const response = await handleUnFollowProcess(profile?._id);
            if (response) {
                setIsFollowing(false);
            }
        }
    }
    useEffect(() => {
        setIsFollowing(profile?.isFollowing);
    }, [profile?.isFollowing])
    return (
        <div className="w-full border-b-2">
            <CoverPhoto isEditable={isEditable} coverImage={profile?.coverImage} />

            {/* Profile Section */}
            <div className="relative px-3 md:px-6 pb-6">
                {/* Profile Picture */}
                <div className="flex md:pb-5 flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-20">
                    <AvatarPhoto isEditable={isEditable} avatar={profile?.avatar} userName={profile?.userName} defaultCoverColor={profile?.defaultCoverColor} />

                    <div className="w-full mb- flex justify-end items-center">
                        {
                            (profile && setProfile && isEditable) &&
                            <UpdateDialog setProfile={setProfile} profile={{ location: profile?.location, links: profile?.links, bio: profile?.bio, title: profile?.title }} />

                        }
                        {
                            !isEditable &&
                            <Button variant="ghost" className="bg-primary group text-slate-100 cursor-pointer" onClick={() => { followProcess() }}>
                                {
                                    isFollowing ?
                                        <>
                                            Unfollow <FaBellSlash className="group-hover:-rotate-12 duration-300" />
                                        </>
                                        :
                                        <>
                                            Follow <BiSolidBellRing className="group-hover:rotate-12 duration-300" />
                                        </>


                                }
                            </Button>
                        }
                    </div>
                </div>

                {/* Profile Info */}
                <div className="space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">{profile?.userName}</h1>
                        <p className="text-lg text-profile-text-muted font-medium">
                            {/* Senior Product Manager at TechCorp */}
                            {profile?.title}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-profile-text-muted">

                        {
                            profile?.links &&
                            profile.links.map((e: string, i: number) => (
                                <div className="flex items-center text-primary gap-1" key={i}>
                                    <FaLink className="size-4" />
                                    <a href={e} className="hover:underline">
                                        {e}
                                    </a>
                                </div>
                            ))

                        }
                    </div>
                    {
                        profile?.location &&
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{profile?.location}</span>
                        </div>
                    }
                    {
                        profile?.bio &&
                        <p className="text-profile-text-muted max-w-2xl">
                            {profile?.bio}
                        </p>
                    }


                    <div className="flex flex-wrap gap-2 text-sm text-profile-text-muted">
                        <span>{profile?.followingCount} following</span>
                        <span>•</span>
                        <span>{profile?.followersCount} followers</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;