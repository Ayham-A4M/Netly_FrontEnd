import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"



const RightSideBar = () => {
  


    return (
        <aside className="hidden xl:block w-72 p-4 space-y-4 sticky top-20 h-fit">
            <Card className="bg-gradient-card border-0 shadow-lg">
                <CardHeader className="pb-3">
                    <h3 className="font-semibold text-foreground">Your upcoming events</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-social-orange-light transition-colors">
                        <div className="w-8 h-8 bg-social-orange rounded-lg flex items-center justify-center">
                            <span className="text-xs font-medium">🎪</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm">Garden BBQ</p>
                            <p className="text-xs text-muted-foreground">Sat 16 June, Tom's Garden</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-social-blue-light transition-colors">
                        <div className="w-8 h-8 bg-social-blue rounded-lg flex items-center justify-center">
                            <span className="text-xs font-medium">🗳️</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm">City Council Vote</p>
                            <p className="text-xs text-muted-foreground">Sat 16 June, Town Hall</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-social-purple-light transition-colors">
                        <div className="w-8 h-8 bg-social-purple rounded-lg flex items-center justify-center">
                            <span className="text-xs font-medium">🎵</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm">Post-punk Festival</p>
                            <p className="text-xs text-muted-foreground">Sat 16 June, Tom's Garden</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-lg">
                <CardHeader className="pb-3">
                    <h3 className="font-semibold text-foreground">Community chats</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-social-orange-light transition-colors">
                        <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-social-orange text-white">DL</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Dog Lovers</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-social-green-light transition-colors">
                        <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-social-green text-white">CF</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Copenhagen friends</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-social-blue-light transition-colors">
                        <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-social-blue text-white">YC</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Y2K Car owners</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-lg">
                <CardHeader className="pb-3">
                    <h3 className="font-semibold text-foreground">Birthdays</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="p-2 rounded-md hover:bg-social-pink-light transition-colors">
                        <p className="font-medium text-sm mb-2">20 August</p>
                        <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs bg-social-pink text-white">BH</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">Bob Hammond</p>
                                <p className="text-xs text-muted-foreground">Turning 28 years old</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-lg">
                <CardHeader className="pb-3">
                    <h3 className="font-semibold text-foreground">Online contacts</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-social-green-light transition-colors">
                        <div className="w-2 h-2 bg-social-green rounded-full"></div>
                        <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-social-green text-white">ML</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Mark Larsen</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-social-green-light transition-colors">
                        <div className="w-2 h-2 bg-social-green rounded-full"></div>
                        <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-social-green text-white">ER</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Ethan Reynolds</span>
                    </div>
                </CardContent>
            </Card>
        </aside>
    )
}

export default RightSideBar