import { Home, User, Bell, Users, Calendar } from "lucide-react";

export const links = [
    { to: '/', name: 'Home', icon: <Home className="w-5" /> },
    { to: '/myconnection', name: 'Friends', icon: <Users className="w-5" /> },
    { to: '/notification', name: 'Notification', icon: <Bell className="w-5" />},
    { to: '/events', name: 'Events', icon: <Calendar className="w-5" /> },
    { to: '/myprofile', name: 'Profile', icon: <User className="w-5" /> },
]


